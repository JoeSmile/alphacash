import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { AsyncStorage } from 'react-native';

import { isDev } from "../constants/config";


export const useSystemStore = create(persist(
(set, get) => ({
  isReadPolicy: false,
  setReadPolicy: () => {
    set((state) => ({
      ...state,
      isReadPolicy: true
    }));
  },
}), {
  name: 'system',
  storage: isDev ? createJSONStorage(() => localStorage) :
  createJSONStorage(() => AsyncStorage)
} ));
