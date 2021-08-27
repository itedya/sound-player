import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      message: "Unauthorized"
    }, HttpStatus.UNAUTHORIZED);
  }
}