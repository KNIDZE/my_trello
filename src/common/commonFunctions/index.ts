import { ICard } from '../interfaces/ICard.t';
import IList from '../interfaces/IList';

export function isStringValid(s: string): boolean {
  return s.search(/^[A-zА-я\d\s,._-]+$/gu) !== -1;
}
export function comparePositionCard(a: ICard, b: ICard): number {
  if (a.position < b.position) return -1;
  if (a.position > b.position) return 1;
  return 0;
}
export function findListCard(lists: IList[], id: string): { card: ICard; list: IList } {
  let resultCard = lists[0].cards[0];
  let resultList = lists[0];
  lists.forEach((list) => {
    list.cards.forEach((card) => {
      if (card.id === +id) {
        resultCard = card;
        resultList = list;
      }
    });
  });
  return {
    card: resultCard,
    list: resultList,
  };
}

export function notValidString(title: string, titleDuplication = false): string {
  if (titleDuplication) {
    return 'This title exists';
  }
  if (title.length === 0) {
    return 'Empty title';
  }
  return 'Only letters, numbers, _, -';
}
