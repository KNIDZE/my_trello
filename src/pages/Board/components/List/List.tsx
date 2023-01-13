import React, { useState } from 'react';
import './list.scss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CgCloseO } from 'react-icons/cg';
import { Dispatch } from 'redux';
import { ICard } from '../../../../common/interfaces/ICard.t';
import Card from '../Card/Card';
import { delList, renameList } from '../../../../store/modules/board/actions';
import CardCreator from '../CardCreator/CardCreator';
import { dragEnterHandler } from '../Card/dragNdrop';
import Slot from '../Slot/Slot';
import { comparePositionCard, isStringValid, notValidString } from '../../../../common/commonFunctions';
import IList from '../../../../common/interfaces/IList';
import { Mistake } from '../../../../common/Mistake/Mistake';

export function renameListOrError(dispatch: Dispatch, title: string, listId: string, boardId: string): void {
  if (isStringValid(title)) renameList(dispatch, title, listId, boardId);
}
export default function List(props: { title: string; cards: ICard[]; id: number; lists: IList[] }): React.ReactElement {
  const { title, cards, id, lists } = props;
  const dispatch = useDispatch();
  const { boardId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [listTitle, setTitle] = useState(title);
  const cardsList = cards.sort(comparePositionCard).map((key) => (
    <div key={key.id} className="card_box" id={`card_box_${key.id}`}>
      <Slot id={key.id} />
      <Card card={key} list={props} />
    </div>
  ));
  const [mistake, setMistake] = useState({
    show: false,
    text: 'Empty',
    firstShow: true,
  });
  if (!isStringValid(listTitle) && !mistake.show && !mistake.firstShow) {
    const mistakeText = notValidString(listTitle);
    setMistake({
      show: true,
      text: mistakeText,
      firstShow: false,
    });
  }
  return (
    <div className="list" id={`list_${id}`} onDragEnter={(e): void => dragEnterHandler(e, boardId || '', dispatch)}>
      <div
        className="delete_button"
        onClick={(): Promise<void> => delList(dispatch, boardId || '', id.toString(), lists)}
      >
        <CgCloseO color="white" size={100} />
      </div>
      <h2
        id={`list_title_${id}`}
        contentEditable="true"
        suppressContentEditableWarning
        onInput={(event): void => {
          if (!isStringValid(event.currentTarget.innerHTML))
            setMistake({
              text: mistake.text,
              show: mistake.show,
              firstShow: false,
            });
          else
            setMistake({
              text: mistake.text,
              show: false,
              firstShow: false,
            });
          setTitle(event.currentTarget.innerHTML);
        }}
        onBlur={(event): void =>
          renameListOrError(dispatch, event.currentTarget.textContent || '', id.toString(), boardId || '')
        }
      >
        {title}
      </h2>
      <Mistake text={mistake.text} show={mistake.show} />
      {cardsList}
      <CardCreator listId={id.toString()} lastCardPos={cardsList.length} />
    </div>
  );
}
