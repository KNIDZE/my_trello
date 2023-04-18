import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import api from '../../../../../api/request';
import { delCard, getBoard } from '../../../../../store/modules/board/actions';
import IList from '../../../../../common/interfaces/IList';

export async function returnOnBoard(boardId: string, navigate: NavigateFunction): Promise<void> {
  await navigate(`/board/${boardId}`);
}
export async function saveDescription(
  cardId: number,
  title: string,
  description: string,
  boardId: string | undefined,
  list_id: string | undefined,
  dispatch: Dispatch
): Promise<void> {
  if (!boardId) return;
  try {
    await api.put(`/board/${boardId}/card/${cardId}`, {
      title,
      description,
      list_id,
    });
    await getBoard(dispatch, boardId);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export function copyText(): void {
  const area = document.getElementById('description');
  navigator.clipboard.writeText(area?.innerHTML || '');
}

export function deleteCard(dispatch: Dispatch, boardId: string, cardId: number, lists: IList[], listId: number): void {
  const newListsValue = lists.map((list) => {
    if (list.id === listId) {
      return {
        id: list.id,
        title: list.title,
        cards: list.cards.filter((card) => card.id !== cardId),
      };
    }
    return list;
  });
  delCard(dispatch, boardId, cardId, newListsValue);
}
