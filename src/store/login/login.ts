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
import { menuMapToRoutes } from "@/utils/map-menus";
import { RouteRecordRaw } from "vue-router";

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

      // 根据菜单映射路由
      const routes = menuMapToRoutes(userMenus);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
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
    loadLocalStorage({ commit }) {
      const token = localStorage.getValue("token");
      if (token) {
        commit("saveToken", token);
        // dispatch("getInitalDataAction", null, { root: true });
      }
      const userInfo = localStorage.getValue("userInfo");
      if (userInfo) {
        commit("saveUserInfo", userInfo);
      }
      const userMenus = localStorage.getValue("userMenus");
      if (userMenus) {
        commit("saveUserMenus", userMenus);
      }
    },
  },
};

export default login;
