// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Loading from '../Home/components/Loading/Loading';
import { goSignUp, logIn } from './loginfunc';

export function Login(): ReactElement {
  const navigate = useNavigate();
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [transState, changeTransState] = useState(true);
  const isAuthorised = localStorage.getItem('is_auth');
  const ref = useRef(null);
  useEffect(() => {
    if (isAuthorised === 'true') {
      navigate('/');
    }
  });
  if (isAuthorised === 'true') {
    return <Loading />;
  }
  return (
    <CSSTransition nodeRef={ref} in={transState} appear timeout={200} classNames="login_trans">
      <section className="login_section center_column">
        <div ref={ref} className="login_area center_column">
          <h1>Log in</h1>
          <form className="login_form" autoComplete="on">
            <p>Login</p>
            <input
              type="email"
              className="login_input"
              onChange={(e): void => {
                changeEmail(e.currentTarget.value);
              }}
            />
            <p id="password_label">Password</p>
            <input
              type="password"
              className="login_input"
              onChange={(e): void => {
                changePassword(e.currentTarget.value);
              }}
            />
          </form>
          <button
            className="login_button"
            onClick={async (): Promise<void> => {
              const promise = await logIn(email, password);
              if (promise) {
                changeTransState(false);
                setTimeout(() => {
                  navigate('/');
                }, 500);
              }
            }}
          >
            Log in
          </button>
          <div className="login_registration_div">
            <p>First time here?</p>
            <p>
              <a
                className="sign_up_proposition"
                onClick={(): void => {
                  changeTransState(false);
                  setTimeout(() => goSignUp(navigate), 1000);
                }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </section>
    </CSSTransition>
  );
}
