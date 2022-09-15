import React from 'react';
import './board.scss';
import { useDispatch } from 'react-redux';
import { delBoard } from '../../../../store/modules/boards/actions';

export default function Board(props: { title: string; id: number }): React.ReactElement {
  const dispatch = useDispatch();
  const { title, id } = props;
  return (
    <div className="board">
      <h3> {title} </h3>
      <div
        className="delete_button"
        onClick={(event): void => {
          event.stopPropagation();
          event.preventDefault();
          delBoard()(dispatch, id);
        }}
      />
    </div>
  );
}
