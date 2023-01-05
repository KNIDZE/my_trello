import React, { ReactElement } from 'react';
import './logout.scss';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';
import api from '../../api/request';

async function logOut(navigate: NavigateFunction): Promise<void> {
  await api.post('/refresh', { refreshToken: localStorage.getItem('refresh_token') });
  await localStorage.removeItem('user_token');
  await localStorage.setItem('is_auth', 'false');
  await navigate('/login');
}
export function LogOut(): ReactElement {
  const navigate = useNavigate();
  return (
    <button className="log_out" onClick={(): Promise<void> => logOut(navigate)}>
      <HiOutlineLogout fontWeight="50px" className="log_out_icon" />
    </button>
  );
}
