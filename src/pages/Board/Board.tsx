import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './board.scss';
import { Dispatch } from 'redux';
import List from './components/List/List';
import AddListButton from './components/addListButton/AddListButton';
import { clearBoardState, getBoard } from '../../store/modules/board/actions';
import Loading from '../Home/components/Loading/Loading';
import { LogOut } from '../../common/LogOut/LogOut';
import { isStringValid, notValidString } from '../../common/commonFunctions';
import api from '../../api/request';
import { getBoards } from '../../store/modules/boards/actions';
import { Mistake } from '../../common/Mistake/Mistake';
import { CardModal } from './components/Card/CardModal/CardModal';
import { BoardProps, BoardState } from '../../common/interfaces/BoardInterfaces';

const mapStateToProps = (state: BoardState): BoardProps => ({
  board: state.board.board,
  draggedCard: state.board.draggedCard,
  slotPosition: state.board.slotPosition,
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
  const { board, draggedCard, slotPosition } = useSelector(mapStateToProps);
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
  return (
    <section
      className="board_section"
      onDragOver={(e): void => {
        e.preventDefault();
        e.stopPropagation();
      }}
      // if card drops not in list
      onDrop={(): Promise<void> => getBoard(dispatch, boardId || '')}
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
        {board.lists.map((key) => (
          <List key={key.id} id={key.id} lists={board.lists} dragCard={draggedCard} slotPosition={slotPosition} />
        ))}
        <div className="button_column">
          <AddListButton lists={board.lists} position={board.lists.length + 1} />
        </div>
      </div>
      <LogOut />
      {cardId && <CardModal />}
    </section>
  );
}
