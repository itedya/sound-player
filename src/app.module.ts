import { CacheModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { SoundsModule } from '@/sounds/sounds.module';
import { UploadModule } from '@/upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CacheModule.register(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'front/dist'),
    }),
    UploadModule,
    SoundsModule,
    UsersModule,
    AuthModule,
  ]
})
export class AppModule {}
