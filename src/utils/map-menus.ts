/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { RouteRecordRaw } from "vue-router";
import { Breadcrumb } from "@/base-ui/breadcrumb/types";

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

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: Breadcrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: Breadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name, path: "/" });
        breadcrumbs?.push({ name: findMenu.name, path: "/" });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

// 根据菜单获取所有的按钮权限
export function menuMapToPermissions(userMenus: any[]) {
  const permissions: string[] = [];

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };
  _recurseGetPermission(userMenus);

  return permissions;
}

export function getMenuChecks(menuList: any[]): number[] {
  const checks: number[] = [];
  const _recurseGetChecked = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetChecked(menu.children);
      } else {
        checks.push(menu.id);
      }
    }
  };
  _recurseGetChecked(menuList);
  return checks;
}

export { firstMenu, firstRoute };
