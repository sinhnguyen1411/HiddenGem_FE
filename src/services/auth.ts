import apiClient from './api';
import { BaseId } from './types';

export interface LoginRequest {
  email?: string;
  username?: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: BaseUser;
}

export interface RegisterResponse {
  user_id: number;
  verify_email_token: string;
}

export interface BaseUser extends BaseId {
  "username": string
  "email": string
  "role": RoleType
}

export type RoleType = "customer" | "admin" | "shop"

// Additional request/response types based on backendDocumentation.md
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface LogoutRequest {
  refresh_token?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface VerifyEmailConfirmRequest {
  token: string;
}

class AuthService {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/login', payload);
    if (res && res.access_token) {
      apiClient.setAuthToken(res.access_token);
    }
    return res;
  }

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    const res = await apiClient.post<RegisterResponse>('/auth/register', payload);
    return res;
  }

  async refresh(payload: RefreshRequest): Promise<TokenResponse> {
    const res = await apiClient.post<TokenResponse>('/auth/refresh', payload);
    if (res && res.access_token) {
      apiClient.setAuthToken(res.access_token);
    }
    return res;
  }

  async serverLogout(payload?: LogoutRequest): Promise<void> {
    try {
      await apiClient.post<unknown>('/auth/logout', payload);
    } finally {
      apiClient.clearAuthToken();
    }
  }

  async forgotPassword(payload: ForgotPasswordRequest): Promise<void> {
    await apiClient.post<unknown>('/auth/forgot-password', payload);
  }

  async resetPassword(payload: ResetPasswordRequest): Promise<void> {
    await apiClient.post<unknown>('/auth/reset-password', payload);
  }

  async changePassword(payload: ChangePasswordRequest): Promise<void> {
    await apiClient.post<unknown>('/auth/change-password', payload);
  }

  async requestVerifyEmail(): Promise<void> {
    await apiClient.post<unknown>('/auth/verify-email/request');
  }

  async confirmVerifyEmail(payload: VerifyEmailConfirmRequest): Promise<void> {
    await apiClient.post<unknown>('/auth/verify-email/confirm', payload);
  }

  logout(): void {
    apiClient.clearAuthToken();
  }
}

export const authService = new AuthService();
export default authService;
