import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Board from './components/Board/Board';
import { getBoards } from '../../store/modules/boards/actions';
import './home.scss';

type PropsType = {
  boards: [{ id: number; title: string }];
  getBoards: () => Promise<void>
};
// eslint-disable-next-line @typescript-eslint/ban-types
type StateType = {};

// eslint-disable-next-line react/prefer-stateless-function
class Home extends React.Component<PropsType, StateType> {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    await this.props.getBoards();
  }

  render(): ReactElement {
    /* const { boards } = this.props;
     const boardsList = boards.map((key) => (
      <Link key={key.id} to="/boards/:boardId">
        <Board title={key.title} id={key.id} />
      </Link>
    )); */
    const { boards } = this.props;
    return <div>{JSON.stringify(boards)}</div>;
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state) => ({
  ...state.boards,
});
export default connect(mapStateToProps, {})(Home);