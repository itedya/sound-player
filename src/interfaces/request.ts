import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
  user?: {
    id: string;
    providerId: string;
    username: string;
    role: number;
  }
}