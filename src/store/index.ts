import { createStore } from "vuex";
import { RootState } from "./types";

import login from "./login/login";

export default createStore<RootState>({
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
