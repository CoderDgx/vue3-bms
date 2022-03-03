<template>
  <div class="login-panel">
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <div class="title">
            <el-icon><avatar /></el-icon>账号登录
          </div>
        </template>
        <login-account v-model="account" ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <div class="title">
            <el-icon><phone-filled /></el-icon>手机登录
          </div>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="other-option">
      <el-checkbox v-model="isKeep">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" @click="loginAction" class="login-btn"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";
import LocalStorage from "@/utils/storage";

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone,
  },
  setup() {
    const currentTab = ref("account");
    const isKeep = ref(true);
    const user = LocalStorage.getValue("name") ?? "";
    const account = reactive({
      name: user.name,
      password: user.password,
    });
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const loginAction = () => {
      if (currentTab.value === "account") {
        accountRef.value?.accountLoginAction(isKeep.value);
      }
    };
    return {
      currentTab,
      account,
      isKeep,
      loginAction,
      accountRef,
    };
  },
});
</script>

<style scoped lang="less">
.login-panel {
  width: 400px;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.other-option {
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
}
</style>
