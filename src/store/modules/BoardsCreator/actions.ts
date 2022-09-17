import { Dispatch } from 'redux';
import api from '../../../api/request';
import { getBoards } from '../boards/actions';
import { isStringValid } from '../../../common/commonFunctions';

export function hideShowCreator(dispatch: Dispatch): { changeCreatorsVisibility: () => void } {
  return {
    changeCreatorsVisibility: (): void => {
      dispatch({ type: 'SHOW_HIDE_BOARD_CREATOR' });
    },
  };
}
export interface AddBoard {
  checkBoardTitle: (title: string) => void;
  saveTitle: (title: string | null) => void;
}

export function wrongBoard(dispatch: Dispatch): void {
  // eslint-disable-next-line no-console
  console.log('Working');
  dispatch({ type: 'WRONG_BOARD_TITLE', payload: true });
}
export async function createBoard(dispatch: Dispatch, board_title: string): Promise<object> {
  const postResult = await api.post('/board', {
    title: board_title,
    custom: {},
  });
  dispatch({ type: 'CREATE_BOARD' });
  return postResult;
}
export function addBoard(dispatch: Dispatch): AddBoard {
  return {
    checkBoardTitle: (title: string): void => {
      if (isStringValid(title)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createBoard(dispatch, title).then((r) => {
          getBoards()(dispatch);
        });
      } else {
        wrongBoard(dispatch);
      }
    },
    saveTitle: (title: string | null): void => {
      // eslint-disable-next-line no-console
      console.log(title);
      dispatch({ type: 'SAVE_TITLE_INPUT', payload: title });
    },
  };
}
export interface NewBoardState {
  boardCreatorVisible: boolean;
  newBoardTitle: string;
}
