import { App } from "vue";
import registerElementIcons from "./regiter-element-icon";

//app.use 默认执行其中的函数并且传入app对象
export function globalRegister(app: App): void {
  app.use(registerElementIcons);
}
