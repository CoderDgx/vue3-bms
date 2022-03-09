/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { RouteRecordRaw } from "vue-router";

let firstMenu: any = undefined;
let firstRoute: RouteRecordRaw | undefined = undefined;

export function menuMapToRoutes(userMenus: any[]) {
  const routes: RouteRecordRaw[] = [];

  const localRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context("../router/main", true, /\.ts/);
  routeFiles.keys().forEach((key) => {
    if (key.indexOf("./main.ts") !== -1) return;
    const route = require("../router/main" + key.split(".")[1]);
    localRoutes.push(route.default);
  });

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = localRoutes.find((route) => route.path === menu.url);
        if (route) routes.push(route);
        if (!firstRoute && !firstMenu) {
          firstMenu = menu;
          firstRoute = route;
        }
      } else {
        _recurseGetRoute(menu.children ?? []);
      }
    }
  };

  _recurseGetRoute(userMenus);

  return routes;
}

export { firstMenu, firstRoute };
