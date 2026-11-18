// ============================================================
// Sarpanah - API Client (Central)
// All communication with backend goes through here
// ============================================================

import type { APIError } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

// Token management — stored in memory + sessionStorage for tab persistence
// We avoid plain localStorage for tokens; for production, prefer HttpOnly cookies via a proxy layer
let _accessToken: string | null = null;

export function setToken(token: string) {
  _accessToken = token;
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('sarpanah_token', token);
  }
}

export function getToken(): string | null {
  if (_accessToken) return _accessToken;
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('sarpanah_token');
    if (stored) {
      _accessToken = stored;
      return stored;
    }
  }
  return null;
}

export function clearToken() {
  _accessToken = null;
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('sarpanah_token');
  }
}

// ---- Main HTTP client ----

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  noAuth?: boolean; // set true for public endpoints
  contentType?: string;
}

export class APIResponseError extends Error {
  status: number;
  detail: string;

  constructor(status: number, detail: string) {
    super(detail);
    this.status = status;
    this.detail = detail;
    this.name = 'APIResponseError';
  }
}

function extractErrorDetail(data: APIError | unknown): string {
  if (!data) return 'خطای ناشناخته';
  if (typeof data === 'object' && data !== null && 'detail' in data) {
    const detail = (data as APIError).detail;
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail)) {
      return detail.map((e) => e.msg || JSON.stringify(e)).join(', ');
    }
  }
  return 'خطای ناشناخته';
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {}, noAuth = false } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': options.contentType || 'application/json',
    ...headers,
  };

  if (!noAuth) {
    const token = getToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    if (!response.ok) {
      throw new APIResponseError(response.status, `HTTP ${response.status}`);
    }
    return undefined as T;
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearToken();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth:expired'));
      }
    }
    throw new APIResponseError(response.status, extractErrorDetail(data));
  }

  return data as T;
}

// ---- Convenience wrappers ----

export const api = {
  get: <T>(path: string, noAuth = false) =>
    apiRequest<T>(path, { method: 'GET', noAuth }),

  post: <T>(path: string, body?: unknown, noAuth = false) =>
    apiRequest<T>(path, { method: 'POST', body, noAuth }),

  put: <T>(path: string, body?: unknown) =>
    apiRequest<T>(path, { method: 'PUT', body }),

  patch: <T>(path: string, body?: unknown) =>
    apiRequest<T>(path, { method: 'PATCH', body }),

  delete: <T>(path: string) =>
    apiRequest<T>(path, { method: 'DELETE' }),

  postForm: <T>(path: string, formData: URLSearchParams, noAuth = false) =>
    apiRequest<T>(path, {
      method: 'POST',
      body: formData,
      contentType: 'application/x-www-form-urlencoded',
      noAuth,
    }),
};

// Override for form-encoded bodies (OAuth2 login)
export async function apiPostForm<T>(
  path: string,
  formData: Record<string, string>,
  noAuth = true
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const body = new URLSearchParams(formData);
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new APIResponseError(response.status, `HTTP ${response.status}`);
  }

  if (!response.ok) {
    throw new APIResponseError(response.status, extractErrorDetail(data));
  }

  return data as T;
}
