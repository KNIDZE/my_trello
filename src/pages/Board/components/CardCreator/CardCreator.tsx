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
  listId: number,
  boardId: string,
  position: number,
  changeList: React.Dispatch<React.SetStateAction<ICard[]>>,
  cards: ICard[],
  dispatch: Dispatch
): Promise<boolean> {
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
    return true;
  }
  return false;
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

  async function handleClick(): Promise<void> {
    disableButton(true);
    const creationOk = await createCard(cardText, +listId, boardId || '', lastCardPos + 1, changeList, cards, dispatch);
    if (!creationOk) {
      const input = document.getElementsByClassName('create_card_textarea')[0] as HTMLInputElement;
      input.value = 'Wrong card title. Use only letters, numbers, _, -';
    } else {
      changeCreatorVisibility(false);
    }
    disableButton(false);
  }

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
        onChange={(e): void => {
          saveCardText(e.currentTarget.value || '');
        }}
      />
      <div className="button_panel">
        <button className="create_card_button" disabled={buttonDisabled} onClick={handleClick}>
          Create
        </button>
        <div className="delete_button" onClick={(): void => changeCreatorVisibility(false)} />
      </div>
    </div>
  );
}
