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
interface ShortListInfo {
  title: string;
  id: string;
}
export function findListCard(lists: IList[], id: string): { card: ICard | undefined; list: ShortListInfo } {
  let resultCard;
  const listTitle = document.getElementById(`card_box_${id}`)?.parentElement?.children[1].innerHTML;
  const listId = document.getElementById(`card_box_${id}`)?.parentElement?.id;
  lists.forEach((list) => {
    list.cards.forEach((card) => {
      if (card.id === +id) {
        resultCard = card;
      }
    });
  });
  return {
    card: resultCard,
    list: {
      title: listTitle || '',
      id: listId?.slice(5) || '',
    },
  };
}
