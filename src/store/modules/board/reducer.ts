/* eslint-disable */


const initialState = {
  showLabel: true,
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
        board : {id: undefined, title: '', lists: undefined} ,
      };
    case 'CHANGE_ADD_BOARD':
      return {
        ...state,
        showLabel: !state.showLabel
      }
    default: {
      return { ...state };
    }
  }
}