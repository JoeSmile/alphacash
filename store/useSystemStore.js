import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage"

import { LocaleTypes } from "@store/useI18nStore";

export const useSystemStore = create(persist(
(set, get) => ({
  isReadPolicy: false,
  locale: LocaleTypes.en,
  token: '',
  sign: '123dsabnwe',
  app:'alphacash',
  cardInfo: {},
  setReadPolicy: () => {
    set((state) => ({
      ...state,
      isReadPolicy: true
    }));
  },
  setLocale: (newLocale) => {
    set((state) => ({
      ...state,
      locale: newLocale
    }))
  },
  setToken: (token) => {
    set((state) => ({
      ...state,
      token
    }))
  },
  setCardInfo: (newCardInfo) => {
    set(() => ({
      cardInfo: newCardInfo
    }))
  },
  clean: () => {
    set(() => ({
      cardInfo: {},
    }));
  }
}), {
  name: 'system',
  storage: createJSONStorage(() => AsyncStorage)
} ));
