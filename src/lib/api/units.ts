// Units API module  
import { api } from './client';
import type { Unit, UnitCreate, UnitUpdate } from '@/types';

export const unitsApi = {
  // GET /units/{id}
  getById: async (id: number): Promise<Unit> => {
    return api.get<Unit>(`/units/${id}`, true);
  },

  // POST /units/
  create: async (data: UnitCreate): Promise<Unit> => {
    return api.post<Unit>('/units/', data);
  },

  // PUT /units/{id}
  update: async (id: number, data: UnitUpdate): Promise<Unit> => {
    return api.put<Unit>(`/units/${id}`, data);
  },

  // DELETE /units/{id}
  delete: async (id: number): Promise<void> => {
    return api.delete<void>(`/units/${id}`);
  },
};
