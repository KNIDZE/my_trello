import React, { ReactElement } from 'react';
import './logout.scss';
import { useNavigate } from 'react-router-dom';
import api from '../../api/request';

export function LogOut(): ReactElement {
  const navigate = useNavigate();
  function logOut(): void {
    api
      .post('/refresh', { refreshToken: localStorage.getItem('refresh_token') })
      .then(() => localStorage.removeItem('user_token'))
      .then(() => localStorage.setItem('is_auth', 'false'))
      .then(() => navigate('/login'));
  }
  return (
    <button className="log_out" onClick={(): void => logOut()}>
      log out
    </button>
  );
}