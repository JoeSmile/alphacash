import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { AsyncStorage } from 'react-native';

import { translations } from "../Localization";
import { isDev } from "../constants/config";

export const LocaleTypes = {
  en: "en",
  urdu: "urdu",
};

export const i18n = new I18n(translations)
console.log('isDev --------------',isDev )
export const useI18nStore = create(persist(
  (set, get) => ({
    locale: LocaleTypes.en,
    setLocale: (newLocale) => {
      i18n.locale = newLocale;
      set((state) => ({
        ...state,
        locale: i18n.locale,
      }));
    },
  }), {
    name: 'language',
    storage: isDev ? createJSONStorage(() => localStorage) :
    createJSONStorage(() => AsyncStorage)
  } ));