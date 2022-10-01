import React from 'react';
import Card from './Card';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const dragStartHandler = (e: React.DragEvent, title: string, id: number): void => {
  e.dataTransfer.setData('text/text', 'i want to break free');
  e.dataTransfer.effectAllowed = 'all';
  // create dragImage
  const ghostImage = document.createElement('div');
  ghostImage.classList.add('card', 'dragImage');
  ghostImage.innerHTML = title;
  const card = document.getElementById(id.toString());
  card?.appendChild(ghostImage);
  e.dataTransfer.setDragImage(ghostImage, 150, 35);
  setTimeout(() => card?.classList.add('hidden'), 0);
  // set div to box
  const box = document.getElementById(`card_box_${id}`);
  const transparentArea = document.createElement('div');
  transparentArea.style.height = '70px';
  transparentArea.style.width = '250px';
  box?.appendChild(transparentArea);
  // eslint-disable-next-line no-console
  console.log(e);
};
export const dragLeaveHandler = (id: number): void => {
  const box = document.getElementById(`card_box_${id}`);
  box?.classList.add('hidden');
};
export const dragEnterHandler = (e: React.DragEvent, cardList: JSX.Element[]): void => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  cardList.push(<Card id={0} title={''} position={cardList.length} listId={0} />);
};
