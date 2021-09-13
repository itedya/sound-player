import { CreateUser } from '@/users/interfaces/create-user.interface';

export interface User extends CreateUser {
  id: string;
  updatedAt: Date;
  createdAt: Date;
}