import React, { ReactElement, useEffect, useState } from 'react';
import './registration.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { emailValidation, isPasswordEqual, signUp } from './registrationFunc';
import { Mistake } from '../../common/Mistake/Mistake';
import PasswordCheckBar from './PasswordCheckBar/PasswordCheckBar';

export function Registration(): ReactElement {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [amountPasswordProblems, setPasswordProblems] = useState(1);
  const [secondPassword, setSecondPassword] = useState('');
  const [isUserExists, setUserCheck] = useState(false);
  const [canRegister, setRegistrationPermission] = useState({
    emailValid: false,
    passwordValid: false,
    secondPasswordValid: false,
  });

  const [buttonDisabled, disableButton] = useState(false);
  useEffect(() => {
    const isAuthorised = localStorage.getItem('is_auth');
    if (isAuthorised === 'true') {
      navigate('/');
    }
  }, []);
  useEffect(() => {
    const newValidationState = {
      emailValid: emailValidation(email),
      passwordValid: amountPasswordProblems === 0,
      secondPasswordValid: isPasswordEqual(password, secondPassword),
    };
    setRegistrationPermission(newValidationState);
  }, [email, password, secondPassword]);
  return (
    <section className="registration_section center_column">
      <div className="registration_area center_column">
        <h1>Sign up</h1>
        <form className="registration_form">
          <p>email</p>
          <input
            className="login_input"
            id="email"
            onInput={(e): void => {
              setEmail(e.currentTarget.value);
              setUserCheck(false);
            }}
          />
          <Mistake
            text={isUserExists ? 'This user exists' : 'Please, enter the existing email'}
            show={(!canRegister.emailValid && email.length !== 0) || isUserExists}
          />
          <p>password</p>
          <input
            type="password"
            id="password"
            className="login_input"
            onInput={(e): void => {
              setPassword(e.currentTarget.value);
            }}
            onChange={(e): void => {
              setPassword(e.currentTarget.value);
            }}
          />
          <PasswordCheckBar password={password} minLength={8} onPasswordChange={setPasswordProblems} />
          <p>confirm password</p>
          <input
            type="password"
            className="login_input"
            onChange={(e): void => setSecondPassword(e.currentTarget.value)}
          />
          <Mistake text="Passwords not equal" show={!canRegister.secondPasswordValid && secondPassword.length !== 0} />
        </form>
        <button
          className="login_button"
          disabled={buttonDisabled}
          onClick={(): void => {
            disableButton(true);
            signUp(canRegister, email, password, navigate, dispatch, setUserCheck).then(() => disableButton(false));
          }}
        >
          Sign up
        </button>
        <div className="login_registration_div">
          <p>Already have account?</p>
          <p>
            <a
              className="sign_up_proposition"
              onClick={(): void => {
                setTimeout(() => navigate(`/login`), 700);
              }}
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
