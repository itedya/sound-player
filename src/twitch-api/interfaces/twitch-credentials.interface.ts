import { User } from '@/users/interfaces/user.interface';

export interface TwitchCredentials {
  id: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  user: User;
}