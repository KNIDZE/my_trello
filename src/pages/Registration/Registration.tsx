import React, { ReactElement, useEffect, useState } from 'react';
import './registration.scss';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useNavigate } from 'react-router-dom';
import {
  emailValidation,
  goLogin,
  isPasswordCorrect,
  isPasswordEqual,
  removeEmailWarning,
  signUp,
} from './registrationFunc';
import Loading from '../Home/components/Loading/Loading';

export function Registration(): ReactElement {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, changePassword] = useState('');
  const [email, changeEmail] = useState('');
  const [registration, allowRegistration] = useState([false, false, false]);
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
    <section className="registration_section center_column">
      <div className="registration_area center_column">
        <h1>Sign up</h1>
        <form id="registration_email">
          <p>email</p>
          <input
            className="login_input"
            id="email"
            onChange={(): void => removeEmailWarning()}
            onBlur={(e): void => {
              emailValidation(e.currentTarget.value, registration, allowRegistration);
              changeEmail(e.currentTarget.value);
            }}
          />
        </form>
        <form id="password_form">
          <p>password</p>
          <input
            type="password"
            id="password"
            className="login_input"
            onChange={(e): void => changePassword(e.currentTarget.value)}
            onBlur={(): void => isPasswordCorrect(registration, allowRegistration)}
          />
          <PasswordStrengthBar scoreWordClassName="password_score" minLength={8} password={password} />
        </form>
        <form id="confirm_password_form">
          <p>confirm password</p>
          <input
            type="password"
            className="login_input"
            onBlur={(e): void => isPasswordEqual(e.currentTarget.value, password, registration, allowRegistration)}
          />
        </form>
        <button className="login_button" onClick={(): void => signUp(registration, email, password, navigate)}>
          Sign up
        </button>
        <div className="login_registration_div">
          <p>Already have account?</p>
          <p>
            <a className="sign_up_proposition" onClick={(): void => goLogin(navigate)}>
              Log in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
