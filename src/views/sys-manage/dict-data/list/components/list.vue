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
    <template #sysDict="{ record }">
      <a-tooltip :content="record.type">
        <a-tag size="large" color="arcoblue">{{ record.sysDict?.name }}</a-tag>
      </a-tooltip>
    </template>
    <template #status="{ record }">
      {{ availableStatusMap[record.status].label }}
    </template>
    <template #company="{ record }">
      {{ record.company?.shortName || '-' }}
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
  <SysDictDataDetail :fetch-data="fetchData" />
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import { keyBy } from 'lodash';

  import { SysDictData } from '@/api/sys-manage/sysDictData';
  import { Pagination } from '@/types/global';
  import { AvailableStatus } from '@/config/common';
  import useSysDictDataDetailStore from '@/store/modules/sys-manage/sysDictData/detail';

  import SysDictDataDetail from './detail.vue';

  defineProps<{
    fetchData: () => Promise<void>;
    onPageChange: (current: number) => void;
    pagination: Pagination;
    loading: boolean;
    renderData: SysDictData[];
  }>();

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const sysDictDataDetailStore = useSysDictDataDetailStore();

  const size = ref<SizeProps>('medium');
  const availableStatusMap = keyBy(AvailableStatus, 'value');

  const columns = computed<TableColumnData[]>(() => [
    {
      title: '序号',
      dataIndex: 'index',
      slotName: 'index',
      width: 80,
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      align: 'center',
      slotName: 'sysDict',
    },
    {
      title: '数据名称',
      dataIndex: 'label',
    },
    {
      title: '数据值',
      dataIndex: 'value',
    },
    {
      title: '状态',
      dataIndex: 'status',
      slotName: 'status',
    },
    {
      title: '顺序',
      dataIndex: 'sort',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      slotName: 'operations',
    },
  ]);

  const handleEdit = (id: string) => {
    sysDictDataDetailStore.$patch({ id, visible: true });
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
    name: 'SysDictDataListTable',
  };
</script>
