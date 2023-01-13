import React, { useState } from 'react';
import './cardCreator.scss';
import { useParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { getBoard } from '../../../../store/modules/board/actions';
import api from '../../../../api/request';

async function createCard(
  text: string,
  list_id: string,
  boardId: string,
  position: number,
  dispatch: Dispatch
): Promise<void> {
  if (text.search(/^[A-zА-я\d\s\n\t,._-]+$/gu) !== -1) {
    await api.post(`/board/${boardId}/card`, {
      title: text,
      list_id,
      position,
      description: ' ',
      custom: '',
    });
    await getBoard(dispatch, boardId);
  } else {
    // eslint-disable-next-line no-console
    console.log('Wrong Text!');
  }
}

export default function CardCreator(props: { listId: string; lastCardPos: number }): React.ReactElement {
  const { listId, lastCardPos } = props;
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [showCreator, changeCreatorVisibility] = useState(false);
  const [cardText, saveCardText] = useState('');
  const [buttonDisabled, disableButton] = useState(false);
  if (!showCreator) {
    return (
      <button className="add_card" onClick={(): void => changeCreatorVisibility(true)}>
        <AiOutlinePlus />
      </button>
    );
  }
  return (
    <div className="card_creator">
      <textarea
        className="create_card_textarea"
        onBlur={(e): void => saveCardText(e.currentTarget.value || '')}
        contentEditable="true"
        suppressContentEditableWarning
      />
      <div className="button_panel">
        <button
          className="create_card_button"
          disabled={buttonDisabled}
          onClick={(): void => {
            disableButton(true);
            createCard(cardText, listId, boardId || '', lastCardPos + 1, dispatch);
            changeCreatorVisibility(false);
            disableButton(false);
          }}
        >
          Create
        </button>
        <div className="delete_button" onClick={(): void => changeCreatorVisibility(false)} />
      </div>
    </div>
  );
}
