import React, { useState } from 'react';
import './card.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ICard } from '../../../../common/interfaces/ICard.t';
import { dragStartHandler } from './dragNdrop';

type Visible = 'visible' | 'hidden';
export default function Card(props: { card: ICard }): React.ReactElement {
  const { card } = props;
  const navigate = useNavigate();
  const path = useLocation();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibility, setVisibility] = useState<Visible>();

  // cut long sentence
  if (card.title.length > 30) {
    card.title = `${card.title.slice(0, 25)}...`;
  }
  return (
    <div
      id={card.id.toString()}
      className="card"
      draggable="true"
      style={{ visibility }}
      onDragStart={(e): void => {
        dragStartHandler(e, card, dispatch);
        // Card not disappears from initial list if there isn't Timeout
        setTimeout(() => setVisibility('hidden'), 1);
      }}
      onDragEnd={(): void => setVisibility('visible')}
      onClick={(): void => {
        navigate(`${path.pathname}/card/${card.id}`);
      }}
    >
      <p className="inner_text">{card.title}</p>
    </div>
  );
}
