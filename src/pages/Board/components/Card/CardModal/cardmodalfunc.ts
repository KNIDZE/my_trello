import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import api from '../../../../../api/request';
import { getBoard } from '../../../../../store/modules/board/actions';

export function changeDescription(disabled: boolean): void {
  const input = document.getElementsByClassName('description_input')[0];
  if (disabled) {
    input.removeAttribute('disabled');
    input.classList.add('description_input_changed');
    input.setAttribute('placeholder', 'Some description...');
  } else {
    input.setAttribute('disabled', 'true');
    input.classList.remove('description_input_changed');
    input.removeAttribute('placeholder');
  }
}
export function returnOnBoard(boardId: string, navigate: NavigateFunction): void {
  navigate(`/board/${boardId}`);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function closeOnEscape(event: string, boardId: string, navigate: NavigateFunction): void {
  // eslint-disable-next-line no-console
  console.log(event);
}
export function saveDescription(
  cardId: string | undefined,
  title: string | undefined,
  description: string,
  boardId: string | undefined,
  list_id: string | undefined,
  dispatch: Dispatch
): void {
  try {
    api
      .put(`/board/${boardId}/card/${cardId}`, {
        title,
        description,
        list_id,
      })
      .then((): Promise<void> => getBoard(dispatch, boardId || ''));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
export function copyText(): void {
  const area = document.getElementById('description');
  navigator.clipboard.writeText(area?.innerHTML || '');
}
