import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import List from './components/List/List';
import { ICard } from '../../common/interfaces/ICard.t';
import './board.scss';
import { getBoard } from '../../store/modules/board/actions';

interface BoardState {
  board: { title: string; lists: Array<{ id: number; title: string; cards: ICard[] }> };
}

interface BoardProps {
  title: string;
  lists: Array<{ id: number; title: string; cards: ICard[] }>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Board(props: BoardProps, state: BoardState): JSX.Element {
  // eslint-disable-next-line no-console
  console.log(props);
  const { title, lists } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const boardId = useParams();
  // eslint-disable-next-line no-console
  console.log(boardId);

  const renderList = lists.map((key) => <List key={key.id} title={key.title} cards={key.cards} />);
  return (
    <section className="board_section">
      <div className="table_title_div">
        <Link className="link_home" to="/">
          <button className="home">Домой</button>
        </Link>
        <h1 className="table_title">{title}</h1>
      </div>
      <div className="container">
        {renderList}
        <div className="button_column">
          <button>Новый список</button>
        </div>
      </div>
    </section>
  );
}
const mapStateToProps = (state: BoardState): BoardProps => ({
  title: state.board.title,
  lists: state.board.lists,
});
export default connect(mapStateToProps, { getBoard })(Board);
