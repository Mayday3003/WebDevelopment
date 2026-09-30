'use client';

import React, { useState, Suspense } from 'react';
import { useExperiences } from '@/features/experiencias/hooks/useExperiences';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { InteractionService } from '@/features/interacciones/services/interactionService';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

export default function MuroPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-code text-xs text-[var(--acero)] animate-pulse">Cargando Muro de Recuerdos...</div>}>
      <MuroContent />
    </Suspense>
  );
}

function MuroContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentType = searchParams.get('type') || '';
  const currentSearch = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  const { experiences, pagination, isLoading, error, refetch, isEmpty } = useExperiences({
    page: currentPage,
    limit: 8,
    search: currentSearch,
    type: currentType,
  });

  const { isAuthenticated, user } = useAuth();

  const handleTypeFilter = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    params.set('page', '1');
    router.push(`/muro?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`/muro?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/muro?${params.toString()}`);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setIsSubmittingComment(true);
      setCommentError(null);
      await InteractionService.create({
        experienceId: selectedExperience.id,
        content: commentText.trim(),
      });
      setCommentText('');
      // Refrescar para ver el nuevo comentario
      refetch();
      // Actualizar modal localmente
      setSelectedExperience((prev: any) => ({
        ...prev,
        interactions: [
          {
            id: Date.now().toString(),
            content: commentText.trim(),
            user: { name: user?.name || 'Tú' },
            createdAt: new Date().toISOString(),
          },
          ...(prev?.interactions || []),
        ],
      }));
    } catch (err: any) {
      setCommentError(err.message || 'Error al enviar el comentario');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Encabezado del Muro */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--linea-fuerte)] pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-code text-[var(--acero)]">Galería Colectiva</span>
          <h1 className="text-4xl sm:text-5xl font-normal text-[var(--crema-suave)]">❀ Recuerditos ❀</h1>
        </div>
        {isAuthenticated && (
          <Link
            href="/mis-recuerdos"
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[var(--azul-acento)] hover:bg-[var(--azul-hover)] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-[var(--azul-glow)]"
          >
            + Ver Mis Aportes
          </Link>
        )}
      </div>

      {/* Barra de Filtros en Tiempo Real */}
      <div className="p-4 rounded-2xl border border-[var(--linea-fuerte)] bg-[var(--azul-prof)] flex flex-wrap items-center justify-between gap-4">
        {/* Filtro por Categoría */}
        <div className="flex flex-wrap items-center gap-2">
          {['', 'viaje', 'situacion', 'experiencia'].map((typeKey) => (
            <button
              key={typeKey}
              onClick={() => handleTypeFilter(typeKey)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                currentType === typeKey
                  ? 'bg-[var(--azul-acento)] text-white shadow-md'
                  : 'bg-black/20 text-[var(--beige)] hover:text-[var(--crema-suave)] border border-[var(--linea)]'
              }`}
            >
              {typeKey === '' ? 'Todos' : typeKey}
            </button>
          ))}
        </div>

        {/* Buscador de Texto */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar por título o descripción..."
            className="px-4 py-2 rounded-xl border border-[var(--linea-fuerte)] bg-black/30 text-xs text-[var(--crema)] focus:outline-none focus:border-[var(--azul-acento)] w-full sm:w-64"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider text-[var(--crema-suave)]"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Estado: Cargando (Skeletons elegantes) */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse p-4 rounded-2xl border border-[var(--linea)] bg-[var(--azul-prof)] space-y-4">
              <div className="aspect-[4/5] bg-white/5 rounded-xl"></div>
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-3 bg-white/5 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Estado: Error */}
      {error && !isLoading && (
        <div className="p-8 text-center rounded-2xl border border-red-500/30 bg-red-950/20 text-red-300 space-y-3">
          <p className="text-lg">No se pudo cargar el catálogo desde la API</p>
          <p className="text-xs text-[var(--beige)]">{error}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-xl bg-red-900/40 hover:bg-red-900/60 border border-red-500/40 text-xs uppercase tracking-wider text-white"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Estado: Vacío */}
      {isEmpty && (
        <div className="py-20 text-center space-y-3">
          <p className="text-xl font-normal text-[var(--crema-suave)]">No se encontraron recuerdos</p>
          <p className="text-sm text-[var(--acero)]">Prueba cambiando los filtros o la búsqueda.</p>
        </div>
      )}

      {/* Catálogo Masonry Style */}
      {!isLoading && !error && experiences.length > 0 && (
        <div className="masonry-wall">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setSelectedExperience(exp)}
              className="masonry-item group cursor-pointer border border-[var(--linea-fuerte)] rounded-2xl overflow-hidden bg-[var(--azul-prof)] hover:border-[var(--azul-acento)] transition-all hover:scale-[1.01] hover:shadow-2xl"
            >
              {exp.imageUrl ? (
                <div className="relative overflow-hidden bg-black/40">
                  <img
                    src={exp.imageUrl}
                    alt={exp.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase font-code tracking-wider text-white">
                    {exp.type}
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-[var(--azul-medio)] flex items-center justify-center p-6 text-center text-xs font-code text-[var(--acero)] uppercase tracking-wider">
                  {exp.type}
                </div>
              )}

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-normal text-[var(--crema-suave)] leading-snug group-hover:text-[var(--azul-acento)] transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs text-[var(--beige)] line-clamp-2 leading-relaxed">
                  {exp.description}
                </p>
                {exp.participants && exp.participants.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.participants.map((p: string, idx: number) => (
                      <span key={idx} className="text-[10px] font-code px-2 py-0.5 rounded-full border border-[var(--linea)] text-[var(--acero)] bg-black/20">
                        @{p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginación por URL (?page=2) */}
      {!isLoading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-8 border-t border-[var(--linea-fuerte)]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 rounded-xl border border-[var(--linea-fuerte)] text-xs font-semibold uppercase tracking-wider text-[var(--beige)] hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          <span className="text-xs font-code text-[var(--acero)]">
            Página {pagination.page} de {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= pagination.totalPages}
            className="px-4 py-2 rounded-xl border border-[var(--linea-fuerte)] text-xs font-semibold uppercase tracking-wider text-[var(--beige)] hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Siguiente →
          </button>
        </div>
      )}

      {/* Modal de Detalle e Interacciones Colaborativas */}
      {selectedExperience && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedExperience(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] bg-[var(--azul-prof)] border border-[var(--linea-fuerte)] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Foto Grande Izquierda */}
            <div className="md:w-1/2 bg-black/60 flex items-center justify-center relative overflow-hidden">
              {selectedExperience.imageUrl ? (
                <img
                  src={selectedExperience.imageUrl}
                  alt={selectedExperience.title}
                  className="max-h-[50vh] md:max-h-full w-full object-contain p-4"
                />
              ) : (
                <div className="p-12 text-center text-xs font-code text-[var(--acero)]">Sin imagen</div>
              )}
            </div>

            {/* Información y Comentarios Derecha */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-code uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--azul-acento)]/20 text-[var(--azul-acento)] border border-[var(--azul-acento)]/30">
                    {selectedExperience.type}
                  </span>
                  <button
                    onClick={() => setSelectedExperience(null)}
                    className="w-8 h-8 rounded-full border border-[var(--linea)] flex items-center justify-center text-sm text-[var(--acero)] hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl text-[var(--crema-suave)] font-normal">{selectedExperience.title}</h2>
                <p className="text-sm text-[var(--beige)] leading-relaxed">{selectedExperience.description}</p>

                {selectedExperience.participants && selectedExperience.participants.length > 0 && (
                  <div className="pt-2">
                    <p className="text-[10px] uppercase tracking-wider font-code text-[var(--acero)] mb-1">Participantes</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedExperience.participants.map((p: string, idx: number) => (
                        <span key={idx} className="text-xs px-2.5 py-0.5 rounded-full border border-[var(--linea)] bg-black/20 text-[var(--crema)]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sección de Comentarios / Aportes */}
              <div className="border-t border-[var(--linea-fuerte)] pt-4 space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-code text-[var(--acero)]">Aportes y Recuerdos</h4>

                {/* Formulario para comentar (Requiere sesión) */}
                {isAuthenticated ? (
                  <form onSubmit={handleAddComment} className="space-y-2">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Agrega tu recuerdo sobre este momento..."
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl border border-[var(--linea-fuerte)] bg-black/30 text-xs text-[var(--crema)] focus:outline-none focus:border-[var(--azul-acento)]"
                    />
                    {commentError && <p className="text-xs text-red-300">{commentError}</p>}
                    <button
                      type="submit"
                      disabled={isSubmittingComment || !commentText.trim()}
                      className="px-4 py-1.5 rounded-lg bg-[var(--azul-acento)] hover:bg-[var(--azul-hover)] text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
                    >
                      {isSubmittingComment ? 'Publicando...' : 'Comentar'}
                    </button>
                  </form>
                ) : (
                  <div className="p-3 rounded-xl border border-[var(--linea)] bg-black/20 text-xs text-[var(--beige)] text-center">
                    <Link href="/login" className="text-[var(--crema-suave)] underline font-semibold">
                      Inicia sesión
                    </Link>{' '}
                    para compartir tu memoria sobre este momento.
                  </div>
                )}

                {/* Lista de comentarios existentes */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedExperience.interactions && selectedExperience.interactions.length > 0 ? (
                    selectedExperience.interactions.map((inter: any) => (
                      <div key={inter.id} className="p-2.5 rounded-xl border border-[var(--linea)] bg-black/20 space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-[var(--acero)] font-code">
                          <span className="font-semibold text-[var(--crema-suave)]">{inter.user?.name || 'Amigo'}</span>
                          <span>{new Date(inter.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-[var(--beige)]">{inter.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[var(--acero)] italic">Aún no hay comentarios en este recuerdo.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
