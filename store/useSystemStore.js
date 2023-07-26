import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LocaleTypes } from "@store/useI18nStore";

export const useSystemStore = create(
  persist(
    (set, get) => ({
      //system
      isReadPolicy: false,
      isRatePoped: false, // 评分弹框，默认没弹过，只有完成第一次申请贷款会跳的Home页的时候弹
      isRepayReminderOn: false, // 还款提醒，默认是false，每次申请贷款回跳Home页的时候弹框提醒
      locale: LocaleTypes.en,

      //userInfo
      phone: "",
      token: "",

      //public parameters
      sign: "123dsabnwe",
      app: "alphacash",

      //cardInfo
      cardInfo: {},

      //system functions
      setReadPolicy: () => {
        set((state) => ({
          ...state,
          isReadPolicy: true,
        }));
      },
      setLocale: (newLocale) => {
        set((state) => ({
          ...state,
          locale: newLocale,
        }));
      },
      setRatePoped: () => {
        set((state) => ({
          ...state,
          isRatePoped: true,
        }));
      },
      setRepayReminderOn: (isOn) => {
        set((state) => ({
          ...state,
          isRepayReminderOn: isOn,
        }));
      },

      //userInfo functions
      setToken: (token) => {
        set((state) => ({
          ...state,
          token,
        }));
      },

      setUserInfo: ({ phone = "", token = "" }) => {
        set((state) => ({
          ...state,
          phone,
          token,
        }));
      },

      //cardInfo functions
      setCardInfo: (newCardInfo) => {
        set(() => ({
          cardInfo: newCardInfo,
        }));
      },
      clean: () => {
        set(() => ({
          cardInfo: {},
        }));
      },
    }),
    {
      name: "system",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
