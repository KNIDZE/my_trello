import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { ICard } from '../../common/interfaces/ICard.t';
import './board.scss';
import List from './components/List/List';
import AddListButton from './components/addListButton/AddListButton';
import { boardFunctions } from '../../store/modules/board/actions';
import Loading from '../Home/components/Loading/Loading';

interface BoardInterface {
  title: string;
  lists: Array<{ id: number; title: string; cards: ICard[] }>;
}
interface BoardState {
  board: { board: BoardInterface };
}

interface BoardProps {
  board: {
    title: string;
    lists: Array<{ id: number; title: string; cards: ICard[] }>;
  };
}
function Board(props: AllBoardProps): JSX.Element {
  let title;
  let renderList;
  const { board, renameBoard } = props;
  const { boardId } = useParams();
  if (typeof board.title !== undefined && board.title !== '') {
    title = board.title;
    renderList = board.lists.map((key) => <List key={key.id} title={key.title} cards={key.cards} id={key.id} />);
    return (
      // eslint-disable-next-line no-alert
      <section className="board_section" onDrop={(): void => alert('DIIICH')}>
        <div className="table_title_div">
          <Link className="link_home" to="/">
            <button className="home">Домой</button>
          </Link>
          <h1
            className="table_title"
            contentEditable="true"
            suppressContentEditableWarning
            data-ph="Ещё одна доска..."
            onBlur={(event): void => renameBoard(event.currentTarget.textContent || '', boardId || '')}
          >
            {title}
          </h1>
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
  return <Loading />;
}
const mapStateToProps = (state: BoardState): BoardProps => ({
  board: state.board.board,
});
const connector = connect(mapStateToProps, boardFunctions);
type AllBoardProps = ConnectedProps<typeof connector>;
export default connector(Board);
