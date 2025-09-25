import { TokenStorage, getAuthHeader } from './storage';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: any;
  signal?: AbortSignal;
}

// CRA only exposes REACT_APP_* at build time. Support BASE_URL via window fallback too.
const runtimeBaseUrl = (typeof window !== 'undefined' && (window as any).__BASE_URL__) as string | undefined;
const BASE_URL = (process.env.REACT_APP_BASE_BE_URL || runtimeBaseUrl || '/api');

function buildQueryString(params?: Record<string, any>): string {
  if (!params) return '';
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach(v => qs.append(key, String(v)));
    } else if (typeof value === 'object') {
      qs.append(key, JSON.stringify(value));
    } else {
      qs.append(key, String(value));
    }
  });
  const str = qs.toString();
  return str ? `?${str}` : '';
}

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await res.json() : (await res.text() as any);

  if (!res.ok) {
    const error: any = new Error('Request failed');
    error.status = res.status;
    error.statusText = res.statusText;
    error.data = data;
    throw error;
  }

  return data as T;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  setAuthToken(token: string) {
    TokenStorage.setToken(token);
  }

  clearAuthToken() {
    TokenStorage.clearToken();
  }

  private buildUrl(path: string, params?: Record<string, any>): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${normalizedPath}${buildQueryString(params)}`;
  }

  private buildHeaders(custom?: Record<string, string>): HeadersInit {
    return {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...(custom || {}),
    };
  }

  async request<T>(method: HttpMethod, path: string, options: RequestOptions = {}): Promise<T> {
    const { params, body, headers, signal } = options;
    const url = this.buildUrl(path, params);

    const init: RequestInit = {
      method,
      headers: this.buildHeaders(headers),
      signal,
    };

    if (body !== undefined && body !== null) {
      init.body = typeof body === 'string' ? body : JSON.stringify(body);
    }
    console.log('url',url)
    console.log('init',init)

    const res = await fetch(url, init);
    return handleResponse<T>(res);
  }

  get<T>(path: string, params?: Record<string, any>, options?: Omit<RequestOptions, 'params' | 'body'>): Promise<T> {
    return this.request<T>('GET', path, { ...options, params });
  }

  post<T>(path: string, body?: any, options?: Omit<RequestOptions, 'body'>): Promise<T> {
    return this.request<T>('POST', path, { ...options, body });
  }

  put<T>(path: string, body?: any, options?: Omit<RequestOptions, 'body'>): Promise<T> {
    return this.request<T>('PUT', path, { ...options, body });
  }

  patch<T>(path: string, body?: any, options?: Omit<RequestOptions, 'body'>): Promise<T> {
    return this.request<T>('PATCH', path, { ...options, body });
  }

  delete<T>(path: string, params?: Record<string, any>, options?: Omit<RequestOptions, 'params' | 'body'>): Promise<T> {
    return this.request<T>('DELETE', path, { ...options, params });
  }

  // Form-data POST helper (e.g., file uploads). Does not set Content-Type so browser can set multipart boundary.
  async postForm<T>(path: string, formData: FormData, options?: Omit<RequestOptions, 'body' | 'headers'>): Promise<T> {
    const url = this.buildUrl(path);
    const headers: HeadersInit = {
      ...getAuthHeader(),
    };
    const init: RequestInit = {
      method: 'POST',
      headers,
      body: formData,
      signal: options?.signal,
    };
    const res = await fetch(url, init);
    return handleResponse<T>(res);
  }
}

export const apiClient = new ApiClient(BASE_URL);

export default apiClient;
