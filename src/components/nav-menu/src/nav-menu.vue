<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/logo.svg" alt="logo" />
      <span v-show="!collapse" class="title">vue3-bms</span>
    </div>
    <el-menu
      :default-active="1"
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="collapse"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in menus" :key="(item, id)">
        <template v-if="item.children && item.children.length">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <item-icon :icon="item.icon" />
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id + ''" @click="handleItemClick(item)">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ItemIcon from "./item-icon.vue";

export default defineComponent({
  components: {
    ItemIcon,
  },
  props: {
    collapse: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const history = useRouter();
    const menus = store.state.login.userMenus;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleItemClick = (item: any) => {
      history.push({
        path: item.url ?? "/not-found",
      });
    };
    return {
      menus,
      handleItemClick,
    };
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu-vertical {
    border: none;
  }
  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
  border: none;
}
</style>
