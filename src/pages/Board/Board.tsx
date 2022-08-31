import React from 'react';
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

interface MyState {
  title: string;
  lists: Array<{ id: number; title: string; cards: ICard[] }>;
}

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/ban-types
export default class Board extends React.Component<{}, MyState> {
  constructor({ props }: { props: never }) {
    super(props);
    this.state = insideState;
  }

  render(): React.ReactElement {
    const { title, lists } = this.state;
    // eslint-disable-next-line no-console,react/jsx-key,array-callback-return
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
}
