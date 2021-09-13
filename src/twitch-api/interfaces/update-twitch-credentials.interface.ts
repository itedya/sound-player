import { User } from '@/users/interfaces/user.interface';

export interface UpdateTwitchCredentials {
  id: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User
}