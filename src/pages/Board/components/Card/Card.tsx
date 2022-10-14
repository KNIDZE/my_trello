import React from 'react';
import './card.scss';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { delCard } from '../../../../store/modules/board/actions';
import { ICard } from '../../../../common/interfaces/ICard.t';
import { dragEnterCard, dragStartHandler } from './dragNdrop';

export default function Card(props: ICard): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, id } = props;
  const dispatch = useDispatch();
  const { boardId } = useParams();
  return (
    <div
      id={id.toString()}
      className="card"
      draggable="true"
      onDragStart={(e): void => {
        dragStartHandler(e, title, id);
      }}
      onDragEnter={(e): void => dragEnterCard(e)}
    >
      <p className="inner_text">{title}</p>
      <div className="del_card" onClick={(): Promise<void> => delCard(dispatch, boardId || '', id)} />
    </div>
  );
}
