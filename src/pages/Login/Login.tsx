import React, { ReactElement, useEffect, useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import Loading from '../Home/components/Loading/Loading';
import { goSignUp, logIn } from './loginfunc';

export function Login(): ReactElement {
  const navigate = useNavigate();
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const isAuthorised = localStorage.getItem('is_auth');

  useEffect(() => {
    if (isAuthorised === 'true') {
      navigate('/');
    }
  });

  if (isAuthorised === 'true') {
    return <Loading />;
  }
  return (
    <section className="login_section center_column">
      <div className="login_area center_column">
        <h1>Log in</h1>
        <form className="login_form">
          <p>Login</p>
          <input
            className="login_input"
            onBlur={(e): void => {
              changeEmail(e.currentTarget.value);
            }}
          />
        </form>
        <form>
          <p>Password</p>
          <input
            type="password"
            className="login_input"
            onBlur={(e): void => {
              changePassword(e.currentTarget.value);
            }}
          />
        </form>
        <button className="login_button" onClick={(): void => logIn(navigate, email, password)}>
          Log in
        </button>
        <div className="login_registration_div">
          <p>First time here?</p>
          <p>
            <a className="sign_up_proposition" onClick={(): void => goSignUp(navigate)}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
