import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateSoundDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 64)
  name: string;

  @IsString()
  @Length(36, 36)
  rewardId: string | null;
}