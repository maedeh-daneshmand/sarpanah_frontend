// Reviews API module
import { api } from './client';
import type { Review, ReviewCreate } from '@/types';

export const reviewsApi = {
  // POST /reviews/
  create: async (data: ReviewCreate): Promise<Review> => {
    return api.post<Review>('/reviews/', data);
  },

  // GET /reviews/property/{property_id} — public
  getForProperty: async (propertyId: number): Promise<Review[]> => {
    return api.get<Review[]>(`/reviews/property/${propertyId}`, true);
  },
};
