import { Module } from '@nestjs/common';
import { UploadController } from '@/upload/upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from '@/upload/upload.service';
import { UploadEntity } from '@/upload/entities/upload.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UploadEntity]),
    MulterModule.register({
      dest: './storage/temp',
    })
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService]
})
export class UploadModule {

}