import React, { ReactElement } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { useVisibility } from '../../../../../../common/commonFunctions';
import './listselector.scss';
import IList from '../../../../../../common/interfaces/IList';
import { SelectorItem } from './SelectorItem/SelectorItem';

interface IListSelector {
  setNewList: (listId: number) => void;
  listTitle: string;
  lists: IList[];
}

export default function ListSelector({ listTitle, lists, setNewList }: IListSelector): ReactElement {
  const [isListVisible, reverseVisibility] = useVisibility();
  return (
    <div className="select_container">
      <button className="action" onClick={(): void => reverseVisibility()}>
        {listTitle.length < 11 ? listTitle : `${listTitle.slice(0, 10)}...`} <FaAngleDown className="arrow_down" />
      </button>
      {isListVisible && (
        <div className="selector">
          {lists
            .filter((list) => list.title !== listTitle)
            .map((list) => (
              <SelectorItem
                key={list.id}
                listTitle={list.title}
                hideList={reverseVisibility}
                listId={list.id}
                setNewList={setNewList}
              />
            ))}
        </div>
      )}
    </div>
  );
}
