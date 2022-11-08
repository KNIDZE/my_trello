import React, { useState } from 'react';
import './boardCreatorModul.scss';
import { connect } from 'react-redux';
import { AddBoard, addBoard } from '../../../../store/modules/BoardsCreator/actions';

function BoardCreatorModule(props: AddBoard): JSX.Element {
  const { checkBoardTitle } = props;
  const [boardTitle, setBoardTitle] = useState('');
  return (
    <div className="board_creator">
      <h4>Enter title</h4>
      <div
        contentEditable="true"
        id="new_board_naming"
        onBlur={(event): void => setBoardTitle(event.currentTarget.textContent || '')}
      />
      {/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */}
      <button onClick={() => checkBoardTitle(boardTitle)} className="add_board_submit">
        Create
      </button>
    </div>
  );
}

export default connect(null, addBoard)(BoardCreatorModule);
