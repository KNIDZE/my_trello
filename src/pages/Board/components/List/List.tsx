import React from 'react';
import { ICard } from '../../../../common/interfaces/ICard.t';
import './list.scss';
// eslint-disable-next-line react/no-unused-prop-types
export default function List(props: { title: string; cards: ICard[] }): React.ReactElement {
  const { title } = props;
  return (
    <div className="card">
      <h2> {title} </h2>
    </div>
  );
}
