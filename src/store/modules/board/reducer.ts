/* eslint-disable */


import { BoardActions } from '../../../common/constants/actionEnums';

const initialState = {
  board: {title: '', lists: [], id: undefined},
  slotPosition: 0.5,
  draggedCard: {id: 0, listId: 0, title: '', description: '', position: 0},
  isDragging: false,
};

export default function reducer(state = initialState, action: { type: string, payload?: any }) {
  switch (action.type) {
    case BoardActions.loadBoard:
      if (action.payload){
        return {
          ...state,
          board: action.payload,
        };
      }
      return {
        ...state,
      };
    case BoardActions.setCard:
      return {
        ...state, currentBoardId: action.payload
      }
    case BoardActions.clearBoard:
      return {
        ...state,
        board : {id: undefined, title: '', lists: []} ,
      };
    case BoardActions.addList:
      return {
        ...state,
        board: {title: state.board.title, id: state.board.id, lists: action.payload}
      };
    case BoardActions.setDragCard:
      return {
        ...state,
        draggedCard: action.payload
      }
    case BoardActions.setSlotPosition:
      return {
        ...state,
        slotPosition: action.payload
      }
    case BoardActions.changeLists:
      return {
        ...state,
        board: {
          title: state.board.title,
          id: state.board.id,
          lists: action.payload
        }
    }
    case BoardActions.setDragging:
      return {
        ...state, isDragging: action.payload
      }
    default: {
      return { ...state };
    }
  }
}
