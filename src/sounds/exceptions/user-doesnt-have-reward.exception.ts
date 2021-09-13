import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDoesntHaveRewardException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.BAD_REQUEST,
      messge: "Użytkownik nie ma takiej nagrody za punkty!"
    }, HttpStatus.BAD_REQUEST);
  }
}