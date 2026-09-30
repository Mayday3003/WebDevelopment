export type ExperienceCategory = 'viaje' | 'situacion' | 'experiencia';

export interface Experience {
  id: string;
  title: string;
  type: ExperienceCategory;
  description: string;
  imageUrl: string | null;
  date: string | null;
  participants: string[];
  createdAt: string;
  interactions?: Array<{
    id: string;
    content: string;
    user?: {
      id: string;
      name: string;
    };
    createdAt: string;
  }>;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedExperiences {
  pagination: PaginationMeta;
  data: Experience[];
}

export interface CreateExperienceRequest {
  title: string;
  type: ExperienceCategory;
  description: string;
  imageUrl?: string;
  date?: string;
  participants?: string[];
}
