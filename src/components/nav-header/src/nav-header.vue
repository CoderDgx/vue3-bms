<template>
  <div class="nav-header">
    <i class="menu-icon" @click="handleFoldClick">
      <el-icon v-if="isFold"><expand /></el-icon>
      <el-icon v-else><fold /></el-icon>
    </i>

    <div class="content">
      <bread-crumb :breadcrumbs="breadcrumbs" />
      <nav-info />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import useMenuIcon from "../hooks/useMenuIconHooks";
import BreadCrumb from "@/base-ui/breadcrumb";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import NavInfo from "./nav-info.vue";

export default defineComponent({
  components: {
    BreadCrumb,
    NavInfo,
  },
  emits: ["foldChange"],
  setup(props, ctx) {
    const [isFold, handleFoldClick] = useMenuIcon({ emit: ctx.emit });

    // 2.获取菜单列表
    const breadcrumbs = computed(() => {
      const path = useRoute().path;
      const userMenus = useStore().state.login.userMenus;
      return pathMapBreadcrumbs(userMenus, path);
    });
    return {
      isFold,
      handleFoldClick,
      breadcrumbs,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;

  .menu-icon {
    font-size: 28px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
