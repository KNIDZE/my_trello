/* eslint-disable */


const initialState = {
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
    default: {
      return { ...state };
    }
  }
}