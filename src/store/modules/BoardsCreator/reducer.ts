import { NewBoardState } from './actions';
/* eslint-disable */
const initialState = { boardCreatorVisible: false, newBoardTitle: '', wrongBoardTitle: false };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/default-param-last
export default function reducer(state: NewBoardState = initialState, action: { type: string; payload?: any }) {
  switch (action.type) {
    case 'WRONG_BOARD_TITLE':
      return {
        ...state,
      };
    case 'CREATE_BOARD':
      return {
        ...state,
        boardCreatorVisible: false,
      };
    default: {
      return state;
    }
  }
}
