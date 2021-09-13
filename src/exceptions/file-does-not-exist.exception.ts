import { HttpException, HttpStatus } from '@nestjs/common';

export class FileDoesNotExistException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.BAD_REQUEST,
      message: "Plik nie istnieje!"
    }, HttpStatus.BAD_REQUEST);
  }
}