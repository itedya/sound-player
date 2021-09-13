import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@/users/entities/user.entity';
import { FileType } from '@/upload/enums/file-type.enum';

@Entity("uploads")
export class UploadEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  mimeType: string;

  @Column({ type: "varchar" })
  type: FileType;

  @ManyToOne(() => UserEntity, user => user.uploadedFiles)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}