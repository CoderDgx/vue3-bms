<template>
  <div class="nav-header" @click="handleFoldClick">
    <i class="menu-icon">
      <el-icon v-if="isFold"><expand /></el-icon>
      <el-icon v-else><fold /></el-icon>
    </i>

    <!-- <div class="content">
      <bread-crumb></bread-crumb>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useMenuIcon from "../hooks/useMenuIconHooks";
// import BreadCrumb from "@/base-ui/breadcrumb";

export default defineComponent({
  // components: {
  //   BreadCrumb,
  // },
  emits: ["foldChange"],
  setup(props, ctx) {
    const [isFold, handleFoldClick] = useMenuIcon({ emit: ctx.emit });
    return {
      isFold,
      handleFoldClick,
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
