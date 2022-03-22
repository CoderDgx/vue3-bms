/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { useStore } from "vuex";

export function usePermission(pageName: string, handle: string) {
  const store = useStore();
  const permissions = store.state.login.permissions;
  const handlePermission = `${pageName}:${handle}`;
  return !!permissions.find((item: any) => item.indexOf(handlePermission) !== -1);
}
