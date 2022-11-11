import React, { ReactElement, useState } from 'react';
import './cardmodal.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeDescription, closeOnEscape, copyText, returnOnBoard, saveDescription } from './cardmodalfunc';
import IList from '../../../../../common/interfaces/IList';
import { findListCard } from '../../../../../common/commonFunctions';
import { delCard, renameCard } from '../../../../../store/modules/board/actions';

export function CardModal(props: { lists: IList[] }): ReactElement {
  const navigate = useNavigate();
  const { boardId, cardId } = useParams();
  const dispatch = useDispatch();
  const participants = [];
  const { lists } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { card, list } = findListCard(lists, cardId || '');
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
      onClick={(): void => returnOnBoard(boardId || '', navigate)}
      onKeyUp={(e): void => closeOnEscape(e.key, boardId || '', navigate)}
    >
      <div className="card_modal" onClick={(e): void => e.stopPropagation()}>
        <div className="delete_button" onClick={(): void => returnOnBoard(boardId || '', navigate)} />
        <h6
          contentEditable="true"
          suppressContentEditableWarning
          data-ph="One more card..."
          onBlur={(event): void =>
            renameCard(event.currentTarget.textContent || '', boardId || '', card?.id || 0, list.id, dispatch)
          }
        >
          {card?.title}
        </h6>
        <p>
          In <span>{list.title}</span> list
        </p>
        <p className="participants_label">Participants:</p>
        <div className="participants">{participants}</div>
        <p className="description_label">Description:</p>
        <textarea
          placeholder="Some description..."
          defaultValue={card?.description}
          disabled
          className="description_input"
          id="description"
          onBlur={(e): void =>
            saveDescription(cardId, card?.title, e.currentTarget.value, boardId, `${list.id}`, dispatch)
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
          <button className="action" onClick={(): void => copyText()}>
            Copy
          </button>
          <button className="action"> Move </button>
          <button
            className="action delete_action_button"
            onClick={(): void => {
              delCard(dispatch, boardId || '', cardId || '');
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
