import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import api from '../../api/request';
import { logIn } from '../Login/loginfunc';

interface ValidationProps {
  email: boolean;
  password: boolean;
  confirm: boolean;
}
export function objectsEqual(firstObg: ValidationProps, secondObg: ValidationProps): boolean {
  return (
    firstObg.password === secondObg.password &&
    firstObg.email === secondObg.email &&
    firstObg.confirm === secondObg.confirm
  );
}
export function emailValidation(email: string): boolean {
  if (!email.match(/^[a-zA-Z\d_.+-]+@[a-zA-Z\d-]+\.[a-zA-Z\d-.]+$/)) {
    return false;
  }
  return true;
}
export function isPasswordEqual(password1: string, password2: string): boolean {
  return password1 === password2;
}
export function isPasswordCorrect(): boolean {
  const password = document.getElementsByClassName('password_score')[0];
  if (!password) return false;
  const passwordScore = document.getElementsByClassName('password_score')[0].innerHTML;
  return passwordScore !== 'too short' && passwordScore !== 'weak';
}
function hasAccount(): void {
  const formEmail = document.getElementById('email')?.parentElement;
  const emailWarning = document.createElement('p');
  if (formEmail !== null && emailWarning !== null && document.getElementById('email_warning') === null) {
    emailWarning.id = 'email_warning';
    emailWarning.innerHTML = 'email has account';
    emailWarning.className = 'warning';
    formEmail?.append(emailWarning);
  }
}
function registration(email: string, password: string, navigate: NavigateFunction, dispatch: Dispatch): void {
  api
    .post('/user', {
      email,
      password,
    })
    .then((e) => {
      if (e.data?.error === 'User already exists') {
        hasAccount();
      } else {
        logIn(email, password, dispatch);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    });
}

export function signUp(
  allowed: ValidationProps,
  email: string,
  password: string,
  navigate: NavigateFunction,
  dispatch: Dispatch
): void {
  const allowReg = allowed.confirm && allowed.email && allowed.password;
  localStorage.removeItem('user_token');
  // eslint-disable-next-line no-alert,@typescript-eslint/no-unused-expressions
  if (allowReg) {
    // hasAccount();
    registration(email, password, navigate, dispatch);
  }
}
