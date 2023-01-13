import React, { useEffect, useState } from 'react';
import './boardCreatorModal.scss';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import { isStringValid, notValidString } from '../../../../common/commonFunctions';
import { addBoard, getBoards } from '../../../../store/modules/boards/actions';
import api from '../../../../api/request';
import { Mistake } from '../../../../common/Mistake/Mistake';
import { IBoard } from '../../../../common/interfaces/IBoard';

export async function createBoard(dispatch: Dispatch, board_title: string, boards: IBoard[]): Promise<string> {
  try {
    boards.push({ id: 0, title: board_title });
    addBoard(dispatch, boards);
    await api.post('/board', {
      title: board_title,
      custom: {},
    });

    return '';
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data.error === 'Board already exists') {
      return 'Board already exists';
    }
    return 'problems with title';
  }
}

export default function BoardCreatorModal(props: { boards: IBoard[] }): JSX.Element {
  const dispatch = useDispatch();
  const [boardTitle, setBoardTitle] = useState('');
  const { boards } = props;
  const [mistake, setMistake] = useState({
    show: false,
    text: 'Empty',
    firstShow: true,
  });
  const [buttonDisabled, disableButton] = useState(false);
  useEffect(() => {
    const boardTitles = boards.map((board) => board.title);
    const titleDuplication = boardTitles.includes(boardTitle);
    // !mistake.show for prevent looping
    if ((titleDuplication || !isStringValid(boardTitle)) && !mistake.show && !mistake.firstShow) {
      const titleProblem = notValidString(boardTitle, titleDuplication);
      setMistake({
        show: true,
        text: titleProblem,
        firstShow: false,
      });
    }
  });

  async function checkBoardTitle(title: string): Promise<string> {
    await disableButton(true);
    const boardTitles = boards.map((board) => board.title);
    const titleDuplication = boardTitles.includes(title);
    if (isStringValid(title) && !titleDuplication) {
      const promise = await createBoard(dispatch, title, boards);
      await getBoards(dispatch);
      return promise;
    }
    await disableButton(false);
    return '';
  }

  return (
    <div className="board_creator">
      <h4>Enter title</h4>
      <input
        contentEditable="true"
        id="new_board_naming"
        onChange={(event): void => {
          setMistake({
            text: mistake.text,
            show: false,
            firstShow: false,
          });
          setBoardTitle(event.currentTarget.value || '');
        }}
      />
      <Mistake text={mistake.text} show={mistake.show} />
      <button
        onClick={(): Promise<string> => checkBoardTitle(boardTitle)}
        className="add_board_submit"
        disabled={buttonDisabled}
      >
        Create
      </button>
    </div>
  );
}
