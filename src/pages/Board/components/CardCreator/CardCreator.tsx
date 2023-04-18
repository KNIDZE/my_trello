import React, { useCallback, useEffect, useState } from 'react';
import './cardCreator.scss';
import { useParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { getBoard } from '../../../../store/modules/board/actions';
import api from '../../../../api/request';
import { ICard } from '../../../../common/interfaces/ICard.t';
import { useVisibility } from '../../../../common/commonFunctions';

async function createCard(
  text: string,
  listId: string,
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
interface CardCreatorProps {
  listId: string;
  lastCardPos: number;
  cards: ICard[];
  changeList: React.Dispatch<React.SetStateAction<ICard[]>>;
}
export default function CardCreator({ listId, lastCardPos, cards, changeList }: CardCreatorProps): React.ReactElement {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [isModalVisible, reverseVisibility] = useVisibility();
  const [cardText, setCardText] = useState('');
  const [buttonDisabled, setButtonDisabling] = useState(false);
  useEffect(() => {
    setCardText('');
  }, [isModalVisible]);
  const handleClick = useCallback(async (): Promise<void> => {
    if (!boardId) return;
    setButtonDisabling(true);
    const creationOk = await createCard(cardText, listId, boardId, lastCardPos + 1, changeList, cards, dispatch);
    if (!creationOk) {
      setCardText('Wrong card title. Use only letters, numbers, _, -');
    } else {
      reverseVisibility();
    }
    setButtonDisabling(false);
  }, [cardText]);

  if (!isModalVisible) {
    return (
      <button className="add_card" onClick={(): void => reverseVisibility()}>
        <AiOutlinePlus />
      </button>
    );
  }
  return (
    <div className="card_creator">
      <textarea
        className="create_card_textarea"
        onChange={(e): void => {
          if (e.currentTarget.value) setCardText(e.currentTarget.value);
        }}
        value={cardText}
      />
      <div className="button_panel">
        <button className="create_card_button" disabled={buttonDisabled} onClick={handleClick}>
          Create
        </button>
        <div className="delete_button" onClick={(): void => reverseVisibility()} />
      </div>
    </div>
  );
}
