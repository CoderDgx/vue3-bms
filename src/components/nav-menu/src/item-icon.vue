<template>
  <i>
    <el-icon v-if="iconName == 'monitor'"><monitor /></el-icon>
    <el-icon v-else-if="iconName == 'setting'"><setting /></el-icon>
    <el-icon v-else-if="iconName == 'goods'"><goods /></el-icon>
    <el-icon v-else-if="iconName == 'round'"><chat-dot-round /></el-icon>
  </i>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props) {
    const iconName = props.icon.split("-").slice(-1)[0];
    return {
      iconName,
    };
  },
});
</script>

<style scoped lang="less"></style>
