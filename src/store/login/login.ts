/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from "vuex";
import { LoginState } from "./types";
import { RootState } from "../types";

const login: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: {},
      permissions: [],
    };
  },
  getters: {},
  mutations: {
    saveToken(state, token: string) {
      state.token = token;
    },
    saveUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    accountLoginAction({ commit }, payload: any) {
      console.log("login", payload);
    },
  },
};

export default login;
