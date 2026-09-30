import { httpClient } from '../../common/http';
import { PaginatedExperiences, Experience, CreateExperienceRequest } from '../domain/types';

export class ExperienceService {
  static async getPaginated(page: number = 1, limit: number = 8, search?: string, type?: string): Promise<PaginatedExperiences> {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    if (search) params.set('search', search);
    if (type && type !== 'todos') params.set('type', type);

    return httpClient<PaginatedExperiences>(`/api/experiencias?${params.toString()}`);
  }

  static async getById(id: string): Promise<Experience> {
    return httpClient<Experience>(`/api/experiencias/${id}`);
  }

  static async create(data: CreateExperienceRequest): Promise<Experience> {
    return httpClient<Experience>('/api/experiencias', {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth: true,
    });
  }

  static async update(id: string, data: Partial<CreateExperienceRequest>): Promise<Experience> {
    return httpClient<Experience>(`/api/experiencias/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      requiresAuth: true,
    });
  }

  static async delete(id: string): Promise<void> {
    return httpClient<void>(`/api/experiencias/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  }
}
