import request from "../index";

import { Account, LoginInfo } from "./types";

enum LoginApi {
  AccountLogin = "/login",
  UserInfo = "/users/",
  UserMenus = "/role/",
}

export function accountLoginRequest(account: Account) {
  return request.post<LoginInfo>({
    url: LoginApi.AccountLogin,
    data: account,
  });
}

export function getUserById(id: number) {
  return request.get({
    url: LoginApi.UserInfo + id,
  });
}

export function getUserMenus(id: number) {
  return request.get({
    url: LoginApi.UserMenus + id + "/menu",
  });
}
