import React, { ReactElement, useRef, useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import Loading from '../Home/components/Loading/Loading';
import { goSignUp, logIn } from './loginfunc';
import { Mistake } from '../../common/Mistake/Mistake';

export function Login(): ReactElement {
  const navigate = useNavigate();
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [transState, changeTransState] = useState(true);
  const [mistakeVisibility, showMistake] = useState(false);
  const [buttonDisabled, disableButton] = useState(false);
  const isAuthorised = localStorage.getItem('is_auth');
  const ref = useRef(null);
  const dispatch = useDispatch();
  // button handler
  const logInHandler = async (): Promise<void> => {
    await disableButton(true);
    const promise = await logIn(email, password, dispatch);
    if (promise) {
      await changeTransState(false);
      await setTimeout(() => {
        navigate('/');
      }, 500);
    } else {
      await showMistake(true);
    }
    await disableButton(false);
  };
  if (isAuthorised === 'true') {
    navigate('/');
  }
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
                showMistake(false);
              }}
            />
            <Mistake text="This profile dose not exists" show={mistakeVisibility} />
            <p id="password_label">Password</p>
            <input
              type="password"
              className="login_input"
              onChange={(e): void => {
                changePassword(e.currentTarget.value);
                showMistake(false);
              }}
            />
          </form>
          <button disabled={buttonDisabled} className="login_button" onClick={logInHandler}>
            Log in
          </button>
          <div className="login_registration_div">
            <p>First time here?</p>
            <p>
              <a
                className="sign_up_proposition"
                onClick={(): void => {
                  changeTransState(false);
                  // timeout for animation
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
