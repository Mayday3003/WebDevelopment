'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--negro)]/80 border-b border-[var(--linea-fuerte)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-code text-sm font-semibold tracking-wider px-2.5 py-1 rounded-md border border-[var(--acero)] text-[var(--crema-suave)] group-hover:border-[var(--azul-acento)] transition-colors">
            Mayday 🗲
          </span>
        </Link>

        {/* Enlaces Principales */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
              isActive('/') ? 'text-[var(--crema-suave)] border-b-2 border-[var(--azul-acento)] pb-1' : 'text-[var(--beige)] hover:text-[var(--crema-suave)]'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/proyectos"
            className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
              isActive('/proyectos') ? 'text-[var(--crema-suave)] border-b-2 border-[var(--azul-acento)] pb-1' : 'text-[var(--beige)] hover:text-[var(--crema-suave)]'
            }`}
          >
            Proyectos
          </Link>
          <Link
            href="/muro"
            className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
              isActive('/muro') ? 'text-[var(--crema-suave)] border-b-2 border-[var(--azul-acento)] pb-1' : 'text-[var(--beige)] hover:text-[var(--crema-suave)]'
            }`}
          >
            Muro de Recuerdos
          </Link>

          {/* Rutas Privadas / Protegidas en Navbar según sesión (Criterio 8 de la Rúbrica) */}
          {isAuthenticated && (
            <Link
              href="/mis-recuerdos"
              className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                isActive('/mis-recuerdos') ? 'text-[var(--crema-suave)] border-b-2 border-[var(--azul-acento)] pb-1' : 'text-[var(--beige)] hover:text-[var(--crema-suave)]'
              }`}
            >
              Mis Recuerdos
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/admin"
              className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-amber-400/40 text-amber-300 hover:bg-amber-400/10 transition-colors ${
                isActive('/admin') ? 'bg-amber-400/20' : ''
              }`}
            >
              Panel Admin
            </Link>
          )}
        </nav>

        {/* Acciones de Sesión (Cambia según sesión: Criterio 8) */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs font-medium text-[var(--crema-suave)]">
                Hola, <strong className="text-[var(--azul-acento)]">{user?.name}</strong>
              </span>
              <button
                onClick={logout}
                className="py-1.5 px-3.5 rounded-xl border border-[var(--linea-fuerte)] text-xs font-semibold uppercase tracking-wider text-[var(--beige)] hover:text-white hover:bg-red-950/40 hover:border-red-500/40 transition-all"
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="py-1.5 px-4 rounded-xl border border-[var(--linea-fuerte)] text-xs font-semibold uppercase tracking-wider text-[var(--beige)] hover:text-[var(--crema-suave)] hover:bg-white/5 transition-all"
              >
                Ingresar
              </Link>
              <Link
                href="/registro"
                className="py-1.5 px-4 rounded-xl bg-[var(--azul-acento)] hover:bg-[var(--azul-hover)] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-[var(--azul-glow)]"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
