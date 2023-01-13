import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './board.scss';
import { Dispatch } from 'redux';
import List from './components/List/List';
import AddListButton from './components/addListButton/AddListButton';
import { clearBoardState, getBoard } from '../../store/modules/board/actions';
import Loading from '../Home/components/Loading/Loading';
import { dropHandler } from './components/Card/dragNdrop';
import IList from '../../common/interfaces/IList';
import { LogOut } from '../../common/LogOut/LogOut';
import { isStringValid, notValidString } from '../../common/commonFunctions';
import api from '../../api/request';
import { getBoards } from '../../store/modules/boards/actions';
import { Mistake } from '../../common/Mistake/Mistake';
import { CardModal } from './components/Card/CardModal/CardModal';

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
    await getBoards(dispatch);
    await getBoard(dispatch, boardId);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

function renameBoard(dispatch: Dispatch, title: string, boardId: string): void {
  if (isStringValid(title)) renameRequest(title, boardId, dispatch);
}

export default function Board(): JSX.Element {
  const { board } = useSelector(mapStateToProps);
  const { boardId, cardId } = useParams();
  const dispatch = useDispatch();
  const [mistake, setMistake] = useState({
    show: false,
    text: 'Empty',
    firstShow: true,
  });
  const [boardTitle, setTitle] = useState(board.title);
  if (boardTitle !== board.title) setTitle(board.title);
  if (!isStringValid(boardTitle) && !mistake.show && !mistake.firstShow) {
    const mistakeText = notValidString(boardTitle);
    setMistake({
      show: true,
      text: mistakeText,
      firstShow: false,
    });
  }
  // render part
  if (!board.title) {
    getBoard(dispatch, boardId || '');
    return <Loading />;
  }
  const renderList = board.lists.map((key) => (
    <List key={key.id} title={key.title} cards={key.cards} id={key.id} lists={board.lists} />
  ));
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
        <Link className="link_home" onClick={(): void => clearBoardState(dispatch)} to="/">
          <button className="home">Home</button>
        </Link>
        <input
          id="board_title"
          className="table_title"
          contentEditable="true"
          defaultValue={boardTitle}
          placeholder="One more board..."
          onChange={(event): void => {
            if (!isStringValid(event.currentTarget.value))
              setMistake({
                text: mistake.text,
                show: mistake.show,
                firstShow: false,
              });
            else
              setMistake({
                text: mistake.text,
                show: false,
                firstShow: false,
              });
            setTitle(event.currentTarget.value);
          }}
          onBlur={(e): void => renameBoard(dispatch, e.currentTarget.value, boardId || '')}
        />
        <Mistake text={mistake.text} show={mistake.show} />
      </div>
      <div className="container" id="board_container">
        {renderList}
        <div className="button_column">
          <AddListButton lists={board.lists} position={board.lists.length + 1} />
        </div>
      </div>
      <LogOut />
      {cardId && <CardModal />}
    </section>
  );
}
