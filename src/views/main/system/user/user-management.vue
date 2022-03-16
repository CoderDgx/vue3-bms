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
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
  },

  setup() {
    return { searchFormConfig, contentTableConfig };
  },
});
</script>

<style scoped></style>
