import React, { ReactElement, useEffect, useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { goSignUp, logIn } from './loginfunc';
import { Mistake } from '../../common/Mistake/Mistake';

export function Login(): ReactElement {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mistakeVisibility, setMistakeVisibility] = useState(false);
  const [buttonDisabled, setButtonDisabling] = useState(false);
  const dispatch = useDispatch();
  // button handler
  const HandleLogIn = async (): Promise<void> => {
    setButtonDisabling(true);
    const promise = await logIn(email, password, dispatch);
    if (promise) {
      navigate('/');
    } else {
      setMistakeVisibility(true);
    }
    setButtonDisabling(false);
  };
  useEffect(() => {
    if (localStorage.getItem('is_auth') === 'true') {
      navigate('/');
    }
  });
  return (
    <section className="login_section center_column">
      <div className="login_area center_column">
        <h1>Log in</h1>
        <form className="login_form" autoComplete="on">
          <p>Login</p>
          <input
            type="email"
            className="login_input"
            onChange={(e): void => {
              setEmail(e.currentTarget.value);
              setMistakeVisibility(false);
            }}
          />
          <Mistake text="This profile dose not exists" show={mistakeVisibility} />
          <p id="password_label">Password</p>
          <input
            type="password"
            className="login_input"
            onChange={(e): void => {
              setPassword(e.currentTarget.value);
              setMistakeVisibility(false);
            }}
          />
        </form>
        <button disabled={buttonDisabled} className="login_button" onClick={HandleLogIn}>
          Log in
        </button>
        <div className="login_registration_div">
          <p>First time here?</p>
          <p>
            <a
              className="sign_up_proposition"
              onClick={(): void => {
                goSignUp(navigate);
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
