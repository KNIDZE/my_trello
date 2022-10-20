import React from 'react';
import './card.scss';
import { Link } from 'react-router-dom';
import { ICard } from '../../../../common/interfaces/ICard.t';
import { dragStartHandler } from './dragNdrop';

export default function Card(props: ICard): React.ReactElement {
  const { title, id } = props;
  return (
    <div
      id={id.toString()}
      className="card"
      draggable="true"
      onDragStart={(e): void => {
        dragStartHandler(e, title, id);
      }}
    >
      <Link className="card_link" to={`card/${id}`}>
        <p className="inner_text">{title}</p>
      </Link>
    </div>
  );
}
