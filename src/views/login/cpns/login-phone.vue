<template>
  <el-form :model="account" ref="formref" :rules="accountRulesPhone">
    <el-form-item label="手机号" prop="phoneNumber">
      <el-input v-model="account.phoneNumber" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="verify-code">
        <el-input v-model="account.code" />
        <el-button class="get-btn" type="primary">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const account = reactive({
      phoneNumber: "",
      code: "",
    });
    const accountRulesPhone = {
      phoneNumber: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: "请输入正确的手机号",
          trigger: "blur",
        },
      ],
      code: [
        { required: true, message: "请输入验证码", trigger: "blur" },
        {
          pattern: /^[0-9]\d{4}$/,
          message: "请输入正确的验证码",
          trigger: "blur",
        },
      ],
    };
    return {
      account,
      accountRulesPhone,
    };
  },
});
</script>

<style scoped lang="less">
.verify-code {
  display: flex;

  .get-btn {
    margin-left: 8px;
  }
}
</style>
