import { IsNotEmpty, IsString, Length } from 'class-validator';
import { UpdateSoundDto } from '@/sounds/dtos/update-sound.dto';

export class CreateSoundDto extends UpdateSoundDto {
  @IsNotEmpty()
  @IsString()
  @Length(72, 82)
  file: string;
}