import React from 'react';
import './card.scss';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeCard, delCard } from '../../../../store/modules/board/actions';

export default function Card(props: { title: string; cardId: number; listId: number }): React.ReactElement {
  const { title, cardId, listId } = props;
  const dispatch = useDispatch();
  const { boardId } = useParams();
  return (
    <div className="card">
      <textarea
        className="inner_text"
        defaultValue={title}
        onBlur={(e): Promise<void> => changeCard(dispatch, boardId || '', cardId, listId, e.currentTarget.value)}
      />
      <div className="del_card" onClick={(): Promise<void> => delCard(dispatch, boardId || '', cardId)} />
    </div>
  );
}
