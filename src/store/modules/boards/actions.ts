import { Dispatch } from 'redux';
import api from '../../../api/request';
import { IBoard } from '../../../common/interfaces/IBoard';
import { BoardActions, HomeActions } from '../../../common/constants/actionEnums';

interface ApiResponse {
  boards: IBoard[];
}
export async function getBoards(dispatch: Dispatch): Promise<void> {
  try {
    const { boards }: ApiResponse = await api.get('/board');
    dispatch({ type: HomeActions.updateBoards, payload: boards });
    dispatch({ type: BoardActions.clearBoard });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
export async function delBoard(dispatch: Dispatch, board_id: number, boards: IBoard[]): Promise<void> {
  try {
    const newBoards = boards.filter((el) => el.id !== board_id);
    dispatch({ type: HomeActions.updateBoards, payload: newBoards });
    await api.delete(`/board/${board_id}`);
    await getBoards(dispatch);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
export function addBoard(dispatch: Dispatch, boards: IBoard[]): void {
  dispatch({ type: HomeActions.updateBoards, payload: boards });
}
