import React, { ReactElement } from 'react';
import Board from './components/Board/Board';
import './home.scss';

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends React.Component<unknown, { boards: Array<{ id: number; title: string }> }> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      boards: [
        { id: 1, title: 'покупки' },
        { id: 2, title: 'подготовка к свадьбе' },
        { id: 3, title: 'разработка интернет-магазина' },
        { id: 4, title: 'курс по продвижению в соцсетях' },
      ],
    };
  }

  render(): ReactElement {
    const { boards } = this.state;
    const boardsList = boards.map((key) => <Board key={key.id} title={key.title} id={key.id} />);
    return (
      <section className="home">
        <h1 className="home_title">Мои доски</h1>
        <div className="container">
          {boardsList}
          <div className="board" id="add_board">
            <a>+</a>&nbsp;Создать доску
          </div>
        </div>
      </section>
    );
  }
}
