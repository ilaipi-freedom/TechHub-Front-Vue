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
    <template #idSlot="{ record }">
      <a-link @click="gotoDetail(record)">{{ record.id }}</a-link>
    </template>
    <template #weixin="{ record }">
      {{ renderAccount(record, 'weixin', 'Id') }}
    </template>
    <template #qq="{ record }">
      {{ renderAccount(record, 'qq', 'Num') }}
    </template>
    <template #firstMessageTime="{ record }">
      {{ dayjs(record.firstMessageTime).format('YYYY-MM-DD HH:mm') }}
    </template>
    <template #operations>
      <a-button v-permission="['admin']" type="text" size="small">
        {{ $t('searchTable.columns.operations.view') }}
      </a-button>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { CustomerParams, Customer } from '@/api/customer/list';
  import { Pagination } from '@/types/global';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import dayjs from 'dayjs';

  defineProps<{
    fetchData: (params: CustomerParams) => void;
    onPageChange: (current: number) => void;
    pagination: Pagination;
    loading: boolean;
    renderData: Customer[];
  }>();

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };
  const router = useRouter();

  const { t } = useI18n();
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const size = ref<SizeProps>('medium');

  const renderAccount = (
    record: Customer,
    key: keyof Customer,
    suffix: string
  ) => {
    const result: string[] = [];
    const v: string = record[key];
    if (v !== undefined && v !== '') {
      result.push(v);
    }
    const sk: keyof Customer = `${key}${suffix}` as keyof Customer;
    const idV: string = record[sk];
    if (idV !== undefined && idV !== null && idV !== '') {
      result.push(`(${idV})`);
    }
    if (result.length) {
      return result.join('');
    }
    return '-';
  };

  const gotoDetail = (record: Customer) => {
    router.push(`detail/${record.id}`);
  };

  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('customer.list.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
      width: 50,
    },
    {
      title: t('customer.list.columns.id'),
      dataIndex: 'id',
      slotName: 'idSlot',
      width: 150,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: t('customer.list.columns.weixin'),
      dataIndex: 'weixin',
      slotName: 'weixin',
    },
    {
      title: t('customer.list.columns.xianyu'),
      dataIndex: 'xianyu',
    },
    {
      title: t('customer.list.columns.qq'),
      dataIndex: 'qq',
      slotName: 'qq',
    },
    {
      title: t('customer.list.columns.firstMessageTime'),
      dataIndex: 'firstMessageTime',
      slotName: 'firstMessageTime',
    },
    {
      title: t('customer.list.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ]);

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
    name: 'CustomerListTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
