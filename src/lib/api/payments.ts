// Payments API module
import { api } from './client';
import type { Payment, PaymentCreate } from '@/types';

export const paymentsApi = {
  // POST /payments/ — authenticated, process payment (simulated)
  create: async (data: PaymentCreate): Promise<Payment> => {
    return api.post<Payment>('/payments/', data);
  },

  // GET /payments/booking/{booking_id}
  getForBooking: async (bookingId: number): Promise<Payment[]> => {
    return api.get<Payment[]>(`/payments/booking/${bookingId}`);
  },
};
