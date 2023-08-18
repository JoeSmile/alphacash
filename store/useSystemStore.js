import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LocaleTypes } from "@store/useI18nStore";
import { cloneDeep, merge} from 'lodash';

// 依赖于user phone
const basicUserInfo = {
  isRatePoped: false, // 评分弹框，默认没弹过，只有完成第一次申请贷款会跳的Home页的时候弹
  isRepayReminderOn: false, // 还款提醒，默认是false，每次申请贷款回跳Home页的时候弹框提醒
  //cardInfo
  cardInfo: {},
}
export const useSystemStore = create(
  persist(
    (set, get) => ({
      // 依赖于user  userInfo structure
      // {
      //   '03123456789': {
      //     isReadPolicy: false,
      //     isRatePoped: false, // 评分弹框，默认没弹过，只有完成第一次申请贷款会跳的Home页的时候弹
      //     isRepayReminderOn: false, // 还款提醒，默认是false，每次申请贷款回跳Home页的时候弹框提醒
      //     cardInfo: {},
      //   }
      // }
      usersInfo: {},
      locale: LocaleTypes.en,

      //current user phone and token
      phone: "",
      token: "",
      isReadPolicy: false,
      isRatePoped: false, //  未登录时显示
      isRepayReminderOn: false, // 未登录时显示
      //public parameters
      sign: "123dsabnwe",
      app: "alphacash",


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
          locale: newLocale,
        }));
      },
      setRatePoped: () => {
        const currentPhone = get().phone;
        const allUsersInfo = get().usersInfo;
        const currentUserInfo = allUsersInfo[currentPhone];
        currentUserInfo.isRatePoped = true;

        set((state) => ({
          ...state,
          usersInfo: {...allUsersInfo}
        }));
      },
      setRepayReminderOn: (isOn) => {
        const currentPhone = get().phone;
        const allUsersInfo = get().usersInfo;
        const currentUserInfo = allUsersInfo[currentPhone];
        currentUserInfo.isRepayReminderOn = isOn;

        set((state) => ({
          ...state,
          usersInfo: {...allUsersInfo}
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
        const allUsersInfo = get().usersInfo;
        const usersInfo_ =  merge({[phone]: cloneDeep(basicUserInfo)}, {...allUsersInfo});
        set((state) => ({
          ...state,
          phone,
          token,
          usersInfo: usersInfo_
        }));
      },

      //cardInfo functions
      setCardInfo: (newCardInfo) => {
        const currentPhone = get().phone;
        const allUsersInfo = get().usersInfo;
        const currentUserInfo = allUsersInfo[currentPhone];
        currentUserInfo.cardInfo = newCardInfo;
        set((state) => ({
          ...state,
          usersInfo: {...allUsersInfo}
        }));
      },
      cleanCardInfo: () => {
        const currentPhone = get().phone;
        const allUsersInfo = get().usersInfo;
        const currentUserInfo = allUsersInfo[currentPhone];
        currentUserInfo.cardInfo = {};

        set((state) => ({
          ...state,
          usersInfo: {...allUsersInfo}
        }));
      },
    }),
    {
      name: "system",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
