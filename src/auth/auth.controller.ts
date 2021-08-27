import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(JwtGuard)
  @Get("user")
  async getAuthUser(@Req() request) {
    return request.user;
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) throw new UnauthorizedException();

    return this.authService.login(user);
  }

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.username, registerDto.password);
  }
}