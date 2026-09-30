export interface Interaction {
  id: string;
  content: string;
  userId: string;
  experienceId: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  experience?: {
    id: string;
    title: string;
    type: string;
  };
  createdAt: string;
}

export interface CreateInteractionRequest {
  content: string;
  experienceId: string;
}
