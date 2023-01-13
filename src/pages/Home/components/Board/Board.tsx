import React from 'react';
import './board.scss';
import { useDispatch } from 'react-redux';
import { CgCloseO } from 'react-icons/cg';
import { delBoard } from '../../../../store/modules/boards/actions';
import { IBoard } from '../../../../common/interfaces/IBoard';

export default function Board(props: { title: string; id: number; boards: IBoard[] }): React.ReactElement {
  const dispatch = useDispatch();
  const { title, id, boards } = props;
  return (
    <div className="board">
      <h3>{title}</h3>
      <div
        className="delete_button"
        onClick={(e): void => {
          // prevent link to deleted board
          e.preventDefault();
          delBoard(dispatch, id, boards);
        }}
      >
        <CgCloseO color="white" size={30} />
      </div>
    </div>
  );
}
