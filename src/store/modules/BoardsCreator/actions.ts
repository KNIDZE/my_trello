import { Dispatch } from 'redux';
import api from '../../../api/request';
import { config, getBoards } from '../boards/actions';
import { isStringValid } from '../../../common/commonFunctions';

export interface AddBoard {
  checkBoardTitle: (title: string) => void;
}

export function wrongBoard(dispatch: Dispatch): void {
  // eslint-disable-next-line no-console
  console.log('Working');
  dispatch({ type: 'WRONG_BOARD_TITLE', payload: true });
}
export async function createBoard(dispatch: Dispatch, board_title: string): Promise<void> {
  // eslint-disable-next-line no-console
  console.log(board_title);
  await api.post(
    '/board',
    {
      title: board_title,
      custom: {},
    },
    config
  );
}
export function addBoard(dispatch: Dispatch): AddBoard {
  return {
    checkBoardTitle: (title: string): void => {
      if (isStringValid(title)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createBoard(dispatch, title).then(() => getBoards()(dispatch));
      } else {
        wrongBoard(dispatch);
      }
    },
  };
}
export interface NewBoardState {
  boardCreatorVisible: boolean;
  newBoardTitle: string;
}
