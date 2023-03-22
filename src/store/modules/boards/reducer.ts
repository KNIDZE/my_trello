/* eslint-disable */
import { HomeActions } from '../../../common/constants/actionEnums';

const initialState = {
};
export default function reducer(state = initialState, action: {type: string, payload?: any}) {
  switch (action.type) {
    case HomeActions.updateBoards:
      return {
        ...state,
        boards: action.payload
      }
    default: {
      return {...state, ...action.payload};
    }
  }
}
