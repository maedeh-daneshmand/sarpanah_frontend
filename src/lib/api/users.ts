// Users API module
import { api } from './client';
import type { UserResponse, UserSelfUpdate } from '@/types';

export const usersApi = {
  // GET /users/{id} — public profile
  getById: async (id: number): Promise<UserResponse> => {
    return api.get<UserResponse>(`/users/${id}`, true);
  },

  // PUT /users/me — self update
  updateMe: async (data: UserSelfUpdate): Promise<UserResponse> => {
    return api.put<UserResponse>('/users/me', data);
  },
};
