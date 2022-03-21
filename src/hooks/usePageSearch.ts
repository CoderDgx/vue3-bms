/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from "vue";
import PageContent from "@/components/page-content";

export const usePageSearch = () => {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo);
  };
  const handleResetClick = () => {
    pageContentRef.value?.getPageData();
  };

  return [pageContentRef, handleQueryClick, handleResetClick];
};
