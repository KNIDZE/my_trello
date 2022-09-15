import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import BoardCreatorModule from './BoardCreatorModul';
import { hideShowCreator } from '../../../../store/modules/BoardsCreator/actions';

interface StateProps {
  boardCreatorVisible: boolean;
}
function BoardCreator(props: CreatorProps): JSX.Element {
  const { boardCreatorVisible, changeCreatorsVisibility } = props;
  if (boardCreatorVisible) {
    return (
      <div>
        <div onClick={changeCreatorsVisibility} className="add_board board">
          <b>+ Добавить таблицу</b>
        </div>
        <BoardCreatorModule />
      </div>
    );
  }
  return (
    <div onClick={changeCreatorsVisibility} className="add_board board">
      <b>+ Добавить доску</b>
    </div>
  );
}

const mapStateToProps = (state: { boardCreator: { boardCreatorVisible: boolean } }): StateProps => ({
  boardCreatorVisible: state.boardCreator.boardCreatorVisible,
});

const connector = connect(mapStateToProps, hideShowCreator);
type CreatorProps = ConnectedProps<typeof connector>;

export default connector(BoardCreator);
