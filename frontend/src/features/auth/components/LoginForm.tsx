'use client';

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Ingresa un correo electrónico válido';
    }

    if (!password) {
      errors.password = 'La contraseña es obligatoria';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email, password });
      router.push(redirectUrl);
    } catch (err: any) {
      setFieldErrors({ general: err.message || 'Error al iniciar sesión' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-5 p-8 rounded-3xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] shadow-2xl">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-normal text-[var(--crema-suave)]">Iniciar Sesión</h2>
        <p className="text-sm text-[var(--beige)]">Accede a tus recuerdos y experiencias cósmicas</p>
      </div>

      {fieldErrors.general && (
        <div className="p-3 text-sm rounded-xl border border-red-500/40 bg-red-950/40 text-red-200">
          {fieldErrors.general}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider font-semibold text-[var(--acero)]">Correo Electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@mayday3003.world"
          className={`w-full px-4 py-3 rounded-xl border bg-black/30 text-[var(--crema)] focus:outline-none transition-all ${
            fieldErrors.email ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[var(--linea-fuerte)] focus:border-[var(--azul-acento)] focus:ring-2 focus:ring-[var(--azul-glow)]'
          }`}
        />
        {fieldErrors.email && <p className="text-xs text-red-300 mt-1">{fieldErrors.email}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider font-semibold text-[var(--acero)]">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={`w-full px-4 py-3 rounded-xl border bg-black/30 text-[var(--crema)] focus:outline-none transition-all ${
            fieldErrors.password ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[var(--linea-fuerte)] focus:border-[var(--azul-acento)] focus:ring-2 focus:ring-[var(--azul-glow)]'
          }`}
        />
        {fieldErrors.password && <p className="text-xs text-red-300 mt-1">{fieldErrors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-2xl bg-[var(--azul-acento)] hover:bg-[var(--azul-hover)] text-white font-semibold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-[var(--azul-glow)] disabled:opacity-50"
      >
        {isSubmitting ? 'Ingresando...' : 'Entrar a Mayday'}
      </button>

      <div className="text-center pt-2 text-sm text-[var(--beige)]">
        ¿Aún no tienes cuenta?{' '}
        <Link href="/registro" className="text-[var(--crema-suave)] underline hover:text-[var(--azul-acento)] font-medium">
          Regístrate gratis
        </Link>
      </div>
    </form>
  );
}
