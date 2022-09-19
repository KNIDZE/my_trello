import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ICard } from '../../common/interfaces/ICard.t';
import './board.scss';
import List from './components/List/List';
import AddListButton from './components/addListButton/AddListButton';

interface BoardInterface {
  title: string;
  lists: Array<{ id: number; title: string; cards: ICard[] }>;
}
interface BoardState {
  board: { board: BoardInterface };
}

interface BoardProps {
  // eslint-disable-next-line react/no-unused-prop-types
  board: {
    title: string;
    lists: Array<{ id: number; title: string; cards: ICard[] }>;
  };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Board(props: BoardProps): JSX.Element {
  let title;
  let renderList;
  try {
    const { board } = props;
    title = board.title;
    renderList = board.lists.map((key) => <List key={key.id} title={key.title} cards={key.cards} id={key.id} />);
  } catch (e) {
    title = '';
    renderList = '';
  }
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
          <AddListButton />
        </div>
      </div>
    </section>
  );
}
const mapStateToProps = (state: BoardState): BoardProps => ({
  board: state.board.board,
});
export default connect(mapStateToProps)(Board);
