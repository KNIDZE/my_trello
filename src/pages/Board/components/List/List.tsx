import React, { useEffect, useState } from 'react';
import './list.scss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CgCloseO } from 'react-icons/cg';
import { Dispatch } from 'redux';
import { delList, renameList, setDraggingState } from '../../../../store/modules/board/actions';
import CardCreator from '../CardCreator/CardCreator';
import { comparePositionCard, isStringValid, notValidString } from '../../../../common/commonFunctions';
import IList from '../../../../common/interfaces/IList';
import { Mistake } from '../../../../common/Mistake/Mistake';
import { dropHandler, removeDraggedCard } from '../Card/dragNdrop';
import CardSlot from '../Slot/Slot';
import { ICard } from '../../../../common/interfaces/ICard.t';
import Card from '../Card/Card';

interface ListProps {
  lists: IList[];
  dragCard: ICard;
  slotPosition: number;
  id: number;
  isDragging: boolean;
}
export function renameListOrError(dispatch: Dispatch, title: string, listId: string, boardId: string): void {
  if (isStringValid(title)) renameList(dispatch, title, listId, boardId);
}

export default function List({ lists, dragCard, slotPosition, id, isDragging }: ListProps): React.ReactElement {
  const { title, cards } = lists.filter((list) => list.id === id)[0];
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [listTitle, setTitle] = useState(title);
  const [listCards, setCards] = useState(cards.slice(0));
  const [slotVisible, setSlotVisibility] = useState(false);
  const [mistake, setMistake] = useState({
    show: false,
    text: 'Empty',
    firstShow: true,
  });
  useEffect(() => {
    if (!isStringValid(listTitle) && !mistake.show && !mistake.firstShow) {
      const mistakeText = notValidString(listTitle);
      setMistake((prevState) => ({ ...prevState, show: true, text: mistakeText }));
    }
  }, [listTitle, mistake]);
  useEffect(() => setCards(cards), [cards]);
  useEffect(() => {
    if (listCards.filter((card) => card.id === -1).length === 0) {
      listCards.push({
        id: -1,
        position: slotPosition === -1 ? listCards.length : slotPosition,
        listId: id,
        title: '',
      });
    }
    // adding slot to list if it hasn't
    const slot = listCards.filter((card) => card.id === -1)[0];
    if (slot.position !== slotPosition) {
      setCards(listCards.filter((card) => card.id !== -1));
    }
  }, [listCards]);

  function sortMapCards(): JSX.Element[] {
    return listCards.sort(comparePositionCard).map((key) => {
      let result;
      if (key.id !== -1) {
        result = <Card key={key.id} card={key} listId={id} isDragging={isDragging} />;
      } else {
        result = <CardSlot key={key.id} visible={slotVisible} />;
      }
      return result;
    });
  }
  if (!boardId) return <div />;
  return (
    <div
      className="list"
      id={`list_${id}`}
      onDragLeave={(e): void => {
        if (e.relatedTarget) {
          if (e.currentTarget.contains(e.relatedTarget as Node)) {
            return;
          }
        }
        if (isDragging) {
          const result = removeDraggedCard(listCards, dragCard.id);
          if (slotVisible) setSlotVisibility(false);
          setCards(result);
        }
      }}
      onDragEnter={(): void => {
        if (isDragging) {
          if (!slotVisible) setSlotVisibility(true);
        }
      }}
      onDrop={(e): void => {
        if (isDragging) {
          e.stopPropagation();
          dropHandler(e, dragCard, id, boardId, lists, slotPosition, dispatch, setCards);
          setSlotVisibility(false);
          setDraggingState(false, dispatch);
        }
      }}
    >
      <div className="delete_button" onClick={(): Promise<void> => delList(dispatch, boardId, id.toString(), lists)}>
        <CgCloseO color="white" size={100} />
      </div>
      <h2
        contentEditable="true"
        suppressContentEditableWarning
        onInput={(event): void => {
          if (!isStringValid(event.currentTarget.innerHTML))
            setMistake((prevState) => ({ ...prevState, firstShow: false }));
          else setMistake((prevState) => ({ ...prevState, show: false, firstShow: false }));
          setTitle(event.currentTarget.innerHTML);
        }}
        onBlur={(event): void => {
          if (event.currentTarget.textContent)
            renameListOrError(dispatch, event.currentTarget.textContent, id.toString(), boardId);
        }}
      >
        {title}
      </h2>
      <Mistake text={mistake.text} show={mistake.show} />
      {sortMapCards()}
      <CardCreator listId={id.toString()} lastCardPos={cards.length - 1} cards={listCards} changeList={setCards} />
    </div>
  );
}
