import axios from 'axios';
import { ApiClient, HelixCustomReward, RefreshableAuthProvider, StaticAuthProvider } from 'twitch';
import { appConfig } from '~/config';
import { TwitchApiOAuthLoginRequest } from '@/twitch-api/interfaces/twitch-api-oauth-login.request';
import { TwitchCredentialsService } from '@/twitch-api/twitch-credentials.service';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ChannelPointsAreNotAvailableException } from '@/exceptions/channel-points-are-not-available.exception';
import { Cache } from 'cache-manager';
import { classToPlain } from 'class-transformer';
import { ChannelPointsReward } from '@/twitch-api/interfaces/channel-points-reward.interface';

@Injectable()
export class TwitchApiService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private twitchCredentialService: TwitchCredentialsService,
  ) {
  }

  public cachedAuthProviders: { [key: string]: RefreshableAuthProvider } = {};

  /**
   * Create Twitch Api auth provider. Required for Twitch Api client.
   *
   * @param userId
   * @return RefreshableAuthProvider
   */
  async getAuthProvider(userId: string) {
    if (this.cachedAuthProviders[userId]) return this.cachedAuthProviders[userId];

    let token = await this.twitchCredentialService.findByUserId(userId);

    if (token.expiresAt.getTime() <= new Date().getTime()) {
      const response = await this.refreshToken(token.refreshToken);
      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + response.expires_in);

      await this.twitchCredentialService.update({
        id: token.id,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        expiresAt,
        user: token.user,
      });
      token = { ...token, accessToken: response.access_token, refreshToken: response.refresh_token, expiresAt };
    }

    const authProvider = new RefreshableAuthProvider(
      new StaticAuthProvider(appConfig.ttv.clientId, token.accessToken),
      {
        clientSecret: appConfig.ttv.clientSecret,
        refreshToken: token.refreshToken,
        expiry: token.expiresAt,
        onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
          await this.twitchCredentialService.update({
            id: token.id,
            accessToken,
            refreshToken,
            expiresAt: expiryDate,
            user: token.user,
          });
        },
      },
    );

    this.cachedAuthProviders[userId] = authProvider;

    return authProvider;
  }

  async getChannelPointsRewards(userId: string, providerId: string) {
    const fromCache = await this.cacheManager.get<ChannelPointsReward[] | null>(`channel-rewards.${providerId}`);
    if (fromCache) {
      return fromCache.map(ele => ({
        id: ele.id,
        backgroundColor: ele.backgroundColor,
        cost: ele.cost,
        title: ele.title,
      }));
    }

    const authProvider = await this.getAuthProvider(userId);
    const apiClient = this.createApiClient(authProvider);

    return apiClient.helix.channelPoints.getCustomRewards(providerId)
      .then(async res => {
        const mapped = res.map(ele => ({
          id: ele.id,
          backgroundColor: ele.backgroundColor,
          cost: ele.cost,
          title: ele.title,
        }));

        await this.cacheManager.set(`channel-rewards.${providerId}`, mapped, { ttl: 30 });

        return mapped;
      })
      .catch(async err => {
        if (err._body.message === 'channel points are not available for the broadcaster') {
          await this.cacheManager.set(`channel-rewards.${providerId}`, null, 3600);
          throw new ChannelPointsAreNotAvailableException();
        } else {
          await this.cacheManager.set(`channel-rewards.${providerId}`, null, 240);
          throw err;
        }
      });
  }

  /**
   * Create Twitch Api Client
   *
   * @param authProvider
   */
  createApiClient(authProvider: RefreshableAuthProvider) {
    return new ApiClient({ authProvider });
  }

  /**
   * Login to twitch api by one-time-use code
   *
   * @param code
   */
  loginToApi(code: string): Promise<TwitchApiOAuthLoginRequest> {
    return axios.post('https://id.twitch.tv/oauth2/token', undefined, {
      params: {
        client_id: appConfig.ttv.clientId,
        client_secret: appConfig.ttv.clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: appConfig.ttv.redirectUri,
      },
    })
      .then(res => res.data);
  }

  /**
   * Get Access Token by refresh token
   *
   * @param refreshToken
   */
  refreshToken(refreshToken: string): Promise<TwitchApiOAuthLoginRequest> {
    return axios.post('https://id.twitch.tv/oauth2/token', undefined, {
      params: {
        client_id: appConfig.ttv.clientId,
        client_secret: appConfig.ttv.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
    })
      .then(res => res.data);
  }

  /**
   * Get auth user data without
   *
   * @return
   */
  getAuthUserData(accessToken: string) {
    const authProvider = new StaticAuthProvider(appConfig.ttv.clientId, accessToken);
    const apiClient = new ApiClient({ authProvider });

    return apiClient.helix.users.getMe();
  }
}