/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AxiosRequest from "./request";
import localStorage from "@/utils/storage";

const request = new AxiosRequest({
  baseURL: "/api",
  timeout: 10000,
  interceptorHooks: {
    requestInterceptor: (config) => {
      const token = localStorage.getValue("token");
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

export default request;
