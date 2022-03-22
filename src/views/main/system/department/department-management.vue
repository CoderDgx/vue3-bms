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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";

import { usePageSearch } from "@/hooks/usePageSearch";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
  },
  setup() {
    const [pageContentRef, handleQueryClick, handleResetClick] =
      usePageSearch();
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
    };
  },
});
</script>

<style scoped></style>
