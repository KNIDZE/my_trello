import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import api from '../../api/request';
import { logIn } from '../Login/loginfunc';

export function emailValidation(
  email: string,
  allow: boolean[],
  allow_func: Dispatch<SetStateAction<boolean[]>>
): void {
  if (!email.match(/^[a-zA-Z\d_.+-]+@[a-zA-Z\d-]+\.[a-zA-Z\d-.]+$/)) {
    document.getElementById('email')?.classList.add('not_valid');
    // eslint-disable-next-line no-param-reassign
    allow[0] = false;
    allow_func(allow);
  } else {
    document.getElementById('email')?.classList.remove('not_valid');
    // eslint-disable-next-line no-param-reassign
    allow[0] = true;
    allow_func(allow);
  }
}
export function isPasswordEqual(
  password1: string,
  password2: string,
  allow: boolean[],
  allow_func: Dispatch<SetStateAction<boolean[]>>
): void {
  if (password1 !== password2) {
    const form = document.getElementById('confirm_password_form');
    const warning = document.createElement('p');
    warning.id = 'confirm_warning';
    warning.innerHTML = 'passwords not match';
    warning.className = 'warning';
    // eslint-disable-next-line no-param-reassign
    allow[2] = false;
    allow_func(allow);
    if (form !== null && document.getElementById('confirm_warning') == null) form.append(warning);
  } else {
    document.getElementById('confirm_warning')?.remove();
    // eslint-disable-next-line no-param-reassign
    allow[2] = true;
    allow_func(allow);
  }
}
export function isPasswordCorrect(allow: Array<boolean>, allow_func: Dispatch<SetStateAction<boolean[]>>): void {
  const passwordScore = document.getElementsByClassName('password_score')[0].innerHTML;
  // eslint-disable-next-line no-param-reassign
  allow[1] = passwordScore !== 'too short' && passwordScore !== 'weak';
  allow_func(allow);
  if (!allow[1]) {
    const form = document.getElementById('password_form');
    const warning = document.createElement('p');
    warning.id = 'warning';
    warning.className = 'warning';
    warning.innerHTML = 'password too short/too week';
    if (form !== null && document.getElementById('warning') == null) form.insertBefore(warning, form.children[2]);
  } else {
    document.getElementById('warning')?.remove();
  }
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
function registration(email: string, password: string, navigate: NavigateFunction): void {
  // eslint-disable-next-line no-console
  console.log(email, password);
  api
    .post('/user', {
      email,
      password,
    })
    .then((e) => {
      if (e.data?.error === 'User already exists') {
        hasAccount();
      } else {
        logIn(navigate, email, password);
      }
    });

  // eslint-disable-next-line no-console
  // hasAccount();
}

export function signUp(allowed: Array<boolean>, email: string, password: string, navigate: NavigateFunction): void {
  const allowReg = allowed.reduce((p, c) => p && c, true);
  localStorage.removeItem('user_token');
  // eslint-disable-next-line no-alert,@typescript-eslint/no-unused-expressions
  if (allowReg) {
    // hasAccount();
    registration(email, password, navigate);
  }
}
export function removeEmailWarning(): void {
  document.getElementById('email_warning')?.remove();
}

export function goLogin(navigate: NavigateFunction): void {
  navigate(`/login`);
}
