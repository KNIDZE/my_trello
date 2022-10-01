import React from 'react';
import './card.scss';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { delCard } from '../../../../store/modules/board/actions';
import { ICard } from '../../../../common/interfaces/ICard.t';
import Slot from '../Slot/Slot';
import { dragLeaveHandler, dragStartHandler } from './dragNdrop';

export default function Card(props: ICard): React.ReactElement {
  const { title, id } = props;
  const dispatch = useDispatch();
  const { boardId } = useParams();
  return (
    <div className="card_box" id={`card_box_${id}`} onDragLeave={(): void => dragLeaveHandler(id)}>
      <Slot id={id} />
      <div
        id={id.toString()}
        className="card"
        draggable="true"
        onDragStart={(e): void => {
          dragStartHandler(e, title, id);
        }}
      >
        <p className="inner_text">{title}</p>
        <div className="del_card" onClick={(): Promise<void> => delCard(dispatch, boardId || '', id)} />
      </div>
    </div>
  );
}
