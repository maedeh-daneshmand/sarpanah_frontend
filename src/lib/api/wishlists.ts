// Wishlists API module
import { api } from './client';
import type { Wishlist, WishlistCreate } from '@/types';

export const wishlistsApi = {
  // GET /wishlists/ — authenticated
  getAll: async (): Promise<Wishlist[]> => {
    return api.get<Wishlist[]>('/wishlists/');
  },

  // POST /wishlists/
  create: async (data: WishlistCreate): Promise<Wishlist> => {
    return api.post<Wishlist>('/wishlists/', data);
  },

  // PUT /wishlists/{id}
  rename: async (id: number, name: string): Promise<Wishlist> => {
    return api.put<Wishlist>(`/wishlists/${id}`, { name });
  },

  // DELETE /wishlists/{id}
  delete: async (id: number): Promise<void> => {
    return api.delete<void>(`/wishlists/${id}`);
  },

  // POST /wishlists/{id}/items
  addItem: async (wishlistId: number, propertyId: number): Promise<void> => {
    return api.post<void>(`/wishlists/${wishlistId}/items`, { property_id: propertyId });
  },

  // DELETE /wishlists/{id}/items/{property_id}
  removeItem: async (wishlistId: number, propertyId: number): Promise<void> => {
    return api.delete<void>(`/wishlists/${wishlistId}/items/${propertyId}`);
  },
};
