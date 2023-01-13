import { Dispatch } from 'redux';
import api from '../../../api/request';
import { IBoard } from '../../../common/interfaces/IBoard';

interface ApiResponse {
  boards: IBoard[];
}
export async function getBoards(dispatch: Dispatch): Promise<void> {
  try {
    const { boards }: ApiResponse = await api.get('/board');
    await dispatch({ type: 'UPDATE_BOARDS', payload: boards });
    dispatch({ type: 'CLEAR_BOARD' });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}
export async function delBoard(dispatch: Dispatch, board_id: number, boards: IBoard[]): Promise<void> {
  try {
    const newBoards = boards.filter((el) => el.id !== board_id);
    dispatch({ type: 'DELETE_BOARD', payload: newBoards });
    await api.delete(`/board/${board_id}`);
    await getBoards(dispatch);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
}
export function addBoard(dispatch: Dispatch, boards: IBoard[]): void {
  dispatch({ type: 'ADD_BOARD', payload: boards });
}
