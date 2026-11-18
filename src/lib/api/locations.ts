// Locations API module
import { api } from './client';
import type { Country, Province, City } from '@/types';

export const locationsApi = {
  // GET /locations/countries
  getCountries: async (): Promise<Country[]> => {
    return api.get<Country[]>('/locations/countries', true);
  },

  // GET /locations/provinces?country_id=
  getProvinces: async (countryId?: number): Promise<Province[]> => {
    const qs = countryId ? `?country_id=${countryId}` : '';
    return api.get<Province[]>(`/locations/provinces${qs}`, true);
  },

  // GET /locations/cities?province_id=
  getCities: async (provinceId?: number): Promise<City[]> => {
    const qs = provinceId ? `?province_id=${provinceId}` : '';
    return api.get<City[]>(`/locations/cities${qs}`, true);
  },
};
