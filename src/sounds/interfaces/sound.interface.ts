import { User } from '@/users/interfaces/user.interface';
import { Upload } from '@/upload/interfaces/upload.interface';

export interface Sound {
  id: string;
  name: string;
  rewardId: string | null;
  user: User;
  file: Upload;
  updatedAt: Date;
  createdAt: Date;
}