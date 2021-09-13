import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { TwitchApiService } from '@/twitch-api/twitch-api.service';

@Controller("twitch-api")
export class TwitchApiController {
  constructor(
    private twitchApiService: TwitchApiService
  ) {
  }

  @Get("channel-points-rewards")
  @UseGuards(JwtGuard)
  async getChannelPointsRewards(@Req() request) {
    return this.twitchApiService.getChannelPointsRewards(request.user.id, request.user.providerId);
  }
}