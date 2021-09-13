import Vue from 'vue';
import axios from 'axios';

export class SoundsStoreModule {
  constructor() {
    this.state = Vue.observable({
      sounds: []
    });
  }

  get sounds() {
    return this.state.sounds;
  }

  set sounds(val) {
    this.state.sounds = val;
  }

  getSounds() {
    return axios.get(`/sounds`)
      .then(({ data }) => {
        this.sounds = data;
        return data;
      });
  }

  create(sound) {
    return axios.post(`/sounds`, sound)
      .then(({ data }) => {
        this.sounds.push(data);
        return data;
      })
  }

  update(sound) {
    return axios.put(`/sounds/${sound.id}`, {
      name: sound.name,
      rewardId: sound.rewardId
    })
      .then(({ data }) => {
        const index = this.sounds.findIndex(ele => ele.id === data.id);
        Object.assign(this.sounds[index], data);
      })
  }

  delete(soundId) {
    return axios.delete(`/sounds/${soundId}`)
      .then(() => {
        const index = this.sounds.findIndex(ele => ele.id === soundId);
        this.sounds.splice(index, 1);
      })
  }

}