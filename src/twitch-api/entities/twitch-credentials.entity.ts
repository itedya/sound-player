import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { UserEntity } from '@/users/entities/user.entity';

@Entity("twitch_credentials")
export class TwitchCredentialsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  accessToken: string;

  @Column({ type: "varchar" })
  refreshToken: string;

  @Column({ type: "datetime" })
  expiresAt: Date;

  @OneToOne(() => UserEntity, user => user.token)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}