import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Board from './components/Board/Board';
import './home.scss';
import { IBoard } from '../../common/interfaces/IBoard';
import BoardCreator from './components/BoardCreator/BoardCreator';
import { getCurrentBoard } from '../../store/modules/board/actions';
import Loading from './components/Loading/Loading';
import { LogOut } from '../../common/LogOut/LogOut';
import { getBoards } from '../../store/modules/boards/actions';

type PropsType = {
  boards: IBoard[];
};
type StateType = {
  boards: { boards: IBoard[] };
};

const mapStateToProps = (state: StateType): PropsType => ({
  boards: state.boards.boards,
});

export default function Home(): React.ReactElement {
  const dispatch = useDispatch();
  const { boards } = useSelector(mapStateToProps);
  if (!boards) {
    getBoards(dispatch);
    return <Loading />;
  }
  const boardsList = boards.map((key) => (
    <Link
      onClick={(): void => {
        getCurrentBoard(dispatch, `${key.id}`);
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
      <h1 className="home_title">My boards</h1>
      <div className="container">
        {boardsList}
        <BoardCreator />
      </div>
      <LogOut />
    </section>
  );
}
