import { Dispatch } from 'redux';

export function hideShowCreator(dispatch: Dispatch): { changeCreatorsVisibility: () => void } {
  return {
    changeCreatorsVisibility: (): void => {
      dispatch({ type: 'ADD_BOARD' });
    },
  };
}
export interface AddBoard {
  createBoard: () => void;
  checkSaveTitle: (title: string | null) => void;
}
export function addBoard(dispatch: Dispatch): AddBoard {
  return {
    createBoard: (): void => {
      dispatch({ type: 'CREATE_BOARD' });
    },
    checkSaveTitle: (title: string | null): void => {
      // eslint-disable-next-line no-console
      dispatch({ type: 'CHECK_TITLE_INPUT', payload: title });
    },
  };
}
