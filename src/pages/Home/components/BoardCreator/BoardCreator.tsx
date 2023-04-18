import React from 'react';
import BoardCreatorModal from './BoardCreatorModal';
import { IBoard } from '../../../../common/interfaces/IBoard';
import { useVisibility } from '../../../../common/commonFunctions';

export default function BoardCreator(props: { boards: IBoard[] }): JSX.Element {
  const [isVisible, reverseVisibility] = useVisibility();
  const { boards } = props;
  return (
    <div className="board_creator_div">
      <div onClick={(): void => reverseVisibility()} className="add_board board">
        <b>+ Add board</b>
      </div>
      {isVisible && <BoardCreatorModal boards={boards} reverseVisibility={reverseVisibility} />}
    </div>
  );
}
