import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UploadEntity } from '@/upload/entities/upload.entity';
import { CreateUpload } from '@/upload/interfaces/create-upload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { FileType } from '@/upload/enums/file-type.enum';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity) private uploadRepository: Repository<UploadEntity>,
  ) {
  }

  getByName(name: string) {
    return this.uploadRepository.findOne({
      relations: ['user'],
      where: { name },
    });
  }

  create(createUpload: CreateUpload) {
    return this.uploadRepository.save(createUpload);
  }

  changeType(uploadId: string, type: FileType) {
    return this.uploadRepository.save({ id: uploadId, type });
  }
}