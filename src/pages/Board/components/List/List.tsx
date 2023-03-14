import React, { useState } from 'react';
import './list.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CgCloseO } from 'react-icons/cg';
import { Dispatch } from 'redux';
import { delList, renameList } from '../../../../store/modules/board/actions';
import CardCreator from '../CardCreator/CardCreator';
import { comparePositionCard, isStringValid, notValidString } from '../../../../common/commonFunctions';
import IList from '../../../../common/interfaces/IList';
import { Mistake } from '../../../../common/Mistake/Mistake';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { addEmptySlot, dropHandler, removeDraggedSlot } from '../Card/dragNdrop';
import CardSlot from '../Slot/Slot';
import { BoardState } from '../../../../common/interfaces/BoardInterfaces';
import { ICard } from '../../../../common/interfaces/ICard.t';

export function renameListOrError(dispatch: Dispatch, title: string, listId: string, boardId: string): void {
  if (isStringValid(title)) renameList(dispatch, title, listId, boardId);
}
const mapStateToProps = (state: BoardState): { lists: IList[]; dragCard: ICard } => ({
  lists: state.board.board.lists,
  dragCard: state.board.draggedCard,
});

export default function List(props: { id: number }): React.ReactElement {
  const { id } = props;
  const { lists, dragCard } = useSelector(mapStateToProps);
  const { title, cards } = lists.filter((list) => list.id === id)[0];
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [listTitle, setTitle] = useState(title);
  const [listCards, setCards] = useState(cards);
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
    <div
      className="list"
      id={`list_${id}`}
      onDrop={(): void => {
        setCards(dropHandler(dragCard, id, boardId, lists, dispatch).cards);
      }}
      onDragEnter={(e): void => {
        if (e.relatedTarget) {
          if (e.currentTarget.contains(e.relatedTarget as Node)) {
            return;
          }
        }
        const result = addEmptySlot(listCards, id);
        setCards(result);
        // eslint-disable-next-line no-console
        console.log('dich');
      }}
      onDragLeave={(e): void => {
        if (e.relatedTarget) {
          if (e.currentTarget.contains(e.relatedTarget as Node)) {
            return;
          }
        }
        const result = removeDraggedSlot(listCards, dragCard.id);
        setCards(result);
      }}
    >
      <div
        className="delete_button"
        onClick={(): Promise<void> => delList(dispatch, boardId || '', id.toString(), lists)}
      >
        <CgCloseO color="white" size={100} />
      </div>
      <h2
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
      {listCards.sort(comparePositionCard).map((key) => (
        <CardSlot key={key.id} id={key.id} card={key} />
      ))}
      <CardCreator listId={id.toString()} lastCardPos={cards.length} />
    </div>
  );
}
