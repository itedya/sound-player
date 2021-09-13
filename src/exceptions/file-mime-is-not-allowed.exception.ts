import { HttpException, HttpStatus } from '@nestjs/common';

export class FileMimeIsNotAllowedException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.BAD_REQUEST,
      message: "Typ pliku nie jest dozwolony. Dozwolone: mpga, mp2, mp2a, mp3, m2a, m3a, wav"
    }, HttpStatus.BAD_REQUEST);
  }
}