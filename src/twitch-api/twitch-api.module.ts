import { CacheModule, Module } from '@nestjs/common';
import { TwitchApiService } from './twitch-api.service';
import { TwitchCredentialsService } from '@/twitch-api/twitch-credentials.service';
import { TwitchCredentialsEntity } from '@/twitch-api/entities/twitch-credentials.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwitchApiController } from '@/twitch-api/twitch-api.controller';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([TwitchCredentialsEntity])
  ],
  controllers: [TwitchApiController],
  providers: [TwitchApiService, TwitchCredentialsService],
  exports: [TwitchApiService, TwitchCredentialsService]
})
export class TwitchApiModule {
}