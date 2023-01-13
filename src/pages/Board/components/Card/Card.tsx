import React from 'react';
import './card.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICard } from '../../../../common/interfaces/ICard.t';
import { dragStartHandler } from './dragNdrop';
import IList from '../../../../common/interfaces/IList';

export default function Card(props: { card: ICard; list: IList }): React.ReactElement {
  const navigate = useNavigate();
  const path = useLocation();
  const { card, list } = props;
  // cut long sentence
  if (card.title.length > 30) {
    card.title = `${card.title.slice(0, 25)}...`;
  }
  return (
    <div
      id={card.id.toString()}
      className="card"
      draggable="true"
      onDragStart={(e): void => {
        dragStartHandler(e, card.title, card.id, list.id);
      }}
      onClick={(): void => {
        navigate(`${path.pathname}/card/${card.id}`);
      }}
    >
      <p className="inner_text">{card.title}</p>
    </div>
  );
}
