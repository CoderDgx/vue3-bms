<template>
  <div class="department">
    <page-search :searchConfig="searchFormConfig" />
    <page-content
      pageName="department"
      ref="pageContentRef"
      :contentConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="modalInfo"
      :modalConfig="modalConfigRef"
      pageName="department"
    ></page-modal>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { computed, defineComponent } from "vue";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";

import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModal } from "@/hooks/usePageModal";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";
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

    // modal配置信息
    const store = useStore();
    const modalConfigRef = computed(() => {
      const parentIdItem = modalConfig.formItems?.find(
        (item) => item.field === "parentId"
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      parentIdItem!.options = store.state.entireDepartments.map((item: any) => {
        return { label: item.name, value: item.id };
      });
      return modalConfig;
    });

    // 处理modal的hook
    const [modalInfo, pageModalRef, handleNewData, handleEditData] =
      usePageModal();

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      modalConfigRef,
      modalInfo,
      pageModalRef,
      handleNewData,
      handleEditData,
    };
  },
});
</script>

<style scoped></style>
