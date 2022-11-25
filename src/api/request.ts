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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${localStorage.getItem('user_token')}`;
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
