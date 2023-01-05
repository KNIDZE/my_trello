import React, { ReactElement } from 'react';
import './Mistake.scss';

export function Mistake(props: { text: string; show: boolean }): ReactElement | null {
  const { text, show } = props;
  const visibility = show ? 'visible' : 'hidden';
  return (
    <p style={{ visibility }} className="warning">
      {text}
    </p>
  );
}
