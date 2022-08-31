import React from 'react';
import './board.scss';

export default function Board(props: { title: string; id: number }): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, id } = props;
  return (
    <div className="board">
      <h3> {title} </h3>
    </div>
  );
}
