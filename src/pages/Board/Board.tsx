import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './board.scss';
import { Dispatch } from 'redux';
import List from './components/List/List';
import AddListButton from './components/addListButton/AddListButton';
import { getBoard } from '../../store/modules/board/actions';
import Loading from '../Home/components/Loading/Loading';
import { dropHandler } from './components/Card/dragNdrop';
import { CardModal } from './components/Card/CardModal/CardModal';
import IList from '../../common/interfaces/IList';
import { LogOut } from '../../common/LogOut/LogOut';
import { isStringValid, notValidString } from '../../common/commonFunctions';
import api from '../../api/request';
import { getBoards } from '../../store/modules/boards/actions';

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

const mapStateToProps = (state: BoardState): BoardProps => ({
  board: state.board.board,
});

async function renameRequest(title: string, boardId: string, dispatch: Dispatch): Promise<void> {
  try {
    await api.put(`/board/${boardId}`, {
      title,
      custom: {},
    });
    await getBoard(dispatch, boardId);
    await getBoards(dispatch);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export function renameBoard(dispatch: Dispatch, title: string, boardId: string): void {
  if (isStringValid(title)) {
    renameRequest(title, boardId, dispatch);
  } else {
    notValidString(title, 'board_title');
  }
}

export default function Board(): JSX.Element {
  const { board } = useSelector(mapStateToProps);
  const { boardId, cardId } = useParams();
  const dispatch = useDispatch();
  // render part

  if (!board.title) {
    getBoard(dispatch, boardId || '');
    return <Loading />;
  }
  const { title } = board;
  const renderList = board.lists.map((key) => <List key={key.id} title={key.title} cards={key.cards} id={key.id} />);
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
      <div className="table_title_div">
        <Link className="link_home" to="/">
          <button className="home">Home</button>
        </Link>
        <h1
          id="board_title"
          className="table_title"
          contentEditable="true"
          suppressContentEditableWarning
          data-ph="One more board..."
          onBlur={(event): void => renameBoard(dispatch, event.currentTarget.textContent || '', boardId || '')}
        >
          {title}
        </h1>
      </div>
      <div className="container" id="board_container">
        {renderList}
        <div className="button_column">
          <AddListButton />
        </div>
      </div>
      <LogOut />
      {cardId && <CardModal lists={board.lists} />}
    </section>
  );
}
