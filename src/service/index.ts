/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AxiosRequest from "./request";
import { API_BASE_URL, TIME_OUT } from "./request/config";
import localCache from "@/utils/cache";

const Request = new AxiosRequest({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT,
  interceptorHooks: {
    requestInterceptor: (config) => {
      const token = localCache.getCache("token");
      if (token) {
        config!.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res.data;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});

export default Request;
