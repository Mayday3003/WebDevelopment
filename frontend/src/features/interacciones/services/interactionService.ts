import { httpClient } from '../../common/http';
import { Interaction, CreateInteractionRequest } from '../domain/types';

export class InteractionService {
  static async create(data: CreateInteractionRequest): Promise<Interaction> {
    return httpClient<Interaction>('/api/interacciones', {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth: true,
    });
  }

  static async getMyInteractions(): Promise<Interaction[]> {
    return httpClient<Interaction[]>('/api/interacciones/mias', {
      requiresAuth: true,
    });
  }

  static async getAllInteractions(): Promise<Interaction[]> {
    return httpClient<Interaction[]>('/api/interacciones', {
      requiresAuth: true,
    });
  }
}
