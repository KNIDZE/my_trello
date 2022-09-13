/* eslint-disable */

let initialState = {boardCreatorVisible: false,
                    newBoardTitle: ""};
export default function reducer(state = initialState, action: {type: string, payload?: any}) {
  switch (action.type) {
    case 'ADD_BOARD':
      return {...state,
        boardCreatorVisible: !state.boardCreatorVisible}
    case 'CHECK_TITLE_INPUT': {
      if (action.payload.match(/^[\p{Alpha}\p{M}\p{Nd}\p{Pc}]$/gu)) {
        return {
          ...state,
          newBoardTitle: action.payload
        }
      } else
        return state;
    }
    default: {
      return state;


    }
  }
}
