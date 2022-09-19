import React from 'react';
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
  const { showLabel, turnListButton, saveListTitle, createList, newListTitle, pos } = props;
  const id = useParams().boardId;
  if (showLabel) {
    return (
      <div onClick={turnListButton} className="add_list_label">
        <p>Новый список</p>
      </div>
    );
  }
  return (
    <div className="add_list_form">
      <input onBlur={(event): void => saveListTitle(event.currentTarget.value)} placeholder="Введите название" />
      <div className="button_panel">
        <button className="add_list_submit" onClick={(): void => createList(newListTitle, id || '', pos)}>
          Добавить
        </button>
        <div onClick={turnListButton} className="delete_button" />
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
