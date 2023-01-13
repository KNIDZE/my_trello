/* eslint-disable */
import { IBoard } from '../../../common/interfaces/IBoard';

const initialState = {
};
export default function reducer(state = initialState, action: {type: string, payload?: any}) {
  switch (action.type) {
    case 'UPDATE_BOARDS':
      return {
        ...state,
        boards: action.payload
      }
    case 'ADD_BOARD':
      return {
        ...state,
        boards: action.payload
      }
    case "DELETE_BOARD":
      return {
        ...state,
        boards: action.payload
      }
    default: {
      return {...state, ...action.payload};
    }
  }
}
