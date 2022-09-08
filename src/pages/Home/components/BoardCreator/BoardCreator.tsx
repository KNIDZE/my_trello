import React, { useState } from 'react';
import BoardCreatorModule from './BoardCreatorModul';

export default function BoardCreator(): JSX.Element {
  const [creationVisible, setCreationVisible] = useState(false);
  if (creationVisible) {
    return (
      <div>
        <div onClick={(): void => setCreationVisible(!creationVisible)} className="add_board board">
          <b>+ Добавить таблицу</b>
        </div>
        <BoardCreatorModule />
      </div>
    );
  }
  return (
    <div onClick={(): void => setCreationVisible(!creationVisible)} className="add_board board">
      <b>+ Добавить таблицу</b>
    </div>
  );
}
