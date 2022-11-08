import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import './board.scss';
import List from './components/List/List';
import AddListButton from './components/addListButton/AddListButton';
import { boardFunctions, getBoard } from '../../store/modules/board/actions';
import Loading from '../Home/components/Loading/Loading';
import { dropHandler } from './components/Card/dragNdrop';
import { CardModal } from './components/Card/CardModal/CardModal';
import IList from '../../common/interfaces/IList';
import { LogOut } from '../../common/LogOut/LogOut';

interface BoardInterface {
  title: string;
  lists: IList[];
}
interface BoardState {
  board: { board: BoardInterface };
}

interface BoardProps {
  board: {
    title: string;
    lists: IList[];
  };
}
function Board(props: AllBoardProps): JSX.Element {
  const { board, renameBoard } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { boardId, cardId } = useParams();
  const dispatch = useDispatch();
  let title;
  let renderList;
  if (board.title) {
    title = board.title;
    renderList = board.lists.map((key) => <List key={key.id} title={key.title} cards={key.cards} id={key.id} />);
    return (
      <section
        className="board_section"
        onDragOver={(e): void => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e): void => {
          dropHandler(e, `${boardId}`, dispatch);
        }}
      >
        <LogOut />
        <div className="table_title_div">
          <Link className="link_home" to="/">
            <button className="home">Home</button>
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
        {cardId && <CardModal lists={board.lists} />}
      </section>
    );
  }
  getBoard(dispatch, boardId || '');
  return <Loading />;
}
const mapStateToProps = (state: BoardState): BoardProps => ({
  board: state.board.board,
});
const connector = connect(mapStateToProps, boardFunctions);
type AllBoardProps = ConnectedProps<typeof connector>;
export default connector(Board);
