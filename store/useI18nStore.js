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


export const useI18nStore = create((set, get) => ({
  locale: LocaleTypes.en,
  i18n: new I18n(translations),
  setLocale: (newLocale) => {
    const i18n = get().i18n;
    i18n.locale = newLocale;
    set((state) => ({
      ...state,
      locale: i18n.locale,
    }));
  },
}));