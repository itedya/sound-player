import axios from 'axios';
import { store } from '../store';

axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.auth.token}`;

  return config;
});