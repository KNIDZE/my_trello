/* eslint-disable */


const initialState = {
  showLabel: true,
  board: {title: '', lists: [], id: undefined},
  cardText: '',
  cardModal: {card: null, list: null},
};

export default function reducer(state = initialState, action: { type: string, payload?: any }) {
  switch (action.type) {
    case 'LOAD_BOARD':
      if (action.payload){
        return {
          ...state,
          board: action.payload,
        };
      }
      return {
        ...state,
      };
    case 'SET_CURRENT_CARD':
      return {
        ...state, currentBoardId: action.payload
      }
    case 'CLEAR_BOARD':
      return {
        ...state,
        board : {id: undefined, title: '', lists: []} ,
      };
    case 'ADD_LIST':
      return {
        ...state,
        board: {title: state.board.title, id: state.board.id, lists: action.payload}
      };
    case 'SAVE_LIST_TITLE':
      return {
        ...state,
        newListTitle: action.payload,
      };
    case 'SAVE_CARD_TEXT':
      return {
        ...state,
        cardText : action.payload,
      }
    case 'DELETE_LIST':
      return {
        ...state,
        board: {title: state.board.title, id: state.board.id, lists: action.payload}
      }
    default: {
      return { ...state };
    }
  }
}