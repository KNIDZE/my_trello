/* eslint-disable */
import { IBoard } from '../../../common/interfaces/IBoard'; // не забудьте описать этот интерфейс :)

const initialState = {
  boards: [] as IBoard[],
};
export default function reducer(state = initialState, action: {type: string, payload?: any}) {

  switch (action.type) {
    case 'UPDATE_BOARDS':
      return {
        ...state,
        boards: action.payload
      }
    default: {
      return {...state, ...action.payload};
    }
  }
}
