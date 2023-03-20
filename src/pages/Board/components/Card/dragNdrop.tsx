import React from 'react';
import { Dispatch } from 'redux';
import { ICard } from '../../../../common/interfaces/ICard.t';
import IList from '../../../../common/interfaces/IList';
import { getBoard, setDragCard, updateLists } from '../../../../store/modules/board/actions';
import api from '../../../../api/request';

export const dragStartHandler = (e: React.DragEvent, card: ICard, listId: number, dispatch: Dispatch): void => {
  e.dataTransfer.setDragImage(e.currentTarget as HTMLImageElement, 0, 0);
  e.dataTransfer.setData('text', `${listId}`);
  setDragCard(
    { id: card.id, position: card.position, listId, title: card.title, description: card.description },
    dispatch
  );
};

// case when card not transfer to another list
function transferCardInList(draggedCard: ICard, boardLists: IList[], cardPosition: number): IList[] {
  return boardLists.map((list) => {
    if (list.id === draggedCard.listId) {
      const newList = list;
      newList.cards = newList.cards.map((card) => {
        const newCard = card;
        newCard.listId = list.id;
        if (card.position > cardPosition) {
          newCard.position += 1;
        }
        return newCard;
      });
      return newList;
    }
    return list;
  });
}
// Searching a card that we drag. Move card info to drop list.

function transferCard(draggedCard: ICard, boardLists: IList[], listId: number, cardPosition: number): IList[] {
  const currentCard = draggedCard;
  const oldListId = currentCard.listId;
  return boardLists.map((list) => {
    // from old list removing card
    if (oldListId === list.id) {
      const newList = list;
      newList.cards = newList.cards
        .filter((card) => card.id !== draggedCard.id)
        .map((card) => {
          const nextCard = card;
          nextCard.listId = list.id;
          // make position of cards after dragCard lower
          if (card.position > draggedCard.position) {
            nextCard.position -= 1;
            return nextCard;
          }
          return nextCard;
        });
      return newList;
    }
    // push card to new list
    if (listId === list.id) {
      const newList = list;
      // changing position of cards in list
      newList.cards = newList.cards
        .filter((card) => card.id !== -1)
        .map((card) => {
          const newCard = card;
          newCard.listId = newList.id;
          if (card.position >= cardPosition) {
            newCard.position += 1;
            return newCard;
          }
          return newCard;
        });
      currentCard.position = Math.ceil(cardPosition);
      currentCard.listId = newList.id;
      newList.cards.push(currentCard);
      return newList;
    }
    return list;
  });
}

export const removeEmptySlot = (cards: ICard[]): ICard[] => cards.filter((card) => card.id !== -1);

export const removeDraggedCard = (cards: ICard[], cardId: number): ICard[] => {
  const result = cards.filter((card) => card.id !== cardId);
  return removeEmptySlot(result);
};

export const dropHandler = async (
  e: React.DragEvent,
  card: ICard,
  listId: number,
  boardId: string | undefined,
  boardLists: IList[],
  cardPosition: number,
  dispatch: Dispatch,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setState: React.Dispatch<React.SetStateAction<ICard[]>>
): Promise<void> => {
  let lists;
  const oldListId = e.dataTransfer.getData('text');
  let cardsToUpdate;
  if (+oldListId === listId) {
    lists = transferCardInList(card, boardLists, cardPosition);
    // eslint-disable-next-line no-console
    console.log(lists);
    cardsToUpdate = lists
      .filter((list) => list.id === listId)[0]
      .cards.map((oneCard) => ({ id: oneCard.id, position: oneCard.position, list_id: oneCard.listId }));
  } else {
    lists = transferCard(card, boardLists, listId, cardPosition);
    updateLists(lists, dispatch);
    cardsToUpdate = lists
      .filter((list) => list.id === listId)[0]
      .cards.concat(lists.filter((list) => list.id === +oldListId)[0].cards)
      .map((oneCard) => ({ id: oneCard.id, position: oneCard.position, list_id: oneCard.listId }));
  }
  // edit old list
  // eslint-disable-next-line no-console
  cardsToUpdate = cardsToUpdate.filter((oneCard) => oneCard.id !== -1);
  // eslint-disable-next-line no-console
  console.log(cardsToUpdate);
  await api.put(`/board/${boardId}/card`, cardsToUpdate);
  // edit newList
  const result = lists.filter((list) => list.id === listId)[0];
  if (boardId) await getBoard(dispatch, boardId);

  setState(result.cards);
};
