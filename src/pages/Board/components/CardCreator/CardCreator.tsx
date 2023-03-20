import React, { useState } from 'react';
import './cardCreator.scss';
import { useParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { getBoard } from '../../../../store/modules/board/actions';
import api from '../../../../api/request';
import { ICard } from '../../../../common/interfaces/ICard.t';

async function createCard(
  text: string,
  listId: string,
  boardId: string,
  position: number,
  changeList: React.Dispatch<React.SetStateAction<ICard[]>>,
  cards: ICard[],
  dispatch: Dispatch
): Promise<void> {
  if (text.search(/^[A-zА-я\d\s\n\t,._-]+$/gu) !== -1) {
    cards.push({ title: text, id: -20, position, listId: +listId });
    changeList(cards);
    await api.post(`/board/${boardId}/card`, {
      title: text,
      list_id: listId,
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

export default function CardCreator(props: {
  listId: string;
  lastCardPos: number;
  cards: ICard[];
  changeList: React.Dispatch<React.SetStateAction<ICard[]>>;
}): React.ReactElement {
  const { listId, lastCardPos, cards, changeList } = props;
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
            createCard(cardText, listId, boardId || '', lastCardPos + 1, changeList, cards, dispatch);
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
