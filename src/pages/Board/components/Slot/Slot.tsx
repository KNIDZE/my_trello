import React from 'react';
import './slot.scss';

export default function Slot(props: { id: number }): React.ReactElement {
  const { id } = props;
  return <div id={`slot_${id}`} className="card_slot" />;
}
