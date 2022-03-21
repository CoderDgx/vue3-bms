<template>
  <div>
    <Form v-bind="searchConfig" v-model="formData">
      <template #footer>
        <div class="btns">
          <el-button size="medium" @click="handleResetClick"
            ><el-icon class="icon" size="medium"><refresh-right /></el-icon
            >重置</el-button
          >
          <el-button size="medium" type="primary" @click="handleQueryClick">
            <el-icon class="icon" size="medium"><search /></el-icon
            >查询</el-button
          >
        </div>
      </template>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Form, { FormTypes } from "@/base-ui/form";

interface IFormData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default defineComponent({
  components: {
    Form,
  },
  props: {
    searchConfig: {
      type: Object as PropType<FormTypes>,
      required: true,
    },
    title: {
      type: String,
      default: "高级检索",
    },
  },
  emits: ["queryBtnClick", "resetBtnClick"],
  setup(props, { emit }) {
    const originFormData: IFormData = {};
    const formItems = props.searchConfig.formItems ?? [];
    for (const formItem of formItems) {
      originFormData[`${formItem.field}`] = "";
    }
    const formData = ref<IFormData>({ ...originFormData });
    const handleResetClick = () => {
      for (const key in originFormData) {
        formData.value[`${key}`] = originFormData[key];
      }
      emit("resetBtnClick");
    };
    const handleQueryClick = () => {
      emit("queryBtnClick", formData.value);
    };
    return { formData, handleResetClick, handleQueryClick };
  },
});
</script>

<style scoped lang="less">
.icon {
  margin-right: 3px;
}

.title {
  padding-left: 30px;
  text-align: left;
}

.btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
