/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from "vuex";
import { LoginState } from "./types";
import { RootState } from "../types";
import {
  accountLoginRequest,
  getUserById,
  getUserMenus,
} from "@/service/login";
import localStorage from "@/utils/storage";
import router from "@/router";

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
    saveUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
    },
  },
  actions: {
    async accountLoginAction(
      { commit },
      account: { name: string; password: string }
    ) {
      // 用户登录
      const loginResult = await accountLoginRequest(account);
      const { id, token } = loginResult;
      commit("saveToken", token);
      localStorage.setValue("token", token);

      // 用户信息
      const userInfo = await getUserById(id);
      commit("saveUserInfo", userInfo);
      localStorage.setValue("userInfo", userInfo);

      // 用户菜单
      const userMenus = await getUserMenus(userInfo.role.id);
      commit("saveUserMenus", userMenus);
      localStorage.setValue("userMenus", userMenus);

      router.push("/main");
    },
  },
};

export default login;
