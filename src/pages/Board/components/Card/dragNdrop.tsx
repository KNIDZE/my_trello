import React from 'react';
import { Dispatch } from 'redux';
import { ICard } from '../../../../common/interfaces/ICard.t';
import IList from '../../../../common/interfaces/IList';
import { getBoard, setDragCard, updateLists } from '../../../../store/modules/board/actions';
import api from '../../../../api/request';

export const dragStartHandler = (e: React.DragEvent, card: ICard, dispatch: Dispatch): void => {
  e.dataTransfer.setDragImage(e.currentTarget as HTMLImageElement, 0, 0);
  e.dataTransfer.setData('text', `${card.id}`);
  setDragCard(card, dispatch);
};

// Searching a card that we drag. Move card info to drop list.

function transferCard(card_id: string, boardLists: IList[], listId: number): IList[] {
  let curCard: ICard = { id: 0, title: '', listId, position: 0 };
  const lists: IList[] = [];
  boardLists.forEach((list) => {
    const newList: IList = { id: list.id, title: list.title, cards: [] };
    list.cards.forEach((card) => {
      if (card.id === +card_id) {
        curCard = card;
      } else {
        newList.cards.push(card);
      }
    });
    lists.push(newList);
  });
  lists.forEach((list) => {
    if (list.id === listId) {
      curCard.position = list.cards.length + 1;
      list.cards.push(curCard);
    }
  });
  return lists;
}
function hasEmptySlot(cards: ICard[]): boolean {
  let result = false;
  cards.forEach((card) => {
    if (card.id === -1) result = true;
  });
  return result;
}
export const addEmptySlot = (cards: ICard[], listId: number): ICard[] => {
  if (!hasEmptySlot(cards)) {
    cards.push({
      id: -1,
      position: cards.length + 1,
      title: '',
      listId,
    });
  }
  return cards;
};

export const removeEmptySlot = (cards: ICard[]): ICard[] => cards.filter((card) => card.id !== -1);

export const removeDraggedSlot = (cards: ICard[], cardId: number): ICard[] => {
  const result = cards.filter((card) => card.id !== +cardId);
  return removeEmptySlot(result);
};

export const dropHandler = (
  card: ICard,
  listId: number,
  boardId: string | undefined,
  boardLists: IList[],
  dispatch: Dispatch
): IList => {
  const lists = transferCard(`${card.id}`, boardLists, listId);
  api.put(`/board/${boardId}/card`, [
    {
      id: card.id,
      position: card.position,
      list_id: listId,
    },
  ]);
  updateLists(lists, dispatch);
  const result = lists.filter((list) => list.id === listId)[0];
  if (boardId) getBoard(dispatch, boardId);
  return result;
};
