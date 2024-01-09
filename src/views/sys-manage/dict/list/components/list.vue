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
    <template #status="{ record }">
      {{ availableStatusMap[record.status].label }}
    </template>
    <template #category="{ record }">
      {{ sysDictCategoryMap[record.category].label }}
    </template>
    <template #operations="{ record }">
      <a-button
        type="primary"
        status="warning"
        @click="() => handleEdit(record.id)"
      >
        编辑
      </a-button>
    </template>
  </a-table>
  <SysDictDetail :fetch-data="fetchData" />
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import { keyBy } from 'lodash';

  import { SysDict } from '@/api/sys-manage/sysDict';
  import { Pagination } from '@/types/global';
  import { AvailableStatus, SysDictCategory } from '@/config/common';
  import useSysDictDetailStore from '@/store/modules/sys-manage/sysDict/detail';

  import SysDictDetail from './detail.vue';

  defineProps<{
    fetchData: () => Promise<void>;
    onPageChange: (current: number) => void;
    pagination: Pagination;
    loading: boolean;
    renderData: SysDict[];
  }>();

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const sysDictDetailStore = useSysDictDetailStore();

  const size = ref<SizeProps>('medium');
  const availableStatusMap = keyBy(AvailableStatus, 'value');
  const sysDictCategoryMap = keyBy(SysDictCategory, 'value');

  const columns = computed<TableColumnData[]>(() => [
    {
      title: '序号',
      dataIndex: 'index',
      slotName: 'index',
      width: 80,
    },
    {
      title: '字典名称',
      dataIndex: 'name',
    },
    {
      title: '类型（唯一）',
      dataIndex: 'type',
    },
    {
      title: '状态',
      dataIndex: 'status',
      slotName: 'status',
    },
    {
      title: '渲染类型',
      dataIndex: 'category',
      slotName: 'category',
    },
    {
      title: '操作',
      slotName: 'operations',
    },
  ]);

  const handleEdit = (id: string) => {
    sysDictDetailStore.$patch({ id, visible: true });
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
    name: 'SysDictListTable',
  };
</script>
