import Vue from 'vue';

export const eventbus = new Vue();

const pluginInstall = {
  install() {
    Vue.prototype.$eventbus = eventbus;
  }
}

Vue.use(pluginInstall);