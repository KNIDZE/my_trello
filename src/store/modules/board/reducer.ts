/* eslint-disable */


const initialState = {
  board: {title: '', lists: [], id: undefined},
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
    case 'DELETE_LIST':
      return {
        ...state,
        board: {title: state.board.title, id: state.board.id, lists: action.payload}
      }
    case 'SET_DRAG_CARD':
      return {
        ...state,
        draggedCard: action.payload
      }
    case 'UPDATE_LISTS':
      return {
        ...state,
        board: {
          title: state.board.title,
          id: state.board.id,
          lists: action.payload
        }
    }
    default: {
      return { ...state };
    }
  }
}
