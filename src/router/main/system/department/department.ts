const department = () =>
  import("@/views/main/system/department/department-management.vue");
export default {
  path: "/main/system/department",
  name: "department",
  component: department,
  children: [],
};
