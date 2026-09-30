'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ExperienceService } from '@/features/experiencias/services/experienceService';
import { InteractionService } from '@/features/interacciones/services/interactionService';
import { Experience } from '@/features/experiencias/domain/types';
import { Interaction } from '@/features/interacciones/domain/types';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Formulario de nueva experiencia
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'viaje' | 'situacion' | 'experiencia'>('viaje');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [participants, setParticipants] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login?redirect=/admin');
      } else if (!isAdmin) {
        // Redirigir a inicio si no tiene rol admin (Criterio 9)
        router.push('/');
      } else {
        loadData();
      }
    }
  }, [isAuthenticated, isAdmin, authLoading, router]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [expData, interData] = await Promise.all([
        ExperienceService.getPaginated(1, 50),
        InteractionService.getAllInteractions(),
      ]);
      setExperiences(expData.data);
      setInteractions(interData);
    } catch (err) {
      console.error('Error cargando datos de administración:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setFormError('El título y la descripción son obligatorios');
      return;
    }

    try {
      setIsCreating(true);
      setFormError(null);
      await ExperienceService.create({
        title: title.trim(),
        type,
        description: description.trim(),
        imageUrl: imageUrl.trim() || undefined,
        participants: participants ? participants.split(',').map((p) => p.trim()) : [],
      });

      // Limpiar formulario y recargar
      setTitle('');
      setDescription('');
      setImageUrl('');
      setParticipants('');
      loadData();
    } catch (err: any) {
      setFormError(err.message || 'Error al crear la experiencia');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!confirm('¿Estás segura de eliminar esta experiencia? Esta acción no se puede deshacer.')) return;

    try {
      await ExperienceService.delete(id);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error al eliminar');
    }
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="py-20 text-center font-code text-xs text-[var(--acero)] animate-pulse">
        Verificando permisos de Administrador...
      </div>
    );
  }

  return (
    <div className="space-y-12 py-6">
      <div className="border-b border-[var(--linea-fuerte)] pb-6 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest font-code text-amber-400">Control Central</span>
          <h1 className="text-4xl font-normal text-[var(--crema-suave)]">Panel de Administración</h1>
        </div>
        <span className="text-xs font-code px-3 py-1 rounded-full border border-amber-400/40 text-amber-300 bg-amber-950/20">
          Rol: Administrador
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Formulario Crear Nueva Experiencia */}
        <div className="lg:col-span-5 p-6 rounded-3xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] space-y-5 h-fit shadow-xl">
          <h2 className="text-xl font-normal text-[var(--crema-suave)]">+ Nueva Experiencia en Catálogo</h2>

          {formError && (
            <div className="p-3 text-xs rounded-xl border border-red-500/40 bg-red-950/40 text-red-200">
              {formError}
            </div>
          )}

          <form onSubmit={handleCreateExperience} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-code uppercase tracking-wider text-[var(--acero)]">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Expedición Sierra Nevada"
                className="w-full px-3 py-2 rounded-xl border border-[var(--linea-fuerte)] bg-black/30 text-xs text-[var(--crema)] focus:outline-none focus:border-[var(--azul-acento)]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-code uppercase tracking-wider text-[var(--acero)]">Tipo</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] text-xs text-[var(--crema)] focus:outline-none focus:border-[var(--azul-acento)]"
              >
                <option value="viaje">Viaje</option>
                <option value="situacion">Situación</option>
                <option value="experiencia">Experiencia</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-code uppercase tracking-wider text-[var(--acero)]">URL de Imagen</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://mayday3003.world/assets/images/..."
                className="w-full px-3 py-2 rounded-xl border border-[var(--linea-fuerte)] bg-black/30 text-xs text-[var(--crema)] focus:outline-none focus:border-[var(--azul-acento)]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-code uppercase tracking-wider text-[var(--acero)]">Participantes (separados por coma)</label>
              <input
                type="text"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                placeholder="Mariana, David, Ana"
                className="w-full px-3 py-2 rounded-xl border border-[var(--linea-fuerte)] bg-black/30 text-xs text-[var(--crema)] focus:outline-none focus:border-[var(--azul-acento)]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-code uppercase tracking-wider text-[var(--acero)]">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalla qué ocurrió en este recuerdo..."
                rows={3}
                className="w-full px-3 py-2 rounded-xl border border-[var(--linea-fuerte)] bg-black/30 text-xs text-[var(--crema)] focus:outline-none focus:border-[var(--azul-acento)]"
              />
            </div>

            <button
              type="submit"
              disabled={isCreating}
              className="w-full py-2.5 rounded-xl bg-[var(--azul-acento)] hover:bg-[var(--azul-hover)] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md disabled:opacity-50"
            >
              {isCreating ? 'Guardando...' : 'Crear Experiencia'}
            </button>
          </form>
        </div>

        {/* Lista de Experiencias e Interacciones */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-normal text-[var(--crema-suave)]">
              Experiencias en Base de Datos ({experiences.length})
            </h2>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-2xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] uppercase font-code text-[var(--acero)]">{exp.type}</span>
                    <h4 className="text-base text-[var(--crema-suave)] font-normal">{exp.title}</h4>
                    <p className="text-xs text-[var(--beige)] line-clamp-1">{exp.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="px-3 py-1.5 rounded-lg border border-red-500/40 text-red-300 hover:bg-red-950/40 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Borrar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[var(--linea-fuerte)]">
            <h2 className="text-xl font-normal text-[var(--crema-suave)]">
              Todas las Interacciones de Usuarios ({interactions.length})
            </h2>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {interactions.map((inter) => (
                <div key={inter.id} className="p-3 rounded-xl border border-[var(--linea)] bg-black/20 text-xs space-y-1">
                  <div className="flex justify-between font-code text-[var(--acero)]">
                    <span className="text-[var(--crema-suave)] font-semibold">{inter.user?.name} ({inter.user?.email})</span>
                    <span>{new Date(inter.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[var(--beige)]">&ldquo;{inter.content}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
