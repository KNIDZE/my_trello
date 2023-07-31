import React, { useCallback } from 'react';
import './selectoritem.scss';

interface ISelectorItem {
  listTitle: string;
  listId: number;
  hideList: () => void;
  setNewList: (listId: number) => void;
}
export function SelectorItem({ listTitle, hideList, listId, setNewList }: ISelectorItem): React.ReactElement {
  const handleClick = useCallback(() => {
    setNewList(listId);
    hideList();
  }, [hideList, listTitle]);
  return (
    <div className="selector_item" onClick={handleClick}>
      <p>{listTitle}</p>
    </div>
  );
}
