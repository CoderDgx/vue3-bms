/* eslint-disable @typescript-eslint/no-explicit-any */
import { App } from "vue";
import { utcToDateTimeFormat } from "@/utils/date-formt";

function registerGlobalProperties(app: App) {
  app.config.globalProperties.$filters = {
    showStatus(enable: any, pageName: string) {
      switch (pageName) {
        case "users":
          return enable ? "启用" : "禁用";
        case "goods":
          return enable ? "可用" : "下架";
      }
    },
    formatTime(value: string) {
      return utcToDateTimeFormat(value);
    },
  };
  app.config.globalProperties.form;
}

export default registerGlobalProperties;
