import React, { useState } from 'react';
import BoardCreatorModule from './BoardCreatorModul';

export default function BoardCreator(): JSX.Element {
  const [boardCreatorVisible, changeCreatorsVisibility] = useState(false);
  return (
    <div className="board_creator_div">
      <div onClick={(): void => changeCreatorsVisibility(!boardCreatorVisible)} className="add_board board">
        <b>+ Add board</b>
      </div>
      {boardCreatorVisible && <BoardCreatorModule />}
    </div>
  );
}
