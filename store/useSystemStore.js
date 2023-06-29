import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { AsyncStorage } from 'react-native';

import { isDev } from "../constants/config";
import { LocaleTypes } from "@store/useI18nStore";

export const useSystemStore = create(persist(
(set, get) => ({
  isReadPolicy: false,
  locale: LocaleTypes.en,
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
  }
}), {
  name: 'system',
  storage: isDev ? createJSONStorage(() => localStorage) :
  createJSONStorage(() => AsyncStorage)
} ));
