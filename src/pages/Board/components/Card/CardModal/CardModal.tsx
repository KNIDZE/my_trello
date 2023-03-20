import React, { ReactElement, useState } from 'react';
import './cardmodal.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CgCloseO } from 'react-icons/cg';
import { changeDescription, copyText, deleteCard, returnOnBoard, saveDescription, transferCard } from './cardmodalfunc';
import { findListCard, isStringValid, notValidString } from '../../../../../common/commonFunctions';
import { renameCard } from '../../../../../store/modules/board/actions';
import { Mistake } from '../../../../../common/Mistake/Mistake';
import IList from '../../../../../common/interfaces/IList';

interface CardModalState {
  board: {
    board: {
      title: string;
      lists: IList[];
    };
  };
}

interface CardModalProps {
  lists: IList[];
}
const mapStateToProps = (state: CardModalState): CardModalProps => ({
  lists: state.board.board.lists,
});

export function CardModal(): ReactElement | null {
  const { lists } = useSelector(mapStateToProps);
  const navigate = useNavigate();
  const { boardId, cardId } = useParams();
  if (!cardId) return null;
  const cardModal = findListCard(lists, cardId);
  const { card, list } = cardModal;
  const dispatch = useDispatch();
  const [listToMove, transferList] = useState(list.id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cardTitle, setTitle] = useState(card?.title);
  const [mistake, setMistake] = useState({
    show: false,
    text: 'Empty',
    firstShow: true,
  });
  const listsToMove = lists.map((curList) => (
    <option key={curList.id} value={curList.id} className="option">
      {curList.title}
    </option>
  ));
  if (!isStringValid(cardTitle) && !mistake.show && !mistake.firstShow) {
    const mistakeText = notValidString(cardTitle);
    setMistake({
      show: true,
      text: mistakeText,
      firstShow: false,
    });
  }
  const participants = [];
  for (let i = 0; i < 3; i++) {
    participants.push(<div key={i} className="participant" />);
  }
  participants.push(<div key={-1} className="add_participant display_center" />);
  participants.push(
    <button key={-2} className="join_button display_center">
      join
    </button>
  );
  const [isChangeable, inverseChangeable] = useState(true);
  return (
    <div
      className="card_modal_area"
      onClick={(): void => {
        returnOnBoard(boardId || '', navigate);
      }}
    >
      <div className="card_modal" onClick={(e): void => e.stopPropagation()}>
        <div
          className="delete_button"
          onClick={(): void => {
            returnOnBoard(boardId || '', navigate);
          }}
        >
          <CgCloseO color="white" size={100} />
        </div>
        <h6
          id="card_title"
          contentEditable="true"
          suppressContentEditableWarning
          data-ph="One more card..."
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
          onBlur={(event): Promise<void> =>
            renameCard(event.currentTarget.textContent || '', boardId || '', card?.id || 0, list.id, dispatch)
          }
        >
          {card?.title}
        </h6>
        <Mistake text={mistake.text} show={mistake.show && !mistake.firstShow} />
        <p>
          In <span id="in_list">{list.title}</span> list
        </p>
        <p className="participants_label">Participants:</p>
        <div className="participants">{participants}</div>
        <p className="description_label">Description:</p>
        <textarea
          defaultValue={card?.description}
          disabled
          className="description_input"
          id="description"
          onBlur={(e): Promise<void> =>
            saveDescription(card.id, card.title, e.currentTarget.value, boardId, `${list.id}`, dispatch)
          }
        />
        <button
          className="change_description"
          onClick={(): void => {
            inverseChangeable(!isChangeable);
            changeDescription(isChangeable);
          }}
        >
          Change
        </button>
        <div className="actions">
          <select defaultValue={list.id} id="lists" onChange={(e): void => transferList(+e.currentTarget.value)}>
            {listsToMove}
          </select>
          <button
            className="action"
            onClick={(): Promise<void> => transferCard(boardId || '', listToMove, card, dispatch, lists)}
          >
            Move
          </button>
          <button className="action" onClick={(): void => copyText()}>
            Copy
          </button>
          <button
            className="action delete_action_button"
            onClick={(): void => {
              deleteCard(dispatch, boardId || '', card.id, lists, list.id);
              returnOnBoard(boardId || '', navigate);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
