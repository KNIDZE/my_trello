import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import React from 'react';
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
async function registration(
  email: string,
  password: string,
  navigate: NavigateFunction,
  dispatch: Dispatch,
  checkUser: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
  try {
    await api.post('/user', {
      email,
      password,
    });
    logIn(email, password, dispatch);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  } catch (e) {
    const error = e as AxiosError;
    const messageError = error.response?.data as { error: string };
    if (messageError.error === 'User already exists') {
      checkUser(true);
    }
  }
}

export async function signUp(
  allowed: ValidationProps,
  email: string,
  password: string,
  navigate: NavigateFunction,
  dispatch: Dispatch,
  checkUser: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
  const allowReg = allowed.confirm && allowed.email && allowed.password;
  await localStorage.removeItem('user_token');
  if (allowReg) {
    await registration(email, password, navigate, dispatch, checkUser);
  }
}
