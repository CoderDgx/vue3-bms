import type { App } from "vue";

import {
  Avatar,
  PhoneFilled,
  Expand,
  Fold,
  Monitor,
  Setting,
  Goods,
  ChatDotRound,
  CircleCloseFilled,
  Unlock,
  Bell,
  Postcard,
  Search,
  RefreshRight,
} from "@element-plus/icons-vue";

export const icons = [
  Avatar,
  PhoneFilled,
  Expand,
  Fold,
  Monitor,
  Setting,
  Goods,
  ChatDotRound,
  CircleCloseFilled,
  Unlock,
  Bell,
  Postcard,
  Search,
  RefreshRight,
];

//按需导出图标组件
export default function (app: App): void {
  for (const icon of icons) {
    app.component(icon.name, icon);
  }
}
