import { FileType } from '@/upload/enums/file-type.enum';
import { UserEntity } from '@/users/entities/user.entity';

export interface Upload {
  id: string;
  name: string;
  mimeType: string;
  type: FileType;
  user: UserEntity;
  createdAt: Date;
}