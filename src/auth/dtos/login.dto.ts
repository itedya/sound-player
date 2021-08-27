import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {

  @IsNotEmpty()
  @IsString()
  @Length(3, 64)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  password: string;

}