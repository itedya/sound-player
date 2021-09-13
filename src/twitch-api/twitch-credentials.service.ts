import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TwitchCredentialsEntity } from '@/twitch-api/entities/twitch-credentials.entity';
import { TwitchCredentials } from '@/twitch-api/interfaces/twitch-credentials.interface';
import { CreateTwitchCredentials } from '@/twitch-api/interfaces/create-twitch-credentials.interface';
import { UpdateTwitchCredentials } from '@/twitch-api/interfaces/update-twitch-credentials.interface';

@Injectable()
export class TwitchCredentialsService {
  constructor(
    @InjectRepository(TwitchCredentialsEntity)
    private twitchCredentialsRepository: Repository<TwitchCredentialsEntity>,
  ) {
  }

  create(createTwitchCredentials: CreateTwitchCredentials) {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + createTwitchCredentials.expiresIn);

    return this.twitchCredentialsRepository.save({
      accessToken: createTwitchCredentials.accessToken,
      refreshToken: createTwitchCredentials.refreshToken,
      expiresAt: expiresAt,
      user: createTwitchCredentials.user
    });
  }

  findByUserId(userId: string): Promise<TwitchCredentialsEntity | undefined> {
    return this.twitchCredentialsRepository.findOne({
      relations: ['user'],
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  delete(credentials: TwitchCredentials) {
    return this.twitchCredentialsRepository.delete({ id: credentials.id });
  }

  update(twitchCredentials: TwitchCredentials) {
    return this.twitchCredentialsRepository.save(twitchCredentials);
  }

  updateFromRawData(updateTwitchCredentials: UpdateTwitchCredentials) {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + updateTwitchCredentials.expiresIn);

    return this.twitchCredentialsRepository.save({
      id: updateTwitchCredentials.id,
      accessToken: updateTwitchCredentials.accessToken,
      refreshToken: updateTwitchCredentials.refreshToken,
      expiresAt: expiresAt,
      user: updateTwitchCredentials.user
    });
  }
}