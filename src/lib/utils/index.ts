// Utility functions for Sarpanah frontend

// ---- Class name helper (Native without external deps) ----
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ')
    .trim();
}

// ---- Price formatting ----
export function formatPrice(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '—';
  return new Intl.NumberFormat('fa-IR').format(Math.round(num));
}

export function formatPriceWithUnit(price: string | number): string {
  return `${formatPrice(price)} تومان`;
}

// ---- Date formatting ----
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fa-IR', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// Convert ISO date to YYYY-MM-DD for API
export function toAPIDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Parse API date string to Date object
export function fromAPIDate(dateStr: string): Date {
  return new Date(dateStr + 'T00:00:00');
}

// ---- Time formatting ----
export function formatTime(timeStr: string): string {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  const hours = parseInt(parts[0]);
  const minutes = parts[1];
  return `${hours}:${minutes}`;
}

// ---- Booking status ----
export function getBookingStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'در انتظار پرداخت',
    confirmed: 'تأیید شده',
    cancelled: 'لغو شده',
    completed: 'تکمیل شده',
  };
  return labels[status] || status;
}

export function getBookingStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800',
    confirmed: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

// ---- Payment status ----
export function getPaymentStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'در انتظار',
    successful: 'موفق',
    failed: 'ناموفق',
    refunded: 'بازگشت داده شده',
  };
  return labels[status] || status;
}

export function getPaymentMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    card: 'کارت بانکی',
    wallet: 'کیف پول',
    bank_transfer: 'انتقال بانکی',
  };
  return labels[method] || method;
}

// ---- User role ----
export function getUserRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    guest: 'مهمان',
    host: 'میزبان',
    admin: 'مدیر',
  };
  return labels[role] || role;
}

// ---- Error message extraction ----
export function getErrorMessage(error: unknown): string {
  if (!error) return 'خطایی رخ داد';
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object') {
    if ('detail' in error) return String((error as { detail: unknown }).detail);
    if ('message' in error) return String((error as { message: unknown }).message);
  }
  return 'خطایی رخ داد';
}

// ---- Calculate nights ----
export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diff = checkOut.getTime() - checkIn.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

// ---- Get first photo URL ----
export function getPropertyCoverPhoto(photos?: { url: string; sort_order: number }[]): string | null {
  if (!photos || photos.length === 0) return null;
  const sorted = [...photos].sort((a, b) => a.sort_order - b.sort_order);
  return sorted[0].url;
}
