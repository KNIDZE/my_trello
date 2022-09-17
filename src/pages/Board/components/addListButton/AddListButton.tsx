import React from 'react';
import './addListButton.scss';
import { connect } from 'react-redux';

function AddListButton(props: { showLabel: boolean }): React.ReactElement {
  const { showLabel } = props;
  if (showLabel) {
    return (
      <div className="add_list">
        <p>Новый список</p>
      </div>
    );
  }
  return <div className="add_list">Добавляю</div>;
}
const mapStateToProps = (state: {board:{showLabel: boolean}}) => ({
  board: state.board,
});
export default connect()(AddListButton);
