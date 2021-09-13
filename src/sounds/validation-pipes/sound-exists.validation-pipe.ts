import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { SoundsService } from '@/sounds/sounds.service';
import { SoundDoesntExistException } from '@/sounds/exceptions/sound-doesnt-exist.exception';
import { Sound } from '@/sounds/interfaces/sound.interface';
import { classToPlain } from 'class-transformer';

@Injectable()
export class SoundExistsValidationPipe implements PipeTransform {
  constructor(
    private soundsService: SoundsService
  ) {
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<Sound> {
    const sound = await this.soundsService.get(value);

    if (!sound) throw new SoundDoesntExistException();

    // TODO: NAPRAW TO
    // @ts-ignore
    return classToPlain(sound);
  }
}