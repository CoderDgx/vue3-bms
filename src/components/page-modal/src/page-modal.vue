<template>
  <div class="page-modal">
    <el-dialog
      :title="modalConfig.title"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <Form v-bind="modalConfig" v-model="formData"></Form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import { useStore } from "vuex";

import Form from "@/base-ui/form";

export default defineComponent({
  components: {
    Form,
  },
  props: {
    modalConfig: {
      type: Object,
      required: true,
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // 1.绑定属性
    const store = useStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originFormData: any = {};
    const formData = ref({ ...originFormData });

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );

    // 2.内部处理
    const dialogVisible = ref(false);
    const handleConfirmClick = () => {
      dialogVisible.value = false;
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          queryInfo: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id,
        });
      } else {
        // 新建
        store.dispatch("system/newPageDataAction", {
          pageName: props.pageName,
          queryInfo: { ...formData.value, ...props.otherInfo },
        });
      }
    };

    return {
      formData,
      dialogVisible,
      handleConfirmClick,
    };
  },
});
</script>

<style scoped></style>
