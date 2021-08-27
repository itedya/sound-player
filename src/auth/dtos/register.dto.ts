import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {

  @IsNotEmpty()
  @IsString()
  @Length(3, 64)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  password: string;

}