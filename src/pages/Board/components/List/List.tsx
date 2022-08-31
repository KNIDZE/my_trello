import React from 'react';
import { ICard } from '../../../../common/interfaces/ICard.t';
import './list.scss';
import Card from '../Card/Card';

// eslint-disable-next-line react/no-unused-prop-types
export default function List(props: { title: string; cards: ICard[] }): React.ReactElement {
  const { title, cards } = props;
  const cardsList = cards.map((key) => <Card key={key.id} title={key.title} />);
  return (
    <div className="list">
      <h2> {title} </h2>
      {cardsList}
      <button className="add_card">
        <p>+</p>
      </button>
    </div>
  );
}
