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
};
// export const dragLeaveHandler = (id: number): void => {
//   const box = document.getElementById(`card_box_${id}`);
//   box?.classList.add('hidden');
//   // eslint-disable-next-line no-console
//   console.log('worked');
// };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
export function dropHandler(e: DragEvent): void {
  // eslint-disable-next-line no-console
  console.log('working');
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
    card.classList.remove('hidden');
  }
}
export function removeExtraBox(): void {
  document.getElementById('extra_box')?.remove();
}

// adding extra box to given position
function addExtraBox(): HTMLElement {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card_box';
  cardDiv.id = `extra_box`;
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const dragEnterHandler = (e: React.DragEvent, id: number): void => {
  const listChildren = e.currentTarget.children;
  removeExtraBox();
  const lastElementRect = listChildren[e.currentTarget.children.length - 1].getBoundingClientRect();
  const curList = document.getElementById(`list_${id}`);
  if (e.clientY > lastElementRect.y) {
    if (curList !== null && !hasExtraCard(curList)) {
      const cardDiv = addExtraBox();
      curList.insertBefore(cardDiv, curList.lastChild);
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  } else {
    e.preventDefault();
    for (let i = 2; i < listChildren.length - 1; i++) {
      const prevChildCenter =
        listChildren[i - 1].getBoundingClientRect().y + listChildren[i - 1].getBoundingClientRect().height / 2;
      const thisChildCenter =
        listChildren[i].getBoundingClientRect().y + listChildren[i].getBoundingClientRect().height / 2;
      const nextChildCenter =
        listChildren[i + 1].getBoundingClientRect().y + listChildren[i + 1].getBoundingClientRect().height / 2;
      if (prevChildCenter < e.clientY && e.clientY < thisChildCenter) {
        if (curList !== null && !hasExtraCard(curList)) {
          const cardDiv = addExtraBox();
          curList.insertBefore(cardDiv, listChildren[i]);
        }
      } else if (e.clientY < nextChildCenter && e.clientY > thisChildCenter) {
        if (curList !== null && !hasExtraCard(curList)) {
          const cardDiv = addExtraBox();
          curList.insertBefore(cardDiv, listChildren[i + 1]);
        }
      }
    }
  }
};
