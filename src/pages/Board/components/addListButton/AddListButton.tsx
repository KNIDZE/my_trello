import React, { useState } from 'react';
import './addListButton.scss';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addBoardElements } from '../../../../store/modules/board/actions';

interface ButtonProps {
  showLabel: boolean;
  newListTitle: string;
  pos: number;
}
interface ButtonState {
  showLabel: boolean;
  newListTitle: string;
  board: { lists: [] };
}
function AddListButton(props: CreatorProps): React.ReactElement {
  const { createList, pos } = props;
  const id = useParams().boardId;
  const [newListTitle, saveListTitle] = useState('');
  const [showLabel, turnButton] = useState(true);
  if (showLabel) {
    return (
      <div onClick={(): void => turnButton(false)} className="add_list_label">
        <p>New list</p>
      </div>
    );
  }
  return (
    <div className="add_list_form">
      <input onBlur={(event): void => saveListTitle(event.currentTarget.value)} placeholder="enter title" />
      <div className="button_panel">
        <button className="add_list_submit" onClick={(): void => createList(newListTitle, id || '', pos)}>
          Add
        </button>
        <div onClick={(): void => turnButton(true)} className="delete_button" />
      </div>
    </div>
  );
}
const mapStateToProps = (state: { board: ButtonState }): ButtonProps => ({
  showLabel: state.board.showLabel,
  newListTitle: state.board.newListTitle,
  pos: state.board.board.lists.length,
});
const connector = connect(mapStateToProps, addBoardElements);
type CreatorProps = ConnectedProps<typeof connector>;
export default connector(AddListButton);
