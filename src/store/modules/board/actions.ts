/* eslint-disable */
import api from '../../../api/request';
import config from '../../../common/constants/api';
import {Dispatch} from "redux";
import { isStringValid } from '../../../common/commonFunctions';
import { getBoards } from '../boards/actions';
import { createBoard, wrongBoard } from '../BoardsCreator/actions';

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

export function addBoardElements(dispatch: Dispatch): {createList: ()=>void} {
  return {
    createList: ()=>{
      dispatch({type: "CHANGE_ADD_BOARD"})
    }
  }
}
