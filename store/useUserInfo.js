import { create } from "zustand";

export const basicInfo = {
  name: "",
  phone: "",
  token: "",
};

export const useUserInfo = create((set, get) => ({
  basicInfo: basicInfo,
  isLogin: false,
  setBasicInfo: (newInfo) => {
    set((state) => ({
      ...state,
      basicInfo: newInfo,
    }));
  },
  setLogin: (isLogin) => {
    set((state) => ({
      ...state,
      isLogin: isLogin,
    }));
  },
  login: (status) => {
    // TODO call login API
    set((state) => ({
      ...state,
      isLogin: status,
    }));
  },
}));
