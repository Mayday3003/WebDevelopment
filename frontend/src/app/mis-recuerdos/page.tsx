'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { InteractionService } from '@/features/interacciones/services/interactionService';
import { Interaction } from '@/features/interacciones/domain/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MisRecuerdosPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/mis-recuerdos');
      return;
    }

    if (isAuthenticated) {
      loadMyInteractions();
    }
  }, [isAuthenticated, authLoading, router]);

  const loadMyInteractions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await InteractionService.getMyInteractions();
      setInteractions(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar tus recuerdos');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || (!isAuthenticated && isLoading)) {
    return (
      <div className="py-20 text-center font-code text-xs text-[var(--acero)] animate-pulse">
        Verificando credenciales cósmicas...
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--linea-fuerte)] pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-code text-[var(--acero)]">Tu Espacio Personal</span>
          <h1 className="text-4xl sm:text-5xl font-normal text-[var(--crema-suave)]">Mis Recuerdos Compartidos</h1>
        </div>
        <Link
          href="/muro"
          className="px-5 py-2.5 rounded-xl border border-[var(--linea-fuerte)] hover:border-[var(--azul-acento)] text-xs font-semibold uppercase tracking-wider text-[var(--crema-suave)] transition-all"
        >
          Explorar Más Recuerdos
        </Link>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse p-6 rounded-2xl border border-[var(--linea)] bg-[var(--azul-prof)] space-y-3">
              <div className="h-4 bg-white/10 rounded w-1/3"></div>
              <div className="h-3 bg-white/5 rounded w-full"></div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="p-6 rounded-2xl border border-red-500/40 bg-red-950/20 text-red-300 text-sm">
          {error}
        </div>
      )}

      {!isLoading && !error && interactions.length === 0 && (
        <div className="py-20 text-center space-y-4 rounded-3xl border border-dashed border-[var(--linea-fuerte)] p-8">
          <p className="text-xl text-[var(--crema-suave)] font-normal">Aún no has compartido ningún recuerdo</p>
          <p className="text-sm text-[var(--beige)] max-w-md mx-auto">
            Ve al Muro de Recuerdos, abre una experiencia que hayas compartido con Mariana y añade tu memoria.
          </p>
          <Link
            href="/muro"
            className="inline-block px-6 py-3 rounded-2xl bg-[var(--azul-acento)] hover:bg-[var(--azul-hover)] text-white text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Ir al Muro
          </Link>
        </div>
      )}

      {!isLoading && !error && interactions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interactions.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] hover:border-[var(--azul-acento)] transition-all space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-code uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--azul-acento)]/20 text-[var(--azul-acento)]">
                  {item.experience?.type || 'Recuerdo'}
                </span>
                <span className="text-[10px] font-code text-[var(--acero)]">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-xl font-normal text-[var(--crema-suave)]">
                {item.experience?.title || 'Experiencia vinculada'}
              </h3>

              <p className="text-sm text-[var(--beige)] leading-relaxed italic border-l-2 border-[var(--azul-acento)] pl-3">
                &ldquo;{item.content}&rdquo;
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
