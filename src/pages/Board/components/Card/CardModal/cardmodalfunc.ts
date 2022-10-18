import { NavigateFunction } from 'react-router-dom';

export function changeDescription(disabled: boolean): void {
  const input = document.getElementsByClassName('description_input')[0];
  if (disabled) {
    input.removeAttribute('disabled');
    input.classList.add('description_input_changed');
  } else {
    input.setAttribute('disabled', 'true');
    input.classList.remove('description_input_changed');
  }
}
export function returnOnBoard(boardId: string, navigate: NavigateFunction): void {
  navigate(`/board/${boardId}`);
}
