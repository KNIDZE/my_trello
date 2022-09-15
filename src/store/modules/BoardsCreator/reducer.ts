import { NewBoardState } from './actions';
/* eslint-disable */
const initialState = { boardCreatorVisible: false, newBoardTitle: '', wrongBoardTitle: false };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/default-param-last
export default function reducer(state: NewBoardState = initialState, action: { type: string; payload?: any }) {
  switch (action.type) {
    case 'SHOW_HIDE_BOARD_CREATOR':
      return { ...state, boardCreatorVisible: !state.boardCreatorVisible };
    case 'SAVE_TITLE_INPUT':
      return {
        ...state,
        newBoardTitle : action.payload,
      };
    case 'CHECK_BOARD_TITLE':
      return {
        ...state,
      };
    case 'WRONG_BOARD_TITLE':
      return {
        ...state,
      };
    case 'CREATE_BOARD':
      // eslint-disable-next-line no-console
      return {
        ...state,
        boardCreatorVisible: false,
        newBoardTitle: ''
      };
    default: {
      return state;
    }
  }
}
