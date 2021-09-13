import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UploadEntity } from '@/upload/entities/upload.entity';
import { UserEntity } from '@/users/entities/user.entity';

@Entity("sounds")
export class SoundEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", nullable: true, default: null })
  rewardId: string | null;

  @OneToOne(() => UploadEntity)
  @JoinColumn({ name: "fileId", referencedColumnName: "id" })
  file: UploadEntity;

  @ManyToOne(() => UserEntity, user => user.sounds)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}