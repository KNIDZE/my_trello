import React from 'react';
import './addListButton.scss';
import { connect, ConnectedProps } from 'react-redux';
import { addBoardElements } from '../../../../store/modules/board/actions';

interface ButtonProps {
  showLabel: boolean;
}
function AddListButton(props: CreatorProps): React.ReactElement {
  const { showLabel, createList } = props;
  if (showLabel) {
    return (
      <div onClick={createList} className="add_list_label">
        <p>Новый список</p>
      </div>
    );
  }
  return (
    <div className="add_list_form">
      <input placeholder="Введите название" />
      <div className="button_panel">
        <button className="add_list_submit">Добавить</button>
        <div onClick={createList} className="delete_button" />
      </div>
    </div>
  );
}
const mapStateToProps = (state: { board: { showLabel: boolean } }): ButtonProps => ({
  showLabel: state.board.showLabel,
});
const connector = connect(mapStateToProps, addBoardElements);
type CreatorProps = ConnectedProps<typeof connector>;
export default connector(AddListButton);
