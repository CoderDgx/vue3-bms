<template>
  <el-form
    :model="account"
    label-width="80px"
    ref="formRef"
    :rules="accountRules"
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from "vue";
import { Account } from "../types";
import { ElForm, ElMessage } from "element-plus";
import LocalStorage from "@/utils/storage";

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<Account>,
      default: () => ({}),
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
          pattern: /^[A-Za-z0-9]{3,20}$/,
          message: "正确的用户名由3~20个数字或字母组成",
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

    // 验证form
    const formRef = ref<InstanceType<typeof ElForm>>();
    const accountLoginAction = (isKeep: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          const name = account.value.name;
          const password = account.value.password;

          if (isKeep) {
            LocalStorage.setValue("name", { name, password });
          } else {
            LocalStorage.setValue("name", { name, password: "" });
          }
        } else {
          ElMessage.error("账号或者密码错误~");
        }
      });
    };
    return {
      account,
      accountRules,
      formRef,
      accountLoginAction,
    };
  },
});
</script>

<style scoped lang="less"></style>
