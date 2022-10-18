import React, { ReactElement, useState } from 'react';
import './cardmodal.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { changeDescription, returnOnBoard } from './cardmodalfunc';

export function CardModal(): ReactElement {
  const navigate = useNavigate();
  const { boardId } = useParams();
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
    <div className="card_modal_area">
      <div className="card_modal">
        <div className="delete_button" onClick={(): void => returnOnBoard(boardId || '', navigate)} />
        <h6>Помыть кошку</h6>
        <p>
          In <span>Планы</span> list
        </p>
        <p className="participants_label">Participants:</p>
        <div className="participants">{participants}</div>
        <p className="description_label">Description:</p>
        <textarea placeholder="Some description..." disabled className="description_input" />
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
          <button className="action"> Copy </button>
          <button className="action"> Move </button>
          <button className="action delete_action_button"> Delete </button>
        </div>
      </div>
    </div>
  );
}
