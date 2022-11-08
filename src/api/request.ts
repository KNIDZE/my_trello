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
    if (error.response.status === 401) {
      localStorage.setItem('is_auth', 'false');
      return (window.location.href = '/login');
    }
    if (error.response.status === 400) {
      // eslint-disable-next-line no-restricted-globals
      const curUrl = location.href;
      if (curUrl.slice(curUrl.length - 6, curUrl.length) === '/login') {
        const form = document.getElementsByClassName('login_form')[0];
        const warning = document.createElement('p');
        warning.innerHTML = 'This profile does not exist';
        warning.className = 'warning';
        form.append(warning);
      }
    }
    // eslint-disable-next-line no-console
    console.log(error);
    return error.response;
  }
);
export default instance;
