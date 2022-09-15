/* eslint-disable */
import api from '../../../api/request';
import config from '../../../common/constants/api';
import {Dispatch} from "redux";

export const getBoard = () => async (dispatch: Dispatch, id:number) => {
  try {
    // @ts-ignore
    const  board  = await api.get(`/board/${id}`);
    await dispatch({ type: 'CLEAR_BOARD' });
    await dispatch({ type: 'LOAD_BOARD', payload: board });
  } catch (e) {
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};