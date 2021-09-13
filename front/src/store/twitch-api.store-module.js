import Vue from 'vue';
import axios from 'axios';

export class TwitchApiStoreModule {
  constructor() {
    this.state = Vue.observable({
      channelRewards: []
    })
  }

  getAuthChannelRewards() {
    return axios.get(`/twitch-api/channel-points-rewards`)
      .then(({ data }) => {
        this.channelRewards = data;
        return data;
      })
  }

  get channelRewards() {
    return this.state.channelRewards;
  }

  set channelRewards(val) {
    this.state.channelRewards = val;
  }
}