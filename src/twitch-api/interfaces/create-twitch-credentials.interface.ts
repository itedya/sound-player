import { User } from '@/users/interfaces/user.interface';

export interface CreateTwitchCredentials {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}