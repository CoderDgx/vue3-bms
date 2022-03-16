import { createStore } from "vuex";
import { RootState } from "./types";

import login from "./login/login";
import system from "./main/system/system";

const store = createStore<RootState>({
  state() {
    return {
      name: "",
      entireRoles: [],
      entireDepartments: [],
      entireMenus: [],
    };
  },
  mutations: {},
  actions: {},
  modules: { login, system },
});

export function setupStore() {
  store.dispatch("login/loadLocalStorage");
}

export default store;
