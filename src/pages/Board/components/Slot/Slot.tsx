import React from 'react';
import './slot.scss';

export default function CardSlot({ visible }: { visible: boolean }): React.ReactElement {
  const display = visible ? 'block' : 'none';
  return <div className="card_slot" style={{ display }} />;
}
