import { createUseState } from "@figliolia/react-galena";
import type { ICardModel } from "Models/CardModel";
import { CardModel } from "Models/CardModel";

export const Card = new CardModel();
export const useCard = createUseState(Card);

export const ready = (state: ICardModel) => state.ready;
export const loading = (state: ICardModel) => state.loading;
export const selectActiveName = (state: ICardModel) => state.name;
export const selectActiveState = (state: ICardModel) => [
  state.name,
  state.card,
];
