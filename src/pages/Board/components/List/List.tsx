import React from 'react';
import './list.scss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ICard } from '../../../../common/interfaces/ICard.t';
import Card from '../Card/Card';
import { delList, renameList } from '../../../../store/modules/board/actions';
import CardCreator from '../CardCreator/CardCreator';
import { dragEnterHandler } from '../Card/dragNdrop';

export default function List(props: { title: string; cards: ICard[]; id: number }): React.ReactElement {
  const { title, cards, id } = props;
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const cardsList = cards.map((key) => (
    <Card key={key.id} title={key.title} id={key.id} listId={id} position={key.position} />
  ));
  return (
    <div className="list" onDragEnter={(e): void => dragEnterHandler(e, cardsList)}>
      <div className="delete_button" onClick={(): Promise<void> => delList(dispatch, boardId || '', id.toString())} />
      <h2
        contentEditable="true"
        suppressContentEditableWarning
        onBlur={(event): Promise<void> =>
          renameList(dispatch, event.currentTarget.textContent || '', id.toString(), boardId || '')
        }
      >
        {title}
      </h2>
      {cardsList}
      <CardCreator listId={id.toString()} lastCardPos={cardsList.length} />
    </div>
  );
}
