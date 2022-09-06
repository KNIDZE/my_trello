/* eslint-disable */
import { Dispatch } from 'redux';
import api from '../../../api/request';
import config from '../../../common/constants/api';

export const getBoards = () => async (dispatch: Dispatch) => {
  try {
    // @ts-ignore
    const { boards } = await api.get('/board');
    await dispatch({ type: 'UPDATE_BOARDS', payload: boards });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};
