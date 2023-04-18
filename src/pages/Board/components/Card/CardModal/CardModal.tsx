import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import './cardmodal.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CgCloseO } from 'react-icons/cg';
import { copyText, deleteCard, returnOnBoard, saveDescription } from './cardmodalfunc';
import { findListCard, isStringValid, notValidString } from '../../../../../common/commonFunctions';
import { getBoard, renameCard, updateLists } from '../../../../../store/modules/board/actions';
import { Mistake } from '../../../../../common/Mistake/Mistake';
import IList from '../../../../../common/interfaces/IList';
import Loading from '../../../../Home/components/Loading/Loading';
import ListSelector from './ListSelector/ListSelector';
import { transferCard } from '../dragNdrop';
import api from '../../../../../api/request';

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
  if (!cardId || !boardId) return null;
  const { card, list } = findListCard(lists, cardId);
  const dispatch = useDispatch();
  const [cardTitle, setTitle] = useState(card.title);
  const [mistake, setMistake] = useState({
    show: false,
    text: 'Empty',
    firstShow: true,
  });
  const setNewList = useCallback(
    async (listId: number) => {
      const amountCards = lists.find((eachList) => eachList.id === listId)?.cards.length;
      if (amountCards) {
        const newLists = transferCard(card, lists, listId, amountCards + 1);
        updateLists(newLists, dispatch);
        const cardsToUpdate = lists
          // used filter because object is possibly undefined. Want to do one line code.
          .filter((eachList) => eachList.id === listId)[0] // getting old list and concat with new one
          .cards.concat(lists.filter((eachList) => eachList.id === list.id)[0].cards)
          .map((oneCard) => ({ id: oneCard.id, position: oneCard.position, list_id: oneCard.listId }))
          .filter((eachCard) => eachCard.id !== -1);
        await api.put(`/board/${boardId}/card`, cardsToUpdate);
        await getBoard(dispatch, boardId);
      }
    },
    [boardId, card, lists]
  );
  const [participants, setParticipants] = useState<JSX.Element[]>([]);
  useEffect(() => {
    if (!isStringValid(cardTitle) && !mistake.show && !mistake.firstShow) {
      const mistakeText = notValidString(cardTitle);
      setMistake((prevState) => ({ ...prevState, show: true, text: mistakeText }));
    }
  }, [cardTitle, mistake]);
  // create participants one
  useEffect(() => {
    const participantsList = [];
    for (let i = 0; i < 3; i++) {
      participantsList.push(<div key={i} className="participant" />);
    }
    participantsList.push(<div key={-1} className="add_participant display_center" />);
    participantsList.push(
      <button key={-2} className="join_button display_center">
        join
      </button>
    );
    setParticipants(participantsList);
  }, []);

  if (!boardId || !card) {
    return <Loading />;
  }
  return (
    <div
      className="card_modal_area"
      onClick={(): void => {
        returnOnBoard(boardId, navigate);
      }}
    >
      <div className="card_modal" onClick={(e): void => e.stopPropagation()}>
        <div
          className="delete_button"
          onClick={(): void => {
            returnOnBoard(boardId, navigate);
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
              setMistake((prevState) => ({ ...prevState, firstShow: false }));
            else setMistake((prevState) => ({ ...prevState, show: false, firstShow: false }));
            setTitle(event.currentTarget.innerHTML);
          }}
          onBlur={(event): void => {
            if (event.currentTarget.textContent)
              renameCard(event.currentTarget.textContent, boardId, card?.id, list.id, dispatch);
          }}
        >
          {card.title}
        </h6>
        <Mistake text={mistake.text} show={mistake.show && !mistake.firstShow} />
        <p className="participants_label">Participants:</p>
        <div className="participants">{participants}</div>
        <p className="description_label">Description:</p>
        <textarea
          defaultValue={card.description}
          className="description_input"
          placeholder="Description will be here..."
          id="description"
          onBlur={(e): Promise<void> =>
            saveDescription(card.id, card.title, e.currentTarget.value, boardId, `${list.id}`, dispatch)
          }
        />
        <div className="actions">
          <p>Current list:</p>
          <ListSelector listTitle={list.title} lists={lists} setNewList={setNewList} />
          <button className="action" onClick={(): void => copyText()}>
            Copy
          </button>
          <button
            className="action delete_action_button"
            onClick={(): void => {
              deleteCard(dispatch, boardId, card.id, lists, list.id);
              returnOnBoard(boardId, navigate);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
