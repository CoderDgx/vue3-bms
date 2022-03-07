<template>
  <div class="login">
    <div class="login-panel">
      <h1>后台管理系统</h1>
      <login-panel />
    </div>
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
  justify-content: center;
  min-height: 100vh;
  background: url("../../assets/login-bg.svg");

  .login-panel {
    text-align: center;
    margin-top: 70px;
  }
}
</style>
