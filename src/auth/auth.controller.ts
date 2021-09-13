import { Controller, Get, HttpException, HttpStatus, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from './guards/jwt.guard';
import { TwitchOAuthHandlerRequestDto } from './dtos/twitch-oauth-handler.request.dto';
import { AuthService } from './auth.service';
import { appConfig } from '~/config';
import { TwitchApiService } from '@/twitch-api/twitch-api.service';
import { UsersService } from '@/users/users.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private twitchApiService: TwitchApiService,
    private usersService: UsersService,
    private authService: AuthService
  ) {
  }

  @UseGuards(JwtGuard)
  @Get('user')
  async getAuthUser(@Req() request) {
    return request.user;
  }

  @Get('redirect')
  @Redirect(`https://id.twitch.tv/oauth2/authorize?client_id=${appConfig.ttv.clientId}&redirect_uri=${appConfig.ttv.redirectUri}&response_type=code&scope=channel:read:redemptions`, 302)
  redirectToTwitchOAuth() {
    return {
      status: 302,
      url: `https://id.twitch.tv/oauth2/authorize?client_id=${appConfig.ttv.clientId}&redirect_uri=${appConfig.ttv.redirectUri}&response_type=code&scope=channel:read:redemptions`,
    };
  }

  @Get('handle')
  @Redirect(`/app`)
  async handleTwitchOAuth(@Res({ passthrough: true }) response: Response, @Query() queryParams: TwitchOAuthHandlerRequestDto) {
    // TODO: VULNERABILITY ON VALIDATION
    // TODO: NEED TO THROTTLE THIS REQUEST
    if (queryParams.code === undefined) throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
    }, HttpStatus.BAD_REQUEST);

    const ttvAuthData = await this.twitchApiService.loginToApi(queryParams.code)
      .catch(err => {
        if (err.response.status === 400) {
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            message: "Code query parameter is invalid."
          }, HttpStatus.BAD_REQUEST);
        } else {
          throw err;
        }
      })

    const ttvUser = await this.twitchApiService.getAuthUserData(ttvAuthData.access_token);
    let user = await this.usersService.findByProviderId(ttvUser.id);

    if (user) await this.authService.login(ttvAuthData, ttvUser, user);
    else user = await this.authService.register(ttvAuthData, ttvUser);

    const token = this.authService.signJWT(user);

    response.cookie(`token`, token);
  }
}