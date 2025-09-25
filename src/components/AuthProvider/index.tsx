import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import apiClient from '../../services/api';
import { TokenStorage } from '../../services/storage';
import authService, { LoginRequest, RegisterRequest, AuthResponse, RegisterResponse } from '../../services/auth';
import { meService, UserProfile } from '../../services/me';
import { toast } from 'react-toastify';

interface AuthContextValue {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (payload: LoginRequest) => Promise<AuthResponse>;
  register: (payload: RegisterRequest) => Promise<RegisterResponse>;
  logout: () => void;
  setUser: (user: UserProfile | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(() => TokenStorage.getToken());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch full user profile when we have token
  const fetchUserProfile = useCallback(async () => {
    if (token && !user) {
      try {
        setLoading(true);
        const response = await meService.getProfile();
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // If profile fetch fails, clear token and user
        setToken(null);
        setUser(null);
        TokenStorage.clearToken();
      } finally {
        setLoading(false);
      }
    }
  }, [token, user]);

  // Initialize api client with token if available
  useEffect(() => {
    if (token) {
      apiClient.setAuthToken(token);
    } else {
      apiClient.clearAuthToken();
    }
  }, [token]);

  // Fetch user profile when token is available
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const login = useCallback(async (payload: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.login(payload);
      if (res?.access_token) {
        setToken(res.access_token);
        // Fetch full user profile after successful login
        try {
          const profileResponse = await meService.getProfile();
          setUser(profileResponse.data);
        } catch (profileError) {
          console.error('Error fetching user profile after login:', profileError);
          // If profile fetch fails, still set the basic user from login response
          if (res?.user) {
            setUser(res.user as UserProfile);
          }
        }
      }
      return res;
    } catch (e: any) {
      toast.error(e?.data?.message || e?.message || 'Login failed');
      const message = (e?.data?.message || e?.message || 'Login failed');
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.register(payload);
      toast.success('Register successful');
      // if (res?.access_token) {
      //   setToken(res.access_token);
      // }
      // if (res?.user) {
      //   setUser(res.user);
      // }
      return res;
    } catch (e: any) {
      const message = (e?.data?.message || e?.message || 'Register failed');
      toast.error(message);
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: Boolean(token),
    loading,
    error,
    login,
    register,
    logout,
    setUser,
  }), [user, token, loading, error, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
