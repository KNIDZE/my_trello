import React from 'react';
import './boardCreatorModul.scss';
import { connect } from 'react-redux';
import { addBoard, AddBoard } from '../../../../store/modules/BoardsCreator/actions';

function BoardCreatorModule(props: AddBoard): JSX.Element {
  const { createBoard, checkSaveTitle } = props;
  return (
    <div className="board_creator">
      <h4>Введите название</h4>
      <div
        contentEditable="true"
        id="new_board_naming"
        data-ph="Ещё одна доска..."
        onInput={(event): void => checkSaveTitle(event.currentTarget.textContent)}
      />
      {/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */}
      <button onClick={createBoard} className="add_board_submit">
        Создать
      </button>
    </div>
  );
}
export default connect(null, addBoard)(BoardCreatorModule);
