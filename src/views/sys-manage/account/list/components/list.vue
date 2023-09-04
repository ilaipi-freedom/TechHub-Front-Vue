<template>
  <a-table
    row-key="id"
    :loading="loading"
    :pagination="pagination"
    :columns="(cloneColumns as TableColumnData[])"
    :data="renderData"
    :bordered="false"
    :size="size"
    @page-change="onPageChange"
  >
    <template #index="{ rowIndex }">
      {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
    </template>
    <template #operations="{ record }">
      <a-space size="small">
        <a-button
          type="primary"
          status="warning"
          @click="() => handleEdit(record.id)"
        >
          编辑
        </a-button>
        <a-button
          type="text"
          status="warning"
          @click="() => handleReset(record.id)"
        >
          重置密码
        </a-button>
      </a-space>
    </template>
  </a-table>
  <AccountDetail :fetch-data="fetchData" />
  <AccountReset />
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';

  import { Account } from '@/api/sys-manage/account';
  import { Pagination } from '@/types/global';
  import { useAccountDetailStore, useAccountResetStore } from '@/store/';

  import AccountDetail from './detail.vue';
  import AccountReset from './reset.vue';

  defineProps<{
    fetchData: () => Promise<void>;
    onPageChange: (current: number) => void;
    pagination: Pagination;
    loading: boolean;
    renderData: Account[];
  }>();

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const accountDetailStore = useAccountDetailStore();
  const resetStore = useAccountResetStore();

  const size = ref<SizeProps>('medium');

  const columns = computed<TableColumnData[]>(() => [
    {
      title: '序号',
      dataIndex: 'index',
      slotName: 'index',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '角色',
      dataIndex: 'role.name',
    },
    {
      title: '操作',
      slotName: 'operations',
    },
  ]);

  const handleEdit = (id: string) => {
    accountDetailStore.$patch({ id, visible: true });
  };

  const handleReset = (id: string) => {
    resetStore.$patch({ id, visible: true });
  };

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<script lang="ts">
  export default {
    name: 'AccountListTable',
  };
</script>
