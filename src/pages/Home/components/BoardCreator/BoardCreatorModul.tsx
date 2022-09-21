import React from 'react';
import './boardCreatorModul.scss';
import { connect, ConnectedProps } from 'react-redux';
import { addBoard } from '../../../../store/modules/BoardsCreator/actions';

function BoardCreatorModule(props: CreatorProps): JSX.Element {
  const { checkBoardTitle, saveTitle, boardTitle } = props;
  return (
    <div className="board_creator">
      <h4>Введите название</h4>
      <div
        contentEditable="true"
        id="new_board_naming"
        onBlur={(event): void => saveTitle(event.currentTarget.textContent)}
      />
      {/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */}
      <button onClick={() => checkBoardTitle(boardTitle)} className="add_board_submit">
        Создать
      </button>
    </div>
  );
}
const mapStateToProps = (state: { boardCreator: { newBoardTitle: string } }): { boardTitle: string } => ({
  boardTitle: state.boardCreator.newBoardTitle,
});
const connector = connect(mapStateToProps, addBoard);
type CreatorProps = ConnectedProps<typeof connector>;
export default connector(BoardCreatorModule);
