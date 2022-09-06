/* eslint-disable */
import { IBoard } from '../../../common/interfaces/IBoard';

const initialState = {
  boards: [{id:1, title: "firstBoard"},
    {id:2, title: "secondBoard"},
    {id:3, title: "thirdBoard"},
    {id:4, title: "fourthBoard"}],

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
