import Vue from 'vue';
import { AuthStoreModule } from './auth.store-module';
import { TwitchApiStoreModule } from './twitch-api.store-module';
import { SoundsStoreModule } from './sounds.store-module';

export const store = {
  auth: new AuthStoreModule(),
  twitchApi: new TwitchApiStoreModule(),
  sounds: new SoundsStoreModule()
}

export default {
  install() {
    Vue.prototype.$store = store;
  }
}