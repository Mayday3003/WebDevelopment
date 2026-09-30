import { API_BASE_URL } from './config';

export interface HttpOptions extends RequestInit {
  requiresAuth?: boolean;
}

/**
 * Cliente HTTP Centralizado (Criterio 7 y 8 de la Rúbrica)
 * - Inyecta Authorization: Bearer <token> automáticamente desde localStorage
 * - Si la API responde 401 Unauthorized, borra la sesión y redirige a /login
 * - Parsea respuestas JSON y lanza errores estructurados
 */
export async function httpClient<T>(endpoint: string, options: HttpOptions = {}): Promise<T> {
  const { requiresAuth = false, headers = {}, ...customConfig } = options;

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('mayday_auth_token');
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...customConfig,
    headers: requestHeaders,
  });

  // Manejo automático de 401: Token vencido o ausente
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mayday_auth_token');
      localStorage.removeItem('mayday_auth_user');
      // Redirigir a /login solo si no estamos ya en login o registro
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/registro')) {
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      }
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Sesión expirada o no autorizada');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Error en la petición: ${response.statusText}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
