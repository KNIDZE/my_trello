import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import api from '../../../../../api/request';
import { getBoard } from '../../../../../store/modules/board/actions';
import { ICard } from '../../../../../common/interfaces/ICard.t';
import IList from '../../../../../common/interfaces/IList';

export function changeDescription(disabled: boolean): void {
  const input = document.getElementsByClassName('description_input')[0];
  if (disabled) {
    input.removeAttribute('disabled');
    input.classList.add('description_input_changed');
    input.setAttribute('placeholder', 'Some description...');
  } else {
    input.setAttribute('disabled', 'true');
    input.classList.remove('description_input_changed');
    input.removeAttribute('placeholder');
  }
}
export function returnOnBoard(boardId: string, navigate: NavigateFunction): void {
  navigate(`/board/${boardId}`);
}
export async function saveDescription(
  cardId: string | undefined,
  title: string | undefined,
  description: string,
  boardId: string | undefined,
  list_id: string | undefined,
  dispatch: Dispatch
): Promise<void> {
  try {
    await api.put(`/board/${boardId}/card/${cardId}`, {
      title,
      description,
      list_id,
    });
    await getBoard(dispatch, boardId || '');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
function findList(lists: IList[], listId: string): IList | undefined {
  // eslint-disable-next-line no-restricted-syntax
  for (const list of lists) {
    if (list.id === +listId) return list;
  }
  return undefined;
}
export async function transferCard(
  boardId: string,
  list_id: string,
  card: ICard | undefined,
  dispatch: Dispatch,
  lists: IList[]
): Promise<void> {
  const listMove = findList(lists, list_id);
  if (card !== undefined && listMove !== undefined) {
    try {
      await api.put(`/board/${boardId}/card/`, [
        {
          id: `${card.id}`,
          position: listMove.cards.length + 1,
          list_id,
        },
      ]);
      await getBoard(dispatch, boardId || '');
      const inListTitle = await document.getElementById('in_list');
      if (inListTitle !== null) inListTitle.innerHTML = listMove.title;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
}
export function copyText(): void {
  const area = document.getElementById('description');
  navigator.clipboard.writeText(area?.innerHTML || '');
}
