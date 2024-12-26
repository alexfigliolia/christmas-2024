import type { MouseEvent } from "react";
import { State } from "@figliolia/galena";
import { CARDS } from "./Cards";

export class CardModel extends State<ICardModel> {
  constructor() {
    super("Card", {
      name: "",
      card: "",
      ready: false,
      loading: true,
    });
  }

  public initialize() {
    this.set("loading", false);
    setTimeout(() => {
      this.set("ready", true);
    }, 2000);
  }

  public select = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const { name } = target.dataset;
    if (name && this.matchesCard(name)) {
      this.set("name", name);
      this.set("card", CARDS[name]);
    }
  };

  public goBack = () => {
    this.set("name", "");
    setTimeout(() => {
      this.set("card", "");
    }, 2000);
  };

  public set<K extends keyof ICardModel>(key: K, value: ICardModel[K]) {
    this.update((state) => {
      state[key] = value;
    });
  }

  private matchesCard = (name: string): name is keyof typeof CARDS => {
    return name in CARDS;
  };
}

export interface ICardModel {
  card: string;
  name: string;
  ready: boolean;
  loading: boolean;
}
