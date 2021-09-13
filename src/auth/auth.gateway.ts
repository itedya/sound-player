import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { randomUUID } from 'crypto';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@WebSocketGateway()
export class AuthGateway {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
  }

  @WebSocketServer()
  server: Server

  @SubscribeMessage('socialite-id-request')
  async listenForSocialiteIdRequest() {
    const uuid = randomUUID();
    await this.cacheManager.set(`socialite-id.${uuid}`, true);

    this.server.sockets.emit('socialite-id', uuid);
  }
}