import { Dispatch } from 'redux';
import { AxiosRequestConfig } from 'axios';
import api from '../../../api/request';

export const config: AxiosRequestConfig = {
  onUploadProgress(progressEvent) {
    const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
    // eslint-disable-next-line no-console
    console.log(`load:${percentCompleted}`);
  },
};

export const getBoards =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { boards } = await api.get('/board', config);
      // eslint-disable-next-line no-console
      console.log(boards);
      await dispatch({ type: 'UPDATE_BOARDS', payload: boards });
      dispatch({ type: 'CLEAR_BOARD' });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      dispatch({ type: 'ERROR_ACTION_TYPE' });
    }
  };
export const delBoard =
  () =>
  async (dispatch: Dispatch, board_id: number): Promise<void> => {
    try {
      await api.delete(`/board/${board_id}`).then(() => {
        getBoards()(dispatch);
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      dispatch({ type: 'ERROR_ACTION_TYPE' });
    }
  };
