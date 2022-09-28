import React from 'react';
import './loading.scss';

export default function Loading(): React.ReactElement {
  return (
    <div className="loading display_center">
      <div className="outer_circle" />
    </div>
  );
}
