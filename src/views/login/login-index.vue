<template>
  <div class="login">
    <div class="background"></div>
    <h1>后台管理系统</h1>
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginPanel from "./cpns/login-panel.vue";

export default defineComponent({
  components: {
    LoginPanel,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: left bottom, right bottom;
    background-size: 750px, 750px;
    background-image: url("../../assets/left.svg"),
      url("../../assets/right.svg");
  }
}
</style>
