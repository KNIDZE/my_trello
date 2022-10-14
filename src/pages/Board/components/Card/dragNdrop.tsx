import React from 'react';

const transferData = {
  data: {
    title: '',
    id: 0,
  },
};

export const dragStartHandler = (e: React.DragEvent, title: string, id: number): void => {
  transferData.data = { title, id };
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
  // set div to box
  // eslint-disable-next-line no-console
  console.log(e);
};
// export const dragLeaveHandler = (id: number): void => {
//   const box = document.getElementById(`card_box_${id}`);
//   box?.classList.add('hidden');
//   // eslint-disable-next-line no-console
//   console.log('worked');
// };
function hasExtraCard(list: HTMLElement): boolean {
  let child;
  for (let i = 0; i < list.children.length; i++) {
    child = list.children.item(i);
    if (child !== null && child.id !== null) {
      if (child.id === 'extra_box') {
        return true;
      }
    }
  }
  return false;
}
function dropHandler(e: DragEvent): void {
  const dragCardId = e.dataTransfer?.getData('html/plain') || '';
  const newPosition = document.getElementById('extra_box');
  const card = document.getElementById(dragCardId);
  if (newPosition !== null && card !== null) {
    const previousCardBox = document.getElementById(`card_box_${dragCardId}`);
    if (previousCardBox) previousCardBox.remove();
    // remove dragImage
    if (card.lastChild) card.removeChild(card.lastChild);
    newPosition.appendChild(card);
    newPosition.id = `card_box_${dragCardId}`;
    // newPosition.addEventListener('dragleave', () => dragLeaveHandler(+dragCardId));
    card.classList.remove('hidden');
  }
}
function removeExtraBox(): void {
  document.getElementById('extra_box')?.remove();
}

// adding extra box to given position
function addExtraBox(): HTMLElement {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card_box';
  cardDiv.id = `extra_box`;
  cardDiv.addEventListener('dragenter', (event) => event.stopImmediatePropagation());
  cardDiv.addEventListener('drop', (event) => {
    dropHandler(event);
  });
  function createSlot(): Element {
    const slot = document.createElement('div');
    slot.className = 'card_slot';
    return slot;
  }

  cardDiv.appendChild(createSlot());
  return cardDiv;
}
export function dragEnterCard(e: React.DragEvent): void {
  e.stopPropagation();
  const listId = e.currentTarget.parentElement?.parentElement?.id;
  const currentCard = e.currentTarget.getBoundingClientRect();
  let upperElement = e.currentTarget.parentElement;
  // eslint-disable-next-line no-console
  console.log(listId);
  const curList = document.getElementById(`${listId}`);
  if (currentCard.y + currentCard.height / 2 < e.clientY && upperElement?.nextSibling !== null) {
    // eslint-disable-next-line no-console
    upperElement = upperElement?.nextSibling as HTMLElement;
  }
  if (upperElement?.id !== 'extra_box') {
    // eslint-disable-next-line no-console
    console.log(upperElement);
    removeExtraBox();
    curList?.insertBefore(addExtraBox(), upperElement);
  }
}

export const dragEnterHandler = (e: React.DragEvent, id: number): void => {
  // eslint-disable-next-line no-console
  console.log('working');
  removeExtraBox();
  const curList = document.getElementById(`list_${id}`);
  const cardDiv = addExtraBox();
  if (curList !== null && !hasExtraCard(curList)) {
    curList.insertBefore(cardDiv, curList.lastChild);
  }
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};
