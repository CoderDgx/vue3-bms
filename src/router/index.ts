import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import localStorage from "@/utils/storage";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login-index.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main-index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localStorage.getValue("token");
    if (!token) {
      return "/login";
    }
  }
});

export default router;
