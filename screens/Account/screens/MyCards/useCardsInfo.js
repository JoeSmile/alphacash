import { create } from "zustand";

export const card = {
  bankName: "",
  bankAccount: "",
  userName: "",
};

export const useCardsInfo = create((set, get) => ({
  cards: [],
  add: (newCard) => {
    set(() => ({
      cards: [...get().cards, newCard],
    }));
  },
  remove: (index) => {
    const currentCards = get().cards;
    currentCards.splice(index, 1);
    set(() => ({
      cards: [...currentCards],
    }));
  },
  update: (index, newCard) => {
    get().remove(index);
    get().add(newCard);
  },
}));
