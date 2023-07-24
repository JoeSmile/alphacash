import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage"

import { LocaleTypes } from "@store/useI18nStore";

export const useSystemStore = create(persist(
(set, get) => ({
  //system
  isReadPolicy: false,
  locale: LocaleTypes.en,
  
  //userInfo
  phone: "",
  token: "",
  
  //public parameters
  sign: '123dsabnwe',
  app:'alphacash',
  
  //cardInfo
  cardInfo: {},

  //system functions
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

  //userInfo functions
  setToken: (token) => {
    set((state) => ({
      ...state,
      token
    }))
  },

  setUserInfo: ({phone='', token=''}) => {
    set((state) => ({
      ...state,
      phone,
      token
    }))
  },

   //cardInfo functions
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
