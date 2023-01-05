import React, { ReactElement, useEffect, useRef, useState } from 'react';
import './registration.scss';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { emailValidation, isPasswordCorrect, isPasswordEqual, objectsEqual, signUp } from './registrationFunc';
import Loading from '../Home/components/Loading/Loading';
import { Mistake } from '../../common/Mistake/Mistake';

export function Registration(): ReactElement {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [password, changePassword] = useState('');
  const [email, changeEmail] = useState('');
  const [secondPassword, changeSecondPassword] = useState('');
  const [registration, allowRegistration] = useState({
    email: false,
    password: false,
    confirm: false,
  });
  const [transState, changeTransState] = useState(true);
  const isAuthorised = localStorage.getItem('is_auth');
  useEffect(() => {
    if (isAuthorised === 'true') {
      navigate('/');
    }
  });
  const newValidationState = {
    email: emailValidation(email),
    password: isPasswordCorrect(),
    confirm: isPasswordEqual(password, secondPassword),
  };
  if (!objectsEqual(registration, newValidationState)) {
    allowRegistration(newValidationState);
  }
  if (isAuthorised === 'true') {
    return <Loading />;
  }
  return (
    <CSSTransition nodeRef={ref} in={transState} appear timeout={200} classNames="registration_trans">
      <section className="registration_section center_column">
        <div ref={ref} className="registration_area center_column">
          <h1>Sign up</h1>
          <form className="registration_form">
            <p>email</p>
            <input
              className="login_input"
              id="email"
              onBlur={(e): void => {
                changeEmail(e.currentTarget.value);
              }}
            />
            <Mistake text="Please, enter the existing email" show={!registration.email && email.length !== 0} />
            <p>password</p>
            <input
              type="password"
              id="password"
              className="login_input"
              onInput={(e): void => {
                changePassword(e.currentTarget.value);
              }}
              onFocus={(e): void => {
                changePassword(e.currentTarget.value);
              }}
            />
            <PasswordStrengthBar scoreWordClassName="password_score" minLength={8} password={password} />
            <Mistake
              text="Password must contain uppercase, lowercase, numbers"
              show={!registration.password && password.length !== 0}
            />
            <p>confirm password</p>
            <input
              type="password"
              className="login_input"
              onChange={(e): void => changeSecondPassword(e.currentTarget.value)}
            />
            <Mistake text="Passwords not equal" show={!registration.confirm && secondPassword.length !== 0} />
          </form>
          <button
            className="login_button"
            onClick={(): void => signUp(registration, email, password, navigate, useDispatch())}
          >
            Sign up
          </button>
          <div className="login_registration_div">
            <p>Already have account?</p>
            <p>
              <a
                className="sign_up_proposition"
                onClick={(): void => {
                  changeTransState(false);
                  setTimeout(() => navigate(`/login`), 700);
                }}
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </section>
    </CSSTransition>
  );
}
