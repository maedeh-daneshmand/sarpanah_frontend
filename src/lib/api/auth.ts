// Auth API module
import { api, apiPostForm, setToken, clearToken } from './client';
import type { Token, UserResponse, UserCreate, LoginRequest, UserSelfUpdate } from '@/types';

export const authApi = {
  // POST /auth/login-json — JSON login (preferred for SPA)
  loginJson: async (credentials: LoginRequest): Promise<Token> => {
    return api.post<Token>('/auth/login-json', credentials, true);
  },

  // POST /auth/login — OAuth2 form login (alternative)
  loginForm: async (email: string, password: string): Promise<Token> => {
    return apiPostForm<Token>('/auth/login', {
      username: email,
      password,
    });
  },

  // POST /auth/register
  register: async (userData: UserCreate): Promise<UserResponse> => {
    return api.post<UserResponse>('/auth/register', userData, true);
  },

  // GET /auth/me
  getMe: async (): Promise<UserResponse> => {
    return api.get<UserResponse>('/auth/me');
  },

  // Helper: perform login and store token
  loginAndStore: async (credentials: LoginRequest): Promise<UserResponse> => {
    const tokenData = await authApi.loginJson(credentials);
    setToken(tokenData.access_token);
    const user = await authApi.getMe();
    return user;
  },

  // Helper: logout
  logout: () => {
    clearToken();
  },
};
