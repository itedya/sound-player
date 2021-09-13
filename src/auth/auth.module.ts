import { CacheModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TwitchApiModule } from '@/twitch-api/twitch-api.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { appConfig } from '~/config';
import { AuthGateway } from '@/auth/auth.gateway';

@Module({
  imports: [
    UsersModule,
    TwitchApiModule,
    CacheModule.register(),
    JwtModule.register({
      secret: appConfig.jwt.secret,
      signOptions: { expiresIn: appConfig.jwt.expiresIn }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthGateway],
  exports: [AuthService]
})
export class AuthModule {
}