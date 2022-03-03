import type { App } from "vue";

import { Avatar, PhoneFilled } from "@element-plus/icons-vue";

export const icons = [Avatar, PhoneFilled];

//按需导出图标组件
export default function (app: App): void {
  for (const icon of icons) {
    app.component(icon.name, icon);
  }
}
