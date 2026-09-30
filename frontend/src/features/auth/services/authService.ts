import { httpClient } from '../../common/http';
import { LoginRequest, RegisterRequest, AuthResponse } from '../domain/types';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    return httpClient<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  static async register(data: RegisterRequest): Promise<AuthResponse> {
    return httpClient<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
