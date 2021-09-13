import { IsNotEmpty, Length } from 'class-validator';

export class TwitchOAuthHandlerRequestDto {
  @IsNotEmpty()
  @Length(30, 30)
  code: string;
}