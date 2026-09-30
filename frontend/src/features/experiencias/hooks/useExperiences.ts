'use client';

import { useState, useEffect, useCallback } from 'react';
import { PaginatedExperiences } from '../domain/types';
import { ExperienceService } from '../services/experienceService';

interface UseExperiencesOptions {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
}

export function useExperiences({ page = 1, limit = 8, search = '', type = '' }: UseExperiencesOptions = {}) {
  const [data, setData] = useState<PaginatedExperiences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await ExperienceService.getPaginated(page, limit, search, type);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las experiencias');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, type]);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return {
    experiences: data?.data || [],
    pagination: data?.pagination || { page: 1, limit, total: 0, totalPages: 1 },
    isLoading,
    error,
    refetch: fetchExperiences,
    isEmpty: !isLoading && (!data?.data || data.data.length === 0),
  };
}
