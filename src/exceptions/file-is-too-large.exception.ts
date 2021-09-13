import { HttpException, HttpStatus } from '@nestjs/common';

export class FileIsTooLargeException extends HttpException {
  constructor() {
    super({
      status: 400,
      message: "Plik jest za duży. Maksymalnie 10MB."
    }, HttpStatus.BAD_REQUEST);
  }
}