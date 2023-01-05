import React, { useState } from 'react';
import './boardCreatorModal.scss';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import { isStringValid } from '../../../../common/commonFunctions';
import { getBoards } from '../../../../store/modules/boards/actions';
import api from '../../../../api/request';
import { errorDispatch } from '../../../../store/modules/BoardsCreator/actions';

function addErrorToTitle(error: string): void {
  const boardNaming = document.getElementById('new_board_naming');
  if (boardNaming) {
    boardNaming.innerHTML = error;
  }
}

export function wrongBoard(dispatch: Dispatch, title: string): void {
  if (title.length === 0) {
    addErrorToTitle('Must be title');
  }
  addErrorToTitle('The title can only contain letters, numbers, _, -');
  errorDispatch(dispatch);
}

export async function createBoard(dispatch: Dispatch, board_title: string): Promise<void> {
  try {
    await api.post('/board', {
      title: board_title,
      custom: {},
    });
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data.error === 'Board already exists') {
      addErrorToTitle('Board already exists');
    }
  }
}

async function checkBoardTitle(dispatch: Dispatch, title: string): Promise<void> {
  if (isStringValid(title)) {
    await createBoard(dispatch, title);
    await getBoards(dispatch);
  } else {
    wrongBoard(dispatch, title);
  }
}

export default function BoardCreatorModal(): JSX.Element {
  const dispatch = useDispatch();
  const [boardTitle, setBoardTitle] = useState('');
  return (
    <div className="board_creator">
      <h4>Enter title</h4>
      <div
        contentEditable="true"
        id="new_board_naming"
        onBlur={(event): void => setBoardTitle(event.currentTarget.textContent || '')}
      />
      <button onClick={(): Promise<void> => checkBoardTitle(dispatch, boardTitle)} className="add_board_submit">
        Create
      </button>
    </div>
  );
}
