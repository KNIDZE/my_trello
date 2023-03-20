import { Dispatch } from 'redux';
import api from '../../../api/request';
import IList from '../../../common/interfaces/IList';
import { isStringValid } from '../../../common/commonFunctions';
import { ICard } from '../../../common/interfaces/ICard.t';

interface Board {
  title: string;
  lists: IList[];
}

export function clearBoardState(dispatch: Dispatch): void {
  dispatch({ type: 'CLEAR_BOARD' });
}
export async function getBoard(dispatch: Dispatch, id: string): Promise<void> {
  try {
    const board: Board = await api.get(`/board/${id}`);
    // await api.put(`/board/${id}/list`, changeListsPosition(board));
    // board = await api.get(`/board/${id}`);
    await dispatch({ type: 'LOAD_BOARD', payload: board });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}

export async function addNewList(
  title: string,
  id: string,
  position: number,
  lists: IList[],
  dispatch: Dispatch
): Promise<void> {
  try {
    lists.push({ id: +id, title, cards: [] });
    dispatch({ type: 'ADD_LIST', payload: lists });
    await api.post(`board/${id}/list`, {
      title,
      position,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export async function delList(dispatch: Dispatch, boardId: string, listId: string, lists: IList[]): Promise<void> {
  try {
    const newLists = lists.filter((list) => list.id === +listId);
    dispatch({ type: 'CHANGE_LISTS', payload: newLists });
    await api.delete(`/board/${boardId}/list/${listId}`).then(() => getBoard(dispatch, boardId));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}

export async function renameList(dispatch: Dispatch, title: string, listId: string, boardId: string): Promise<void> {
  try {
    await api.put(`/board/${boardId}/list/${listId}`, {
      title,
    });
    await getBoard(dispatch, boardId);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export function getCurrentBoard(dispatch: Dispatch, boardId: string): void {
  dispatch({ type: 'SET_CURRENT_CARD', payload: boardId });
}

export async function delCard(dispatch: Dispatch, boardId: string, cardId: number, lists: IList[]): Promise<void> {
  try {
    dispatch({ type: 'CHANGE_LISTS', payload: lists });
    await api.delete(`/board/${boardId}/card/${cardId}`).then(() => {
      getBoard(dispatch, boardId);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}
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
  list_id: number,
  dispatch: Dispatch
): Promise<void> {
  if (isStringValid(text)) {
    await api.put(`/board/${boardId}/card/${cardId}`, {
      title: text.trim(),
      list_id,
    });
    await getBoard(dispatch, boardId);
  }
}

export function updateLists(lists: IList[], dispatch: Dispatch): void {
  dispatch({ type: 'UPDATE_LISTS', payload: lists });
}

export function setDragCard(card: ICard, dispatch: Dispatch): void {
  dispatch({ type: 'SET_DRAG_CARD', payload: card });
}
export function setSlotPosition(position: number, dispatch: Dispatch): void {
  dispatch({ type: 'SET_SLOT_POSITION', payload: position });
}
