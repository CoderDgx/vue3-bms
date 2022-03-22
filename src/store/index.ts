import { createStore } from "vuex";
import { RootState } from "./types";

import login from "./login/login";
import system from "./main/system/system";
import { getPageList } from "@/service/main/system";

const store = createStore<RootState>({
  state() {
    return {
      name: "",
      entireRoles: [],
      entireDepartments: [],
      entireMenus: [],
    };
  },
  mutations: {
    changeEntireRoles(state, entireRoles) {
      state.entireRoles = entireRoles;
    },
    changeEntireDepartments(state, entireDepartments) {
      state.entireDepartments = entireDepartments;
    },
    changeEntireMenus(state, entireMenus) {
      state.entireMenus = entireMenus;
    },
  },
  actions: {
    async getInitalDataAction({ commit }) {
      const { list: entireRoles } = await getPageList("/role/list", {
        offset: 0,
        size: 100,
      });
      const { list: entireDepartments } = await getPageList(
        "/department/list",
        {
          offset: 0,
          size: 100,
        }
      );
      const { list: entireMenus } = await getPageList("/menu/list", {});
      commit("changeEntireRoles", entireRoles);
      commit("changeEntireDepartments", entireDepartments);
      commit("changeEntireMenus", entireMenus);
    },
  },
  modules: { login, system },
});

export function setupStore() {
  store.dispatch("login/loadLocalStorage");
}

export default store;
