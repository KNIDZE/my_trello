import React, { useState } from 'react';
import './card.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ICard } from '../../../../common/interfaces/ICard.t';
import { dragStartHandler } from './dragNdrop';
import { setDraggingState, setSlotPosition } from '../../../../store/modules/board/actions';

export default function Card(props: { card: ICard; listId: number; isDragging: boolean }): React.ReactElement {
  const { card, listId, isDragging } = props;
  const navigate = useNavigate();
  const path = useLocation();
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);
  const visibility = dragging ? 'hidden' : 'visible';
  const position = dragging ? 'absolute' : 'initial';
  // cut long sentence
  if (card.title.length > 30) {
    card.title = `${card.title.slice(0, 25)}...`;
  }
  return (
    <div
      id={card.id.toString()}
      className="card"
      draggable="true"
      style={{ visibility, position }}
      onDragStart={(e): void => {
        dragStartHandler(e, card, listId, dispatch);
        setDraggingState(true, dispatch);
        // Card not disappears from initial list if there isn't Timeout
        setTimeout(() => setDragging(true), 1);
      }}
      onDragEnd={(): void => {
        setDragging(false);
      }}
      onClick={(): void => {
        navigate(`${path.pathname}/card/${card.id}`);
      }}
      onDragOver={(e): void => {
        if (isDragging) {
          const elementRect = e.currentTarget.getBoundingClientRect();
          if (e.clientY > elementRect.y + elementRect.height / 2) setSlotPosition(card.position + 0.5, dispatch);
          if (e.clientY <= elementRect.y + elementRect.height / 2) setSlotPosition(card.position - 0.5, dispatch);
        }
      }}
    >
      <p className="inner_text">{card.title}</p>
    </div>
  );
}
