/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from "vuex";
import { SystemState, PagePayload } from "./types";
import { RootState } from "../../types";

import { getPageList } from "@/service/main/system";

const systemModule: Module<SystemState, RootState> = {
  namespaced: true,
  state() {
    return {
      usersTotalCount: 0,
      usersList: [],
      departmentTotalCount: 0,
      departmentList: [],
      roleTotalCount: 0,
      roleList: [],
      menuList: [],
      categoryTotalCount: 0,
      categoryList: [],
      goodsTotalCount: 0,
      goodsList: [],
      storyTotalCount: 0,
      storyList: [],
    };
  },
  mutations: {
    changeUsersTotalCount(state, totalCount: number) {
      state.usersTotalCount = totalCount;
    },
    changeUsersList(state, userList: any) {
      state.usersList = userList;
    },
    changeGoodsTotalCount(state, totalCount: number) {
      state.goodsTotalCount = totalCount;
    },
    changeGoodsList(state, goodsList: any) {
      state.goodsList = goodsList;
    },
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        const listData: any[] = (state as any)[`${pageName}List`] ?? [];
        return listData;
      };
    },
    pageListDataCount(state) {
      return (pageName: string) => {
        const listCount = (state as any)[`${pageName}TotalCount`] ?? 0;
        return listCount;
      };
    },
  },
  actions: {
    async getPageListDataAction({ commit }, payload: PagePayload) {
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;
      if (pageUrl.length === 0) return;
      const { totalCount, list } = await getPageList(
        pageUrl,
        payload.queryInfo
      );
      console.log(totalCount);
      switch (payload.pageName) {
        case "users":
          commit("changeUsersTotalCount", totalCount);
          commit("changeUsersList", list);
          break;
        case "goods":
          commit("changeGoodsTotalCount", totalCount);
          commit("changeGoodsList", list);
          break;
      }
    },
  },
};

export default systemModule;
