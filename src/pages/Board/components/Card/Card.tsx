import React from 'react';
import './card.scss';

export default function Card(props: { title: string }): React.ReactElement {
  const { title } = props;
  return (
    <div className="card">
      <p> {title} </p>
    </div>
  );
}
