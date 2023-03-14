import React from 'react';
import './slot.scss';
import { ICard } from '../../../../common/interfaces/ICard.t';
import Card from '../Card/Card';

export default function CardSlot(props: { id: number; card: ICard | undefined }): React.ReactElement {
  const { id, card } = props;
  return (
    <div id={`slot_${id}`} className="card_slot">
      {card && <Card card={card} />}
    </div>
  );
}
