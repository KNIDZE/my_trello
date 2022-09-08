import React from 'react';
import './boardCreatorModul.scss';

export default function BoardCreatorModule(): JSX.Element {
  return (
    <div className="board_creator">
      <h4>Введите название</h4>
      <div contentEditable="true" id="new_board_naming" data-ph="Ещё одна доска..." />
      <button className="add_board_submit">Создать</button>
    </div>
  );
}
