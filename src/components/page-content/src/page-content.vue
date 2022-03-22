<template>
  <div class="page-content">
    <Table
      :totalCount="totalCount"
      :listData="pageListData"
      v-bind="contentConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" @click="handleNewData">
          {{ contentConfig.newBtnTitle ?? "新建数据" }}
        </el-button>
      </template>

      <template #status="scope">
        <el-button
          :type="statusCode(scope.row, pageName) ? 'success' : 'danger'"
          size="small"
          plain
        >
          {{ $filters.showStatus(statusCode(scope.row, pageName), pageName) }}
        </el-button>
      </template>
      <template #create="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #update="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #handler="scope">
        <div class="handler">
          <el-button
            v-if="isUpdate"
            type="text"
            size="small"
            @click="handleEditClick(scope.row)"
          >
            <el-icon><edit /></el-icon>
            编辑
          </el-button>
          <el-button
            v-if="isDelete"
            type="text"
            size="small"
            style="color: red"
            @click="handleDeleteClick(scope.row)"
          >
            <el-icon><delete /></el-icon>
            删除
          </el-button>
        </div>
      </template>
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

import { usePermission } from "@/hooks/usePermission";

import Table from "@/base-ui/table";

export default defineComponent({
  components: {
    Table,
  },
  props: {
    contentConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isCreate = usePermission(props.pageName, "create");
    const isDelete = usePermission(props.pageName, "delete");
    const isUpdate = usePermission(props.pageName, "update");
    const isQuery = usePermission(props.pageName, "query");
    // 1.请求页面数据
    const store = useStore();

    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10,
    });
    watch(pageInfo, () => getPageData());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statusCode = (rowItem: any, pageName: string) => {
      switch (pageName) {
        case "users":
          return rowItem.enable;
        case "goods":
          return rowItem.status;
      }
    };
    let otherQueryInfo = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getPageData = (otherInfo: any = {}) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      otherQueryInfo = otherInfo;
      store.dispatch("system/getPageListDataAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...otherInfo,
        },
      });
    };
    getPageData();

    // 2.获取页面数据
    const pageListData = computed(() =>
      store.getters["system/pageListData"](props.pageName)
    );
    // 3.footer
    const totalCount = computed(() =>
      store.getters["system/pageListDataCount"](props.pageName)
    );

    // 4.剩余需要的插槽
    const otherPropSlots = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return props.contentConfig.propList.filter((item: any) => {
        if (item.slotName === "status") return false;
        else if (item.slotName === "create") return false;
        else if (item.slotName === "update") return false;
        else if (item.slotName === "handler") return false;
        return true;
      });
    });

    // 5.删除操作
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDeleteClick = (rowItem: any) => {
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...otherQueryInfo,
        },
        id: rowItem.id,
      });
    };

    // 6.新建数据
    const handleNewData = () => {
      emit("newBtnClick");
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEditClick = (item: any) => {
      emit("editBtnClick", item);
    };

    return {
      pageInfo,
      pageListData,
      totalCount,
      getPageData,
      otherPropSlots,
      statusCode,
      isDelete,
      isUpdate,
      isCreate,
      isQuery,
      handleDeleteClick,
      handleEditClick,
      handleNewData,
    };
  },
});
</script>

<style scoped>
.page-content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
</style>
