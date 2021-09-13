import Vue from 'vue';
import axios from 'axios';
import Cookie from 'js-cookie';

export class AuthStoreModule {
  constructor() {
    const token = Cookie.get('token');
    if (token) {
      this.token = token;
      Cookie.remove('token');
    }

    this.state = Vue.observable({
      user: false
    })
  }

  get token() {
    return localStorage.getItem('token');
  }

  set token(val) {
    if (val === null) {
      localStorage.removeItem('token');
      Cookie.remove('token');
    }
    else localStorage.setItem('token', val);
  }

  getUser() {
    return axios.get(`/auth/user`)
      .then(res => {
        this.state.user = res.data;
        return res.data
      })
      .catch(err => {
        this.token = null;
        this.state.user = false;
        return err;
      });
  }

  async attemptAuth() {
    window.location.href = '/auth/redirect';
  }
}