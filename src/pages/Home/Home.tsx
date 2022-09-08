import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Board from './components/Board/Board';
import { getBoards } from '../../store/modules/boards/actions';
import './home.scss';
import { IBoard } from '../../common/interfaces/IBoard';
import BoardCreator from './components/BoardCreator/BoardCreator';

type PropsType = {
  boards: IBoard[];
};
type StateType = {
  boards: { boards: IBoard[] };
};
function Home({ boards }: PropsType): React.ReactElement {
  const boardsList = boards.map((key) => (
    <Link className="home_link" key={key.id} to="/board/:boardId">
      <Board title={key.title} id={key.id} />
    </Link>
  ));
  return (
    <section className="home" id="home_section">
      <div className="container">
        <h1 className="home_title">Мои доски</h1>
        {boardsList}
        <BoardCreator />
      </div>
    </section>
  );
}

const mapStateToProps = (state: StateType): PropsType => ({
  boards: state.boards.boards,
});
export default connect(mapStateToProps, { getBoards })(Home);
