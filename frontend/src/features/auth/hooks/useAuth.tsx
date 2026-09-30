'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginRequest, RegisterRequest } from '../domain/types';
import { AuthService } from '../services/authService';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Restaurar sesión al refrescar la página
    try {
      const storedToken = localStorage.getItem('mayday_auth_token');
      const storedUser = localStorage.getItem('mayday_auth_user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Error restaurando sesión:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginRequest) => {
    const res = await AuthService.login(credentials);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('mayday_auth_token', res.token);
    localStorage.setItem('mayday_auth_user', JSON.stringify(res.user));
  };

  const register = async (data: RegisterRequest) => {
    const res = await AuthService.register(data);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('mayday_auth_token', res.token);
    localStorage.setItem('mayday_auth_user', JSON.stringify(res.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('mayday_auth_token');
    localStorage.removeItem('mayday_auth_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin',
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}
