import React, { useState } from 'react';
import BoardCreatorModule from './BoardCreatorModul';

export default function BoardCreator(): JSX.Element {
  const [boardCreatorVisible, changeCreatorsVisibility] = useState(false);
  if (boardCreatorVisible) {
    return (
      <div>
        <div onClick={(): void => changeCreatorsVisibility(false)} className="add_board board">
          <b>+ Добавить таблицу</b>
        </div>
        <BoardCreatorModule />
      </div>
    );
  }
  return (
    <div onClick={(): void => changeCreatorsVisibility(true)} className="add_board board">
      <b>+ Добавить доску</b>
    </div>
  );
}
