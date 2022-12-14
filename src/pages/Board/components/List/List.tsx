import React from 'react';
import './list.scss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CgCloseO } from 'react-icons/cg';
import { ICard } from '../../../../common/interfaces/ICard.t';
import Card from '../Card/Card';
import { delList, renameList } from '../../../../store/modules/board/actions';
import CardCreator from '../CardCreator/CardCreator';
import { dragEnterHandler } from '../Card/dragNdrop';
import Slot from '../Slot/Slot';
import { comparePositionCard } from '../../../../common/commonFunctions';

export default function List(props: { title: string; cards: ICard[]; id: number }): React.ReactElement {
  const { title, cards, id } = props;
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const cardsList = cards.sort(comparePositionCard).map((key) => (
    <div key={key.id} className="card_box" id={`card_box_${key.id}`}>
      <Slot id={key.id} />
      <Card title={key.title} id={key.id} listId={id} position={key.position} description={key.description} />
    </div>
  ));
  return (
    <div className="list" id={`list_${id}`} onDragEnter={(e): void => dragEnterHandler(e, boardId || '', dispatch)}>
      <div className="delete_button" onClick={(): Promise<void> => delList(dispatch, boardId || '', id.toString())}>
        <CgCloseO color="white" size={100} />
      </div>
      <h2
        id={`list_title_${id}`}
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
