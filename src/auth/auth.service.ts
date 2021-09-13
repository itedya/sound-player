import { Injectable } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HelixPrivilegedUser } from 'twitch';
import { UserRole } from '@/users/enums/user-role.enum';
import { TwitchCredentialsService } from '@/twitch-api/twitch-credentials.service';
import { User } from '@/users/interfaces/user.interface';
import { TwitchApiOAuthLoginRequest } from '@/twitch-api/interfaces/twitch-api-oauth-login.request';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private twitchCredentialsService: TwitchCredentialsService
  ) {
  }

  signJWT(user: User) {
    return this.jwtService.sign({
      id: user.id,
      providerId: user.providerId,
      username: user.username,
      role: user.role
    });
  }

  async login(ttvAuthData: TwitchApiOAuthLoginRequest, ttvUserData: HelixPrivilegedUser, user: User): Promise<User> {
    const ttvCredentials = await this.twitchCredentialsService.findByUserId(user.id);

    if (ttvCredentials) {
      await this.twitchCredentialsService.updateFromRawData({
        id: ttvCredentials.id,
        accessToken: ttvAuthData.access_token,
        refreshToken: ttvAuthData.refresh_token,
        expiresIn: ttvAuthData.expires_in,
        user
      });
    } else {
      await this.twitchCredentialsService.create({
        accessToken: ttvAuthData.access_token,
        refreshToken: ttvAuthData.refresh_token,
        expiresIn: ttvAuthData.expires_in,
        user
      });
    }

    return user;
  }

  async register(ttvAuthData: TwitchApiOAuthLoginRequest, ttvUserData: HelixPrivilegedUser): Promise<User> {
    const user: User = await this.usersService.create({
      providerId: ttvUserData.id,
      username: ttvUserData.name,
      role: UserRole.NormalUser,
    });

    await this.twitchCredentialsService.create({
      accessToken: ttvAuthData.access_token,
      refreshToken: ttvAuthData.refresh_token,
      expiresIn: ttvAuthData.expires_in,
      user
    });

    return user;
  }
}