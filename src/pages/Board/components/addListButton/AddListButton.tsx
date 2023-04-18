import React, { useEffect, useState } from 'react';
import './addListButton.scss';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { addNewList, getBoard } from '../../../../store/modules/board/actions';
import { isStringValid, notValidString, useVisibility } from '../../../../common/commonFunctions';
import IList from '../../../../common/interfaces/IList';
import { Mistake } from '../../../../common/Mistake/Mistake';

async function createList(
  dispatch: Dispatch,
  title: string,
  id: string,
  position: number,
  lists: IList[]
): Promise<void> {
  if (isStringValid(title)) {
    await addNewList(title, id, position, lists, dispatch);
    await getBoard(dispatch, id);
  }
}

export default function AddListButton(props: { position: number; lists: IList[] }): React.ReactElement {
  const { position, lists } = props;
  const id = useParams().boardId;
  const dispatch = useDispatch();
  const [newListTitle, setNewListTitle] = useState('');
  const [isLabelVisible, reverseVisibility] = useVisibility(true);
  const [mistake, setMistake] = useState({
    show: false,
    text: '',
    firstShow: true,
  });
  useEffect(() => {
    setMistake({ show: false, firstShow: true, text: '' });
    setNewListTitle('');
  }, [isLabelVisible]);
  useEffect(() => {
    if (!isStringValid(newListTitle) && !mistake.show && !mistake.firstShow) {
      const mistakeText = notValidString(newListTitle);
      setMistake((prevState) => ({ ...prevState, show: true, text: mistakeText }));
    }
  }, [newListTitle, mistake]);

  if (isLabelVisible || !id) {
    return (
      <div onClick={(): void => reverseVisibility()} className="add_list_label">
        <p>New list</p>
      </div>
    );
  }
  return (
    <div className="add_list_form">
      <input
        id="add_list_form"
        placeholder="enter title"
        onChange={(event): void => {
          setNewListTitle(event.currentTarget.value);
          setMistake((prevState) => ({ ...prevState, show: false, firstShow: false }));
        }}
      />
      <Mistake text={mistake.text} show={mistake.show} />
      <div className="button_panel" id="list_creation_panel">
        <button
          className="add_list_submit"
          onClick={(): void => {
            createList(dispatch, newListTitle, id, position, lists);
            reverseVisibility();
          }}
        >
          Add
        </button>
        <div onClick={(): void => reverseVisibility()} className="delete_button" />
      </div>
    </div>
  );
}
