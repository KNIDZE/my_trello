import React from 'react';
import { useParams } from 'react-router-dom';
import { RouteComponentProps } from '@reach/router';

import List from './components/List/List';
import { ICard } from '../../common/interfaces/ICard.t';
import './components/Board/board.scss';

const insideState = {
  title: 'Моя тестовая доска',
  lists: [
    {
      id: 1,
      title: 'Планы',
      cards: [
        { id: 1, title: 'помыть кота' },
        { id: 2, title: 'приготовить суп' },
        { id: 3, title: 'сходить в магазин' },
      ],
    },
    {
      id: 2,
      title: 'В процессе',
      cards: [{ id: 4, title: 'посмотреть сериал' }],
    },
    {
      id: 3,
      title: 'Сделано',
      cards: [
        { id: 5, title: 'сделать домашку' },
        { id: 6, title: 'погулять с собакой' },
      ],
    },
  ],
};

interface BoardState {
  title: string;
  lists: Array<{ id: number; title: string; cards: ICard[] }>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Board(props: RouteComponentProps, state: BoardState): JSX.Element {
  const { title, lists } = insideState;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const boardId = useParams();
  // eslint-disable-next-line no-console
  console.log(boardId);
  // eslint-disable-next-line no-console
  const renderList = lists.map((key) => <List key={key.id} title={key.title} cards={key.cards} />);
  return (
    <section className="board_section">
      <div className="table_title_div">
        <button className="home">Домой</button>
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
