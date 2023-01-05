import { Dispatch } from 'redux';

export function errorDispatch(dispatch: Dispatch): void {
  dispatch({ type: 'WRONG_BOARD_TITLE', payload: true });
}

export interface NewBoardState {
  boardCreatorVisible: boolean;
  newBoardTitle: string;
}
