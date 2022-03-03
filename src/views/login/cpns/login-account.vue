<template>
  <el-form
    :model="account"
    label-width="60px"
    ref="formref"
    :rules="accountRules"
  >
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Account } from "../types";
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<Account>,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const account = computed({
      get: () => props.modelValue,
      set: (newValue) => emit("update:modelValue", newValue),
    });
    const accountRules = {
      name: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        {
          pattern: /^[a-z0-9]{6,20}$/,
          message: "正确的用户名由6~20个数字或字母组成",
          trigger: "blur",
        },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: "正确的密码由3位以上数字组成",
          trigger: "blur",
        },
      ],
    };
    return {
      account,
      accountRules,
    };
  },
});
</script>

<style scoped lang="less"></style>
