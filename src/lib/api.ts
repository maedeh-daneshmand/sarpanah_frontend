/**
 * سرپناه API Client
 * این فایل همه ارتباطات با بکاند FastAPI را مدیریت می‌کند
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

// ============================================================
// Types (matching FastAPI schemas)
// ============================================================

export interface ApiProperty {
  id: number;
  title: string;
  description: string;
  address: string;
  status: string;
  check_in_time: string;
  check_out_time: string;
  host_id: number;
  city_id: number;
  type_id: number;
  policy_id: number;
  created_at: string;
  updated_at: string;
  city?: {
    id: number;
    name: string;
    province?: { id: number; name: string };
  };
  property_type?: { id: number; name: string };
  cancellation_policy?: { id: number; name: string; free_cancel_days: number; refund_percent: string };
  units?: ApiUnit[];
  photos?: ApiPhoto[];
}

export interface ApiUnit {
  id: number;
  property_id: number;
  name: string;
  max_guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  base_price_per_night: string;
  cleaning_fee: string;
  is_active: boolean;
}

export interface ApiPhoto {
  id: number;
  property_id: number;
  url: string;
  sort_order: number;
}

export interface ApiUser {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  role: 'guest' | 'host' | 'admin';
  is_active: boolean;
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone?: string;
  password: string;
  role: 'guest' | 'host';
}

export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface BookingCreate {
  unit_id: number;
  check_in: string;   // YYYY-MM-DD
  check_out: string;  // YYYY-MM-DD
  guests: number;
  note?: string;
}

// ============================================================
// Token management
// ============================================================

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('sarpanah_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('sarpanah_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('sarpanah_token');
};

// ============================================================
// Base fetch wrapper
// ============================================================

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'خطای ناشناخته' }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

// ============================================================
// Auth API
// ============================================================

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthToken> => {
    return apiFetch<AuthToken>('/auth/login-json', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  register: async (data: RegisterRequest): Promise<ApiUser> => {
    return apiFetch<ApiUser>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  me: async (): Promise<ApiUser> => {
    return apiFetch<ApiUser>('/auth/me');
  },

  logout: () => {
    removeToken();
  },
};

// ============================================================
// Properties API
// ============================================================

export interface PropertySearchParams {
  city_id?: number;
  type_id?: number;
  min_price?: number;
  max_price?: number;
  min_guests?: number;
  search_query?: string;
}

export const propertiesApi = {
  search: async (params: PropertySearchParams = {}): Promise<ApiProperty[]> => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.set(k, String(v));
      }
    });
    const qs = query.toString();
    return apiFetch<ApiProperty[]>(`/properties/${qs ? `?${qs}` : ''}`);
  },

  getById: async (id: number): Promise<ApiProperty> => {
    return apiFetch<ApiProperty>(`/properties/${id}`);
  },
};

// ============================================================
// Locations API
// ============================================================

export const locationsApi = {
  getCities: async () => {
    return apiFetch<Array<{ id: number; name: string; province: { id: number; name: string } }>>('/locations/cities/');
  },
};

// ============================================================
// Bookings API
// ============================================================

export const bookingsApi = {
  create: async (data: BookingCreate) => {
    return apiFetch('/bookings/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  myBookings: async () => {
    return apiFetch('/bookings/my/');
  },
};

// ============================================================
// Wishlists API
// ============================================================

export const wishlistsApi = {
  add: async (propertyId: number) => {
    return apiFetch(`/wishlists/`, {
      method: 'POST',
      body: JSON.stringify({ property_id: propertyId }),
    });
  },

  remove: async (propertyId: number) => {
    return apiFetch(`/wishlists/${propertyId}`, { method: 'DELETE' });
  },

  get: async () => {
    return apiFetch('/wishlists/');
  },
};

// ============================================================
// Helper: Convert API property to frontend format
// ============================================================

export function mapApiProperty(p: ApiProperty) {
  const unit = p.units?.[0];
  const photo = p.photos?.[0];
  return {
    id: String(p.id),
    title: p.title,
    description: p.description,
    location: p.city?.name || '',
    region: p.city?.province?.name || '',
    price: unit ? parseInt(unit.base_price_per_night) : 0,
    image: photo?.url || 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800',
    images: p.photos?.map(ph => ph.url) || [],
    type: p.property_type?.name || '',
    bedrooms: unit?.bedrooms || 0,
    beds: unit?.beds || 0,
    bathrooms: unit?.bathrooms || 0,
    maxGuests: unit?.max_guests || 0,
    checkIn: p.check_in_time,
    checkOut: p.check_out_time,
    cancellationPolicy: p.cancellation_policy?.name || '',
    amenities: [],
    rating: 4.5,
    reviewCount: 0,
  };
}
