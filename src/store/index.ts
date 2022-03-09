import { createStore } from "vuex";
import { RootState } from "./types";

import login from "./login/login";

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
  modules: { login },
});

export function setupStore() {
  store.dispatch("login/loadLocalStorage");
}

export default store;
