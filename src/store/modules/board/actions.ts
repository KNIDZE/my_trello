import { Dispatch } from 'redux';
import api from '../../../api/request';
import { isStringValid } from '../../../common/commonFunctions';

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
interface BoardElements {
  createList: (title: string, id: string, position: number) => void;
}

function creationError(): void {
  // eslint-disable-next-line no-alert
  alert("It's not valid string");
}

async function addNewList(title: string, id: string, position: number, dispatch: Dispatch): Promise<void> {
  try {
    await api.post(`board/${id}/list`, {
      title,
      position,
    });
    dispatch({ type: 'CHANGE_ADD_BOARD' });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export function addBoardElements(dispatch: Dispatch): BoardElements {
  return {
    createList: (title, id, position): void => {
      if (isStringValid(title)) {
        addNewList(title, id, position, dispatch).then(() => getBoard(dispatch, id));
      } else {
        creationError();
      }
    },
  };
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
    creationError();
  }
}

function renameRequest(title: string, boardId: string, dispatch: Dispatch): void {
  api
    .put(`/board/${boardId}`, {
      title,
      custom: {},
    })
    .then(() => getBoard(dispatch, boardId));
}

export function boardFunctions(dispatch: Dispatch): { renameBoard(title: string, boardId: string): void } {
  return {
    renameBoard: (title, boardId: string): void => {
      if (isStringValid(title)) {
        renameRequest(title, boardId, dispatch);
      } else {
        creationError();
      }
    },
  };
}
export function getCurrentBoard(dispatch: Dispatch, boardId: string): void {
  dispatch({ type: 'SET_CURRENT_CARD', payload: boardId });
}
export interface CardCreatorFunctions {
  createCard: (text: string, list_id: string, boardId: string, position: number) => void;
}
export function turnCardCreator(dispatch: Dispatch): CardCreatorFunctions {
  return {
    createCard: (text: string, list_id: string, boardId: string, position: number): void => {
      if (text.search(/^[A-zА-я\d\s\n\t,._-]+$/gu) !== -1) {
        // eslint-disable-next-line no-console
        console.log(text, list_id, boardId);
        api
          .post(`/board/${boardId}/card`, {
            title: text,
            list_id,
            position,
            description: ' ',
            custom: '',
          })
          // eslint-disable-next-line no-console
          .then(() => getBoard(dispatch, boardId));
      } else {
        // eslint-disable-next-line no-alert
        alert('Wrong Text!');
      }
    },
  };
}
export async function delCard(dispatch: Dispatch, boardId: string, cardId: number): Promise<void> {
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
export function updateCards(
  boardId: string,
  cards: HTMLCollection | undefined,
  listId: string | undefined,
  dispatch: Dispatch
): void {
  try {
    const objectList = [];
    if (cards !== undefined) {
      for (let i = 2; i < cards.length - 1; i++) {
        objectList.push({ id: cards[i].id.slice(9), position: i - 1, list_id: listId?.slice(5) });
      }
      // eslint-disable-next-line no-console
      api.put(`/board/${boardId}/card`, objectList).then((callback) => console.log(callback));
      dispatch({ type: 'LOAD_BOARD' });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
