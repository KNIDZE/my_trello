import axios from 'axios';
import { api } from '../common/constants';

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('user_token')}`, // к этому мы ещё вернёмся как-нибудь потом
  },
});
instance.interceptors.request.use((config) => {
  const conf = config;
  if (conf.headers) {
    conf.headers.Authorization = `Bearer ${localStorage.getItem('user_token')}`;
    return conf;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => {
    localStorage.setItem('is_auth', 'true');
    return res.data;
  },
  (error) => {
    // eslint-disable-next-line no-restricted-globals
    if (error.response.status === 401 && location.href.slice(-6, location.href.length) !== '/login') {
      localStorage.setItem('is_auth', 'false');
      return (window.location.href = '/login');
    }
    throw error;
  }
);
export default instance;
