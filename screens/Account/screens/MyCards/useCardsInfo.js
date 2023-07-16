import { create } from "zustand";

// type 有2种
// 电子钱包和银行卡
// 1 是银行卡 2是电子钱包
// ewalletType :
// 1==> EasyPaisa
// 2==> jazzcash

export const card = {
    "bankAccountId": '',
    'bankId': '',
    "bankName": '',
    "bankAccount": "",
    "bankAccountName": "2",

    "ewalletId": '',
    "ewalletType": '',
    "ewalletAccount": "",
    "ewalletName": "",

    "type": 2,
};

export const useCardsInfo = create((set, get) => ({
  cards: [
    {
        "ewalletId": 1,
        "ewalletType": 1,
        "ewalletAccount": "01238137215",
        "type": 2,
        "ewalletName": "EasyPaisa"
    },
    {
        "ewalletId": 2,
        "ewalletType": 2,
        "ewalletAccount": "01238137213",
        "type": 2,
        "ewalletName": "Jazzcash"
    },
    {
        "bankAccountId": 1,
        "bankId": 2,
        "bankName": "Askari Commercial Bank Limited",
        "bankAccount": "546464646464",
        "bankAccountName": "2",
        "type": 1
    }
],
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
