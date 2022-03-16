<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    return {
      zhCn,
    };
  },
});
</script>

<style lang="less"></style>
