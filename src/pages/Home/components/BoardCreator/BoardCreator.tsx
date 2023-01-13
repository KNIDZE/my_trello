import React, { useState } from 'react';
import BoardCreatorModule from './BoardCreatorModal';
import { IBoard } from '../../../../common/interfaces/IBoard';

export default function BoardCreator(props: { boards: IBoard[] }): JSX.Element {
  const [boardCreatorVisible, changeCreatorsVisibility] = useState(false);
  const { boards } = props;
  return (
    <div className="board_creator_div">
      <div onClick={(): void => changeCreatorsVisibility(!boardCreatorVisible)} className="add_board board">
        <b>+ Add board</b>
      </div>
      {boardCreatorVisible && <BoardCreatorModule boards={boards} />}
    </div>
  );
}
