'use client';

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthService } from '../services/authService';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modos de vista: 'login' | 'forgot' | 'reset'
  const searchParams = useSearchParams();
  const resetTokenParam = searchParams.get('resetToken');
  const [viewMode, setViewMode] = useState<'login' | 'forgot' | 'reset'>(resetTokenParam ? 'reset' : 'login');

  const { login } = useAuth();
  const router = useRouter();
  const redirectUrl = searchParams.get('redirect') || '/';

  const validateLogin = () => {
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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const errors = validateLogin();
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

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setSuccessMessage(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldErrors({ email: 'Ingresa un correo electrónico válido' });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await AuthService.forgotPassword(email.trim());
      setSuccessMessage(res.message);
    } catch (err: any) {
      setFieldErrors({ general: err.message || 'Error al solicitar el enlace' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setSuccessMessage(null);

    if (!resetTokenParam) {
      setFieldErrors({ general: 'El enlace de recuperación es inválido o no tiene token.' });
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setFieldErrors({ password: 'La nueva contraseña debe tener al menos 6 caracteres' });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await AuthService.resetPassword(resetTokenParam, newPassword);
      setSuccessMessage(res.message);
      setTimeout(() => {
        setViewMode('login');
        setSuccessMessage('Ya puedes iniciar sesión con tu nueva contraseña.');
      }, 2000);
    } catch (err: any) {
      setFieldErrors({ general: err.message || 'Error al restablecer contraseña' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // VISTA 1: ¿Olvidaste tu contraseña?
  if (viewMode === 'forgot') {
    return (
      <form onSubmit={handleForgotSubmit} className="w-full max-w-md mx-auto space-y-5 p-8 rounded-3xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] shadow-2xl">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-code tracking-widest text-[var(--acero)]">Recuperación</span>
          <h2 className="text-2xl font-normal text-[var(--crema-suave)]">¿Olvidaste tu contraseña?</h2>
          <p className="text-xs text-[var(--beige)] leading-relaxed">
            Ingresa tu correo y te enviaremos un enlace seguro para restablecerla.
          </p>
        </div>

        {successMessage && (
          <div className="p-3 text-xs rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-200">
            {successMessage}
          </div>
        )}

        {fieldErrors.general && (
          <div className="p-3 text-xs rounded-xl border border-red-500/40 bg-red-950/40 text-red-200">
            {fieldErrors.general}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider font-semibold text-[var(--acero)]">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            className="w-full px-4 py-3 rounded-xl border border-[var(--linea-fuerte)] bg-black/30 text-[var(--crema)] focus:outline-none focus:border-[var(--azul-acento)] text-xs"
          />
          {fieldErrors.email && <p className="text-xs text-red-300 mt-1">{fieldErrors.email}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 rounded-2xl bg-[var(--azul-acento)] hover:bg-[var(--azul-hover)] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando correo...' : 'Enviar Enlace de Recuperación'}
        </button>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => { setViewMode('login'); setFieldErrors({}); setSuccessMessage(null); }}
            className="text-xs text-[var(--beige)] hover:text-[var(--crema-suave)] underline"
          >
            ← Volver a Iniciar Sesión
          </button>
        </div>
      </form>
    );
  }

  // VISTA 2: Restablecer Contraseña (cuando llega con ?resetToken=...)
  if (viewMode === 'reset') {
    return (
      <form onSubmit={handleResetSubmit} className="w-full max-w-md mx-auto space-y-5 p-8 rounded-3xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] shadow-2xl">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-code tracking-widest text-emerald-400">Seguridad</span>
          <h2 className="text-2xl font-normal text-[var(--crema-suave)]">Nueva Contraseña</h2>
          <p className="text-xs text-[var(--beige)]">
            Asigna una nueva clave para tu cuenta de Mayday.
          </p>
        </div>

        {successMessage && (
          <div className="p-3 text-xs rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-200">
            {successMessage}
          </div>
        )}

        {fieldErrors.general && (
          <div className="p-3 text-xs rounded-xl border border-red-500/40 bg-red-950/40 text-red-200">
            {fieldErrors.general}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider font-semibold text-[var(--acero)]">Nueva Contraseña</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            className="w-full px-4 py-3 rounded-xl border border-[var(--linea-fuerte)] bg-black/30 text-[var(--crema)] focus:outline-none focus:border-[var(--azul-acento)] text-xs"
          />
          {fieldErrors.password && <p className="text-xs text-red-300 mt-1">{fieldErrors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 rounded-2xl bg-[var(--azul-acento)] hover:bg-[var(--azul-hover)] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? 'Guardando...' : 'Cambiar Contraseña'}
        </button>
      </form>
    );
  }

  // VISTA 3: Login Estándar
  return (
    <form onSubmit={handleLoginSubmit} className="w-full max-w-md mx-auto space-y-5 p-8 rounded-3xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] shadow-2xl">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-normal text-[var(--crema-suave)]">Iniciar Sesión</h2>
        <p className="text-sm text-[var(--beige)]">Accede a tus recuerdos y experiencias cósmicas</p>
      </div>

      {successMessage && (
        <div className="p-3 text-xs rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-200">
          {successMessage}
        </div>
      )}

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
        <div className="flex justify-between items-center">
          <label className="text-xs uppercase tracking-wider font-semibold text-[var(--acero)]">Contraseña</label>
          <button
            type="button"
            onClick={() => { setViewMode('forgot'); setFieldErrors({}); }}
            className="text-[11px] text-[var(--acero)] hover:text-[var(--azul-acento)] transition-colors underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
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
