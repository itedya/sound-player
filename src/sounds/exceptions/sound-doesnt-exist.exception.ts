import { HttpException, HttpStatus } from '@nestjs/common';

export class SoundDoesntExistException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.BAD_REQUEST,
      message: "Taki dźwięk nie istnieje!"
    }, HttpStatus.BAD_REQUEST);
  }
}