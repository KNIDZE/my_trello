import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Board from './components/Board/Board';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getBoards } from '../../store/modules/boards/actions';
import './home.scss';
import { IBoard } from '../../common/interfaces/IBoard';

type PropsType = {
  boards: { boards: IBoard[] };
};
type StateType = {
  boards: { boards: IBoard[] };
};
function Home({ boards }: PropsType): React.ReactElement {
  const boardsList = boards.boards.map((key) => (
    <Link key={key.id} to="/board/:boardId">
      <Board title={key.title} id={key.id} />
    </Link>
  ));

  return (
    <section className="home">
      <div className="container">
        <h1 className="home_title">Мои доски</h1>
        {boardsList}
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: StateType) => ({
  boards: state.boards,
});
export default connect(mapStateToProps, { getBoards })(Home);
