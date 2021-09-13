import { ArgumentMetadata, Inject, Injectable, PipeTransform, Req, UnauthorizedException } from '@nestjs/common';
import { Sound } from '@/sounds/interfaces/sound.interface';
import { REQUEST } from '@nestjs/core';
import { Request } from '@/interfaces/request';

@Injectable()
export class CanUpdateSoundValidationPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private request: Request
  ) {
  }

  transform(value: Sound, metadata: ArgumentMetadata): Sound {
    if (this.request.user.id !== value.user.id) throw new UnauthorizedException();

    return value;
  }
}