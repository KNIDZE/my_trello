import React, { useState } from 'react';
import './addListButton.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { addNewList, getBoard } from '../../../../store/modules/board/actions';
import { isStringValid, notValidString } from '../../../../common/commonFunctions';

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
const mapStateToProps = (state: { board: ButtonState }): ButtonProps => ({
  showLabel: state.board.showLabel,
  newListTitle: state.board.newListTitle,
  pos: state.board.board.lists.length,
});

async function createList(dispatch: Dispatch, title: string, id: string, position: number): Promise<void> {
  if (isStringValid(title)) {
    await addNewList(title, id, position, dispatch);
    await getBoard(dispatch, id);
  } else {
    notValidString(title, 'add_list_form');
  }
}
export default function AddListButton(): React.ReactElement {
  const { pos } = useSelector(mapStateToProps);
  const id = useParams().boardId;
  const dispatch = useDispatch();
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
      <input
        id="add_list_form"
        onBlur={(event): void => saveListTitle(event.currentTarget.value)}
        placeholder="enter title"
      />
      <div className="button_panel" id="list_creation_panel">
        <button
          className="add_list_submit"
          onClick={(): Promise<void> => createList(dispatch, newListTitle, id || '', pos)}
        >
          Add
        </button>
        <div onClick={(): void => turnButton(true)} className="delete_button" />
      </div>
    </div>
  );
}
