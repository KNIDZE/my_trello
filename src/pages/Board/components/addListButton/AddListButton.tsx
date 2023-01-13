import React, { useState } from 'react';
import './addListButton.scss';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { addNewList, getBoard } from '../../../../store/modules/board/actions';
import { isStringValid, notValidString } from '../../../../common/commonFunctions';
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
  const [newListTitle, saveListTitle] = useState('');
  const [showLabel, turnButton] = useState(true);
  const [mistake, setMistake] = useState({
    show: false,
    text: 'Empty',
    firstShow: true,
  });
  if (!isStringValid(newListTitle) && !mistake.show && !mistake.firstShow) {
    const mistakeText = notValidString(newListTitle);
    setMistake({
      show: true,
      text: mistakeText,
      firstShow: false,
    });
  }
  if (showLabel) {
    return (
      <div onClick={(): void => turnButton(false)} className="add_list_label">
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
          saveListTitle(event.currentTarget.value);
          setMistake({
            text: mistake.text,
            show: false,
            firstShow: false,
          });
        }}
      />
      <Mistake text={mistake.text} show={mistake.show} />
      <div className="button_panel" id="list_creation_panel">
        <button
          className="add_list_submit"
          onClick={(): void => {
            createList(dispatch, newListTitle, id || '', position, lists);
            setMistake({
              text: newListTitle,
              show: mistake.show,
              firstShow: false,
            });
          }}
        >
          Add
        </button>
        <div onClick={(): void => turnButton(true)} className="delete_button" />
      </div>
    </div>
  );
}
