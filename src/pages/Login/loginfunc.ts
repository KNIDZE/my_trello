import { NavigateFunction } from 'react-router-dom';
import api from '../../api/request';
import { getBoards } from '../../store/modules/boards/actions';

export function goSignUp(navigate: NavigateFunction): void {
  navigate('/registration');
}

export async function logIn(email: string, password: string): Promise<boolean> {
  return api
    .post('/login', { email, password })
    .then((response) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      localStorage.setItem('user_token', response.token);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      localStorage.setItem('refresh_token', response.refreshToken);
      getBoards();
      return true;
    })
    .catch(() => {
      if (document.getElementsByClassName('warning')[0] == null) {
        const form = document.getElementsByClassName('login_form')[0];
        const warning = document.createElement('p');
        warning.innerHTML = 'This profile does not exist';
        warning.className = 'warning';
        form.insertBefore(warning, document.getElementById('password_label'));
      }
      return false;
    });
}
