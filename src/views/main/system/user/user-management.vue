<template>
  <div class="user">
    <page-search
      :searchConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <page-content
      ref="pageContentRef"
      :contentConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigRef"
      :defaultInfo="modalInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { computed, defineComponent } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { FormItem } from "@/base-ui/form";

import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModal } from "@/hooks/usePageModal";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal,
  },

  setup() {
    const [pageContentRef, handleQueryClick, handleResetClick] =
      usePageSearch();

    // 配置信息
    const store = useStore();
    const modalConfigRef = computed(() => {
      const roleOption: FormItem | undefined = modalConfig.formItems?.find(
        (item) => item.field === "roleId"
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      roleOption!.options = store.state.entireRoles.map((item: any) => {
        return { label: item.name, value: item.id };
      });
      const departmentOption: FormItem | undefined =
        modalConfig.formItems?.find((item) => item.field === "departmentId");
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      departmentOption!.options = store.state.entireDepartments.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => {
          return { label: item.name, value: item.id };
        }
      );
      return modalConfig;
    });

    // modal handle
    const newHandleCallback = () => {
      const passwordItem = modalConfigRef.value.formItems?.find(
        (item) => item.field === "password"
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      passwordItem!.isHidden = false;
    };
    const editHandleCallback = () => {
      const passwordItem = modalConfigRef.value.formItems?.find(
        (item) => item.field === "password"
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      passwordItem!.isHidden = true;
    };

    // 处理的hook
    const [modalInfo, pageModalRef, handleNewData, handleEditData] =
      usePageModal(newHandleCallback, editHandleCallback);

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      handleQueryClick,
      handleResetClick,
      pageContentRef,
      pageModalRef,
      handleNewData,
      handleEditData,
      modalConfigRef,
      modalInfo,
    };
  },
});
</script>

<style scoped></style>
