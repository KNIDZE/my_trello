import { Dispatch } from 'redux';
import api from '../../../api/request';
import { getBoards } from '../boards/actions';
import { isStringValid } from '../../../common/commonFunctions';

export interface AddBoard {
  checkBoardTitle: (title: string) => void;
}
function addErrorToTitle(error: string): void {
  const boardNaming = document.getElementById('new_board_naming');
  if (boardNaming) {
    boardNaming.innerHTML = error;
  }
}
export function wrongBoard(dispatch: Dispatch, title: string): void {
  if (title.length === 0) {
    addErrorToTitle('Must be title');
  }
  addErrorToTitle('The title can only contain letters, numbers, _, -');
  dispatch({ type: 'WRONG_BOARD_TITLE', payload: true });
}
export async function createBoard(dispatch: Dispatch, board_title: string): Promise<void> {
  // eslint-disable-next-line no-console
  console.log(board_title);
  api
    .post('/board', {
      title: board_title,
      custom: {},
    })
    .catch((err) => {
      if (err.response.data.error === 'Board already exists') {
        addErrorToTitle('Board already exists');
      }
    });
}
export function addBoard(dispatch: Dispatch): AddBoard {
  return {
    checkBoardTitle: (title: string): void => {
      if (isStringValid(title)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createBoard(dispatch, title).then(() => getBoards()(dispatch));
      } else {
        wrongBoard(dispatch, title);
      }
    },
  };
}
export interface NewBoardState {
  boardCreatorVisible: boolean;
  newBoardTitle: string;
}
