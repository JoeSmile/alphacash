import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { create } from "zustand";
import { translations } from "../Localization";

export const LocaleTypes = {
  en: "en",
  zh: "zh",
};

export const useI18nStore = create((set, get) => ({
  i18n: new I18n(translations),
  locale: "en",
  setLocale: (newLocale) => {
    const i18n = get().i18n;
    i18n.locale = newLocale;
    set((state) => ({
      ...state,
      locale: i18n.locale,
    }));
  },
}));
