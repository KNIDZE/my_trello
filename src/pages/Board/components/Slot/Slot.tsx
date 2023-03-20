import React from 'react';
import './slot.scss';

export default function CardSlot(props: { visible: boolean }): React.ReactElement {
  const { visible } = props;
  const display = visible ? 'block' : 'none';
  return <div className="card_slot" style={{ display }} />;
}
