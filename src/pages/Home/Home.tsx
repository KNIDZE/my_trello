import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Board from './components/Board/Board';
import { getBoards } from '../../store/modules/boards/actions';
import './home.scss';
import { IBoard } from '../../common/interfaces/IBoard';
import BoardCreator from './components/BoardCreator/BoardCreator';
import { getBoard } from '../../store/modules/board/actions';
import Loading from './components/Loading/Loading';

type PropsType = {
  boards: IBoard[];
};
type StateType = {
  boards: { boards: IBoard[] };
};
function Home({ boards }: PropsType): React.ReactElement {
  let boardsList;
  const dispatch = useDispatch();
  if (boards) {
    boardsList = boards.map((key) => (
      <Link
        onClick={(): void => {
          getBoard()(dispatch, `${key.id}`);
        }}
        className="home_link"
        key={key.id}
        to={`/board/${key.id}`}
      >
        <Board title={key.title} id={key.id} />
      </Link>
    ));
    return (
      <section className="home" id="home_section">
        <h1 className="home_title">Мои доски</h1>
        <div className="container">
          {boardsList}
          <BoardCreator />
        </div>
      </section>
    );
  }
  return <Loading />;
}

const mapStateToProps = (state: StateType): PropsType => ({
  boards: state.boards.boards,
});
export default connect(mapStateToProps, getBoards)(Home);
//
