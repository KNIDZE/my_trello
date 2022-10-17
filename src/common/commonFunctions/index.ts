import { ICard } from '../interfaces/ICard.t';

export function isStringValid(s: string): boolean {
  return s.search(/^[A-zА-я\d\s,._-]+$/gu) !== -1;
}
export function comparePositionCard(a: ICard, b: ICard): number {
  if (a.position < b.position) return -1;
  if (a.position > b.position) return 1;
  return 0;
}
