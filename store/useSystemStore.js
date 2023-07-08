import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage"

import { LocaleTypes } from "@store/useI18nStore";

export const useSystemStore = create(persist(
(set, get) => ({
  isReadPolicy: false,
  locale: LocaleTypes.en,
  token: '',
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
  }
}), {
  name: 'system',
  storage: createJSONStorage(() => AsyncStorage)
} ));
