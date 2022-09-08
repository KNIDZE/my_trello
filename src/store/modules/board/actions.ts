/* eslint-disable */
import api from '../../../common/constants/api';
import config from '../../../common/constants/api';
import {Dispatch} from "redux";

export const getBoard = () => async (dispatch: Dispatch) => {
  try {
    // @ts-ignore
    const { board } = await api.get('/board/');
    await dispatch({ type: 'UPDATE_BOARD', payload: board });
  } catch (e) {
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};
