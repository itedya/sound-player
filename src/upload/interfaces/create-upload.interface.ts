import { FileType } from '@/upload/enums/file-type.enum';

export interface CreateUpload {
  name: string;
  mimeType: string;
  type: FileType;
  user: {
    id: string;
  }
}