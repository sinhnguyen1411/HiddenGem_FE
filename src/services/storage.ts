const AUTH_TOKEN_KEY = 'auth_token';

let inMemoryToken: string | null = null;

export const TokenStorage = {
  getToken(): string | null {
    if (inMemoryToken) return inMemoryToken;
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      inMemoryToken = token;
      return token;
    } catch {
      return null;
    }
  },

  setToken(token: string): void {
    inMemoryToken = token;
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch {
      // ignore write errors (e.g., private mode)
    }
  },

  clearToken(): void {
    inMemoryToken = null;
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch {
      // ignore
    }
  },
};

export const getAuthHeader = (): Record<string, string> => {
  const token = TokenStorage.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
