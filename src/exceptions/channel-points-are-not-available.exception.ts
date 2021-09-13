import { HttpException, HttpStatus } from '@nestjs/common';

export class ChannelPointsAreNotAvailableException extends HttpException {
  constructor() {
    super({
      status: 400,
      message: "Punkty kanału nie są dostępne dla tego konta. Jeżeli sądzisz że jest inaczej, zaczekaj godzinę, danę są odświeżane po tej ilości czasu."
    }, HttpStatus.BAD_REQUEST);
  }
}