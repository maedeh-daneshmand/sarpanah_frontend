// Properties API module
import { api } from './client';
import type {
  Property,
  PropertyCreate,
  PropertyUpdate,
  PropertySearchParams,
  Photo,
  Amenity,
  PropertyType,
  CancellationPolicy,
} from '@/types';

export const propertiesApi = {
  // GET /properties/ — public search
  search: async (params: PropertySearchParams = {}): Promise<Property[]> => {
    const query = new URLSearchParams();
    if (params.city_id) query.append('city_id', String(params.city_id));
    if (params.type_id) query.append('type_id', String(params.type_id));
    if (params.min_price) query.append('min_price', String(params.min_price));
    if (params.max_price) query.append('max_price', String(params.max_price));
    if (params.min_guests) query.append('min_guests', String(params.min_guests));
    if (params.search_query) query.append('search_query', params.search_query);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return api.get<Property[]>(`/properties/${qs}`, true);
  },

  // GET /properties/{id} — public single property
  getById: async (id: number): Promise<Property> => {
    return api.get<Property>(`/properties/${id}`, true);
  },

  // GET /properties/my-properties — host only
  getMyProperties: async (statusFilter?: string): Promise<Property[]> => {
    const qs = statusFilter ? `?status_filter=${statusFilter}` : '';
    return api.get<Property[]>(`/properties/my-properties${qs}`);
  },

  // POST /properties/ — host create
  create: async (data: PropertyCreate): Promise<Property> => {
    return api.post<Property>('/properties/', data);
  },

  // PUT /properties/{id}
  update: async (id: number, data: PropertyUpdate): Promise<Property> => {
    return api.put<Property>(`/properties/${id}`, data);
  },

  // DELETE /properties/{id} (soft-delete, sets status=SUSPENDED)
  delete: async (id: number): Promise<void> => {
    return api.delete<void>(`/properties/${id}`);
  },

  // GET /properties/{id}/photos — public
  getPhotos: async (propertyId: number): Promise<Photo[]> => {
    return api.get<Photo[]>(`/properties/${propertyId}/photos`, true);
  },

  // POST /properties/{id}/photos — host only
  addPhoto: async (
    propertyId: number,
    photoData: { property_id: number; url: string; unit_id?: number; sort_order?: number }
  ): Promise<Photo> => {
    return api.post<Photo>(`/properties/${propertyId}/photos`, photoData);
  },

  // GET /amenities/ — public list
  getAmenities: async (): Promise<Amenity[]> => {
    return api.get<Amenity[]>('/amenities/', true);
  },

  // GET /properties/types — NOTE: no dedicated endpoint in backend
  // PropertyTypes are part of admin setup; frontend uses local fallback list
  // getPropertyTypes - not available as standalone endpoint

  // Helper: get reviews for a property
  getReviews: async (propertyId: number) => {
    const { reviewsApi } = await import('./reviews');
    return reviewsApi.getForProperty(propertyId);
  },
};
