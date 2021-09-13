import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { TwitchCredentialsEntity } from '@/twitch-api/entities/twitch-credentials.entity';
import { SoundEntity } from '@/sounds/entities/sound.entity';
import { UploadEntity } from '@/upload/entities/upload.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  providerId: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'smallint', default: 0 })
  role: UserRole;

  @OneToMany(() => SoundEntity, sound => sound.user)
  sounds: SoundEntity[];

  @OneToOne(() => TwitchCredentialsEntity, credentials => credentials.user)
  token: TwitchCredentialsEntity;

  @OneToMany(() => UploadEntity, upload => upload.user)
  uploadedFiles: UploadEntity[];

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}