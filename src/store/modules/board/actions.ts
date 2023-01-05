import { Dispatch } from 'redux';
import api from '../../../api/request';
import { isStringValid, notValidString } from '../../../common/commonFunctions';

interface Board {
  title: string;
  lists: [{ id: number; position: number }];
}

function changeListsPosition(board: Board): { id: number; position: number }[] {
  const result = [];
  for (let i = 0; i < board.lists.length; i++) {
    const changeList = { id: board.lists[i].id, position: i + 1 };
    result.push(changeList);
  }
  return result;
}

export async function getBoard(dispatch: Dispatch, id: string): Promise<void> {
  try {
    let board: Board = await api.get(`/board/${id}`);
    await api.put(`/board/${id}/list`, changeListsPosition(board));
    board = await api.get(`/board/${id}`);
    await dispatch({ type: 'LOAD_BOARD', payload: board });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}

export async function addNewList(title: string, id: string, position: number, dispatch: Dispatch): Promise<void> {
  try {
    await api.post(`board/${id}/list`, {
      title,
      position,
    });
    await dispatch({ type: 'CHANGE_ADD_BOARD' });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export async function delList(dispatch: Dispatch, boardId: string, listId: string): Promise<void> {
  try {
    await api.delete(`/board/${boardId}/list/${listId}`).then(() => getBoard(dispatch, boardId));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}

export async function renameList(dispatch: Dispatch, title: string, listId: string, boardId: string): Promise<void> {
  if (isStringValid(title)) {
    try {
      await api.put(`/board/${boardId}/list/${listId}`, {
        title,
      });
      getBoard(dispatch, boardId);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      dispatch({ type: 'ERROR_ACTION_TYPE' });
    }
  } else {
    notValidString(title, `list_title_${listId}`);
  }
}

export function getCurrentBoard(dispatch: Dispatch, boardId: string): void {
  dispatch({ type: 'SET_CURRENT_CARD', payload: boardId });
}

export async function delCard(dispatch: Dispatch, boardId: string, cardId: string): Promise<void> {
  try {
    await api.delete(`/board/${boardId}/card/${cardId}`).then(() => {
      getBoard(dispatch, boardId);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function updateCards(boardId: string, cards: HTMLCollection | undefined, listId: string | undefined): void {
  try {
    const objectList = [];
    if (cards !== undefined) {
      for (let i = 2; i < cards.length - 1; i++) {
        objectList.push({ id: cards[i].id.slice(9), position: i - 1, list_id: listId?.slice(5) });
      }
      api.put(`/board/${boardId}/card`, objectList);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
export async function renameCard(
  text: string,
  boardId: string,
  cardId: number,
  list_id: string,
  dispatch: Dispatch
): Promise<void> {
  // eslint-disable-next-line no-console
  if (text.search(/^[A-zА-я\d\s\n\t,._-]+$/gu) !== -1) {
    await api.put(`/board/${boardId}/card/${cardId}`, {
      title: text.trim(),
      list_id,
    });
    await getBoard(dispatch, boardId);
  } else {
    notValidString(text, 'card_title');
  }
}
