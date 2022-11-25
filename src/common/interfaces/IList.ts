import { ICard } from './ICard.t';

export default interface IList {
  id: number;
  title: string;
  cards: ICard[];
}
