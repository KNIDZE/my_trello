import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Board from './components/Board/Board';
import { getBoards } from '../../store/modules/boards/actions';
import './home.scss';
import { IBoard } from '../../common/interfaces/IBoard';
import BoardCreator from './components/BoardCreator/BoardCreator';
import { getBoard } from '../../store/modules/board/actions';

type PropsType = {
  boards: IBoard[];
};
type StateType = {
  boards: { boards: IBoard[] };
};
function Home({ boards }: PropsType): React.ReactElement {
  let boardsList;
  const dispatch = useDispatch();
  try {
    boardsList = boards.map((key) => (
      <Link
        onClick={(): void => {
          getBoard()(dispatch, `${key.id}`).then();
        }}
        className="home_link"
        key={key.id}
        to={`/board/${key.id}`}
      >
        <Board title={key.title} id={key.id} />
      </Link>
    ));
  } catch (e) {
    boardsList = '';
  }
  // onClick={(): Promise<void> => getBoard()(useDispatch(), key.id)} 1663237216589
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

const mapStateToProps = (state: StateType): PropsType => ({
  boards: state.boards.boards,
});
export default connect(mapStateToProps, getBoards)(Home);
//
