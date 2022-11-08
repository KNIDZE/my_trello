import { NavigateFunction } from 'react-router-dom';
import api from '../../api/request';
import { getBoards } from '../../store/modules/boards/actions';

export function goSignUp(navigate: NavigateFunction): void {
  navigate('/registration');
}

export function logIn(navigate: NavigateFunction, email: string, password: string): void {
  api
    .post('/login', { email, password })
    .then((response) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      localStorage.setItem('user_token', response.token);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      localStorage.setItem('refresh_token', response.refreshToken);
      getBoards();
      setTimeout(() => {
        navigate('/');
      }, 200);
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));
}
