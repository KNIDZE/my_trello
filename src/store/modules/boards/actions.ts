/* eslint-disable */
import { Dispatch } from 'redux';
import api from '../../../api/request';

export const getBoards = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    // @ts-ignore
    const {boards} = await api.get('/board');
    await dispatch({ type: 'UPDATE_BOARDS', payload: boards });
  } catch (e) {
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};
export const delBoard = () => async (dispatch: Dispatch, board_id:number): Promise<void> => {
  try {
    await api.delete(`/board/${board_id}`)
      .then((response)=>{
        getBoards()(dispatch)
      });
  } catch (e) {
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};
