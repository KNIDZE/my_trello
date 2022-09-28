import React from 'react';
import './list.scss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ICard } from '../../../../common/interfaces/ICard.t';
import Card from '../Card/Card';
import { delList, renameList } from '../../../../store/modules/board/actions';
import CardCreator from '../CardCreator/CardCreator';

export default function List(props: { title: string; cards: ICard[]; id: number }): React.ReactElement {
  const { title, cards, id } = props;
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const cardsList = cards.map((key) => <Card key={key.id} title={key.title} cardId={key.id} listId={id} />);
  return (
    <div className="list">
      <div className="delete_button" onClick={(): Promise<void> => delList(dispatch, boardId || '', id.toString())} />
      <h2
        contentEditable="true"
        onBlur={(event): Promise<void> =>
          renameList(dispatch, event.currentTarget.textContent || '', id.toString(), boardId || '')
        }
      >
        {title}
      </h2>
      {cardsList}
      <CardCreator listId={id.toString()} />
    </div>
  );
}
