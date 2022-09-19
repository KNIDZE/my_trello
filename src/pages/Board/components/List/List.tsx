import React from 'react';
import './list.scss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ICard } from '../../../../common/interfaces/ICard.t';
import Card from '../Card/Card';
import { delList } from '../../../../store/modules/board/actions';

// eslint-disable-next-line react/no-unused-prop-types
export default function List(props: { title: string; cards: ICard[]; id: number }): React.ReactElement {
  const { title, cards, id } = props;
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const cardsList = cards.map((key) => <Card key={key.id} title={key.title} />);
  return (
    <div className="list">
      <div className="delete_button" onClick={(): Promise<void> => delList()(dispatch, boardId || '', id.toString())} />
      <h2> {title} </h2>
      {cardsList}
      <button className="add_card">
        <p>+</p>
      </button>
    </div>
  );
}
