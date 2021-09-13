import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoundEntity } from '@/sounds/entities/sound.entity';
import { SoundsController } from '@/sounds/sounds.controller';
import { SoundsService } from '@/sounds/sounds.service';
import { UploadModule } from '@/upload/upload.module';
import { TwitchApiModule } from '@/twitch-api/twitch-api.module';


@Module({
  imports: [TypeOrmModule.forFeature([SoundEntity]), UploadModule, TwitchApiModule],
  controllers: [SoundsController],
  providers: [SoundsService],
  exports: [SoundsService]
})
export class SoundsModule {
}