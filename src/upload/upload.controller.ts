import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as mime from 'mime';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { UploadService } from '@/upload/upload.service';
import { FileIsTooLargeException } from '@/exceptions/file-is-too-large.exception';
import { FileMimeIsNotAllowedException } from '@/exceptions/file-mime-is-not-allowed.exception';
import { FileType } from '@/upload/enums/file-type.enum';

@Controller('upload')
export class UploadController {
  constructor(
    private uploadService: UploadService,
  ) {
  }

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './storage/temp',
      filename: (req, file, cb) => {
        const name = randomUUID();
        const ext = mime.getExtension(file.mimetype);

        // @ts-ignore
        // try to fix this
        const userId = req.user.id;

        cb(null, `${userId}--${name}.${ext}`);
      },
    }),
    fileFilter(req, file, cb) {
      const allowedMime = ['audio/mp3', 'audio/mpeg', 'audio/wav'];

      if (file.size > 10485760) {
        cb(new FileIsTooLargeException(), false);
      } else if (!allowedMime.includes(file.mimetype)) {
        cb(new FileMimeIsNotAllowedException(), false);
      } else {
        cb(null, true);
      }
    },
  }))
  async uploadFile(@Req() request, @UploadedFile() file: Express.Multer.File) {
    await this.uploadService.create({
      name: file.filename,
      mimeType: file.mimetype,
      type: FileType.TEMP,
      user: { id: request.user.id },
    });

    return file.filename;
  }
}