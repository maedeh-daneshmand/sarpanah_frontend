// Bookings API module
import { api } from './client';
import type {
  Booking,
  BookingCreate,
  BookingQuoteRequest,
  BookingQuoteResponse,
} from '@/types';

export const bookingsApi = {
  // POST /bookings/quote — authenticated, calculate pricing
  quote: async (data: BookingQuoteRequest): Promise<BookingQuoteResponse> => {
    return api.post<BookingQuoteResponse>('/bookings/quote', data);
  },

  // POST /bookings/ — authenticated, create booking
  create: async (data: BookingCreate): Promise<Booking> => {
    return api.post<Booking>('/bookings/', data);
  },

  // GET /bookings/ — get user's bookings (as guest by default, or as host)
  getMyBookings: async (roleView: 'guest' | 'host' = 'guest', statusFilter?: string): Promise<Booking[]> => {
    const params = new URLSearchParams({ role_view: roleView });
    if (statusFilter) params.append('status_filter', statusFilter);
    return api.get<Booking[]>(`/bookings/?${params.toString()}`);
  },

  // GET /bookings/{id}
  getById: async (id: number): Promise<Booking> => {
    return api.get<Booking>(`/bookings/${id}`);
  },

  // POST /bookings/{id}/cancel
  cancel: async (id: number): Promise<{
    message: string;
    booking_id: number;
    status: string;
    refund_amount: string;
    penalty_amount: string;
    cancelled_at: string;
  }> => {
    return api.post(`/bookings/${id}/cancel`);
  },
};
