/* eslint-disable */
import { Dispatch } from 'redux';
import api from '../../../api/request';

export const getBoards = () => async (dispatch: Dispatch) => {
  try {
    // @ts-ignore
    const { boards } = await api.get('/board');
    await dispatch({ type: 'UPDATE_BOARDS', payload: boards });
  } catch (e) {
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};
