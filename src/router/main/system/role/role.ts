const role = () => import("@/views/main/system/role/role-management.vue");
export default {
  path: "/main/system/role",
  name: "role",
  component: role,
  children: [],
};
