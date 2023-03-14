import IList from './IList';
import { ICard } from './ICard.t';

export interface BoardInterface {
  title: string;
  lists: IList[];
}

export interface BoardState {
  board: { board: BoardInterface; draggedCard: ICard };
}

export interface BoardProps {
  board: {
    title: string;
    lists: IList[];
  };
}
