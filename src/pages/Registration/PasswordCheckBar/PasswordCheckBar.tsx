import React, { useEffect, useState } from 'react';
import './passwordcheckbar.scss';

interface PasswordCheckerProps {
  password: string;
  minLength: number;
  onPasswordChange: (arg0: number) => void;
}

function getWarningLines(lineAmount: number): string[] {
  const colors = ['#FF7676FF', '#FF8D63FF', '#beff74'];
  return colors.slice(0, lineAmount);
}

function checkPassword(password: string, minLength: number): { warningMessage: string; warningCounter: number } {
  let warningMessage = '1';
  let warningCounter = 0;
  if (password === password.toLowerCase()) {
    warningMessage = 'Password must contain capital letters';
    warningCounter += 1;
  }
  if (password.search(/[0-9]+/) === -1) {
    warningMessage = 'Password must contain numbers';
    warningCounter += 1;
  }
  if (password.length < minLength) {
    warningMessage = `Password must contain at least ${minLength} characters`;
    warningCounter += 1;
  }
  if (password.length === 0) {
    warningCounter = 0;
    warningMessage = `Password empty`;
  }
  return { warningCounter, warningMessage };
}
export default function PasswordCheckBar({
  password,
  minLength,
  onPasswordChange,
}: PasswordCheckerProps): React.ReactElement {
  const [warning, setWarning] = useState('1');
  const [warningRects, setWarningRects] = useState<string[]>([]);

  useEffect(() => {
    const { warningMessage, warningCounter } = checkPassword(password, minLength);
    onPasswordChange(warningCounter);
    setWarningRects(password.length === 0 ? [] : getWarningLines(3 - warningCounter));
    setWarning(warningMessage);
  }, [password]);

  return (
    <div className="password_warning">
      <p style={{ visibility: warning.length === 1 ? 'hidden' : 'visible' }}>{warning} </p>
      <div className="warning_rect_container">
        {warningRects.map((color) => (
          <span key={color} className="warning_rect" style={{ backgroundColor: color }} />
        ))}
      </div>
    </div>
  );
}
