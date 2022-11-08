import React from 'react';
import { Dispatch } from 'redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { updateCards } from '../../../../store/modules/board/actions';

export const dragStartHandler = (e: React.DragEvent, title: string, id: number): void => {
  e.dataTransfer.setData('html/plain', e.currentTarget.id);
  e.dataTransfer.effectAllowed = 'all';
  // create dragImage
  const ghostImage = document.createElement('div');
  ghostImage.classList.add('card', 'dragImage');
  ghostImage.innerHTML = title;
  const card = document.getElementById(id.toString());
  const box = document.getElementById(`card_box_${id.toString()}`);
  card?.appendChild(ghostImage);
  e.dataTransfer.setDragImage(ghostImage, 150, 35);
  setTimeout(() => {
    card?.classList.add('hidden');
    box?.classList.add('hidden');
  }, 0);
};

function hasExtraCard(listChildren: HTMLCollection): boolean {
  let child;
  for (let i = 0; i < listChildren.length; i++) {
    child = listChildren.item(i);
    if (child !== null && child.id !== null) {
      if (child.id === 'extra_box') {
        return true;
      }
    }
  }
  return false;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function dropHandler(e: DragEvent | React.DragEvent, boardId: string, dispatch: Dispatch): void {
  const dragCardId = e.dataTransfer?.getData('html/plain') || '';
  const newPosition = document.getElementById('extra_box');
  const card = document.getElementById(dragCardId);
  if (newPosition !== null && card !== null) {
    // const previousCardBox = document.getElementById(`card_box_${dragCardId}`);
    // if (previousCardBox) previousCardBox.remove();
    // remove dragImage
    if (card.lastChild) card.removeChild(card.lastChild);
    const cardClone = card.cloneNode(true) as HTMLElement;
    // newPosition.appendChild(cardClone);
    newPosition.id = `card_box_${dragCardId}`;
    cardClone.classList.remove('hidden');
    updateCards(boardId, newPosition.parentElement?.children, newPosition.parentElement?.id, dispatch);
    newPosition.remove();
  }
}
export function removeExtraBox(): void {
  document.getElementById('extra_box')?.remove();
}

// adding extra box to given position
function addExtraBox(boardId: string, dispatch: Dispatch): HTMLElement {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card_box';
  cardDiv.id = `extra_box`;
  cardDiv.addEventListener('drop', (event) => {
    dropHandler(event, boardId, dispatch);
  });
  function createSlot(): Element {
    const slot = document.createElement('div');
    slot.className = 'card_slot';
    return slot;
  }
  cardDiv.appendChild(createSlot());
  return cardDiv;
}
function insertBox(
  listChild: HTMLCollection,
  e: React.DragEvent,
  curList: EventTarget & Element,
  boardId: string,
  dispatch: Dispatch
): void {
  for (let i = 2; i < listChild.length - 1; i++) {
    const prevChildCenter =
      listChild[i - 1].getBoundingClientRect().y + listChild[i - 1].getBoundingClientRect().height / 2;
    const thisChildCenter = listChild[i].getBoundingClientRect().y + listChild[i].getBoundingClientRect().height / 2;
    const nextChildCenter =
      listChild[i + 1].getBoundingClientRect().y + listChild[i + 1].getBoundingClientRect().height / 2;
    if (prevChildCenter < e.clientY && e.clientY < thisChildCenter) {
      if (curList !== null && !hasExtraCard(curList.children)) {
        const cardDiv = addExtraBox(boardId, dispatch);
        curList.insertBefore(cardDiv, listChild[i]);
      }
    } else if (e.clientY < nextChildCenter && e.clientY > thisChildCenter) {
      if (curList !== null && !hasExtraCard(curList.children)) {
        const cardDiv = addExtraBox(boardId, dispatch);
        curList.insertBefore(cardDiv, listChild[i + 1]);
      }
    }
  }
}
export const dragEnterHandler = (e: React.DragEvent, boardId: string, dispatch: Dispatch): void => {
  const listChildren = e.currentTarget.children;
  const curList = e.currentTarget;
  removeExtraBox();
  const lastElementRect = listChildren[e.currentTarget.children.length - 1].getBoundingClientRect();
  e.preventDefault();

  if (
    e.clientX >= curList?.getBoundingClientRect().x &&
    // eslint-disable-next-line no-unsafe-optional-chaining
    e.clientX <= curList?.getBoundingClientRect().x + curList?.getBoundingClientRect().width
  ) {
    if (e.clientY > lastElementRect.y) {
      if (curList !== null && !hasExtraCard(listChildren)) {
        const cardDiv = addExtraBox(boardId, dispatch);
        curList.insertBefore(cardDiv, curList.lastChild);
      }
      e.dataTransfer.dropEffect = 'move';
    } else {
      insertBox(listChildren, e, curList, boardId, dispatch);
    }
  }
};
