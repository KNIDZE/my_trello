/* eslint-disable */
import api from '../../../api/request';
import config from '../../../common/constants/api';
import {Dispatch} from "redux";

export const getBoard = () => async (dispatch: Dispatch, id:number) => {
  try {
    // @ts-ignore
    const  board  = await api.get(`/board/${id}`);
    await dispatch({ type: 'LOAD_BOARD', payload: board });
  } catch (e) {
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};
/*
export function addBoardElements(dispatch: Dispatch): AddBoard {
  return {
    checkBoardTitle: (title: string): void => {
      if (isStringValid(title)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createList(dispatch, title).then(() => {
          getBoards()(dispatch);
        });
      } else {
        wrongBoard(dispatch);
      }
    },
    saveTitle: (title: string | null): void => {
      // eslint-disable-next-line no-console
      console.log(title);
      dispatch({ type: 'SAVE_TITLE_INPUT', payload: title });
    },
  };
}*/
