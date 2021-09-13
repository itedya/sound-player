import { UserRole } from '@/users/enums/user-role.enum';

export interface CreateUser {
  providerId: string;
  username: string;
  role: UserRole;
}