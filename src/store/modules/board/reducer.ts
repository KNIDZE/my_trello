/* eslint-disable */


const initialState = {
  showLabel: true,
  board: {lists: []},
  cardText: '',
};

export default function reducer(state = initialState, action: { type: string, payload?: any }) {
  switch (action.type) {
    case 'LOAD_BOARD':
      return {
        ...state,
        board: action.payload,
      };
    case 'CLEAR_BOARD':
      return {
        ...state,
        board : {id: undefined, title: '', lists: []} ,
      };
    case 'CHANGE_ADD_BOARD':
      return {
        ...state,
        showLabel: !state.showLabel
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
    default: {
      return { ...state };
    }
  }
}