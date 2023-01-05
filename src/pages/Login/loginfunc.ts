import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import api from '../../api/request';
import { getBoards } from '../../store/modules/boards/actions';

export function goSignUp(navigate: NavigateFunction): void {
  navigate('/registration');
}
interface LoginResponce {
  token: string;
  refreshToken: string;
}
export async function logIn(email: string, password: string, dispatch: Dispatch): Promise<boolean> {
  try {
    const response: LoginResponce = await api.post('/login', { email, password });
    localStorage.setItem('user_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    getBoards(dispatch);
    return true;
  } catch (e) {
    return false;
  }
}
