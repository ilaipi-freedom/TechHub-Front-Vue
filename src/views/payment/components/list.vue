<template>
  <a-spin :loading="loading" style="width: 100%">
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
      <template #name="{ record }">
        {{
          record.customer?.name ||
          record.customer?.weixin ||
          record.customer?.xianyu
        }}
      </template>
      <template #wechat="{ record }">
        <a-tooltip
          v-if="record.customer?.weixin"
          :content="record.customer.weixinId"
        >
          <a-button>{{ record.customer?.weixin }}</a-button>
        </a-tooltip>
      </template>
      <template #amount="{ record }">
        <a-statistic
          :value="Number(record.amount)"
          :precision="2"
          :value-style="{ color: '#0fbf60' }"
        />
      </template>
      <template #type="{ record }">
        {{ payMethodMap[record.payMethod]?.label }}
      </template>
    </a-table>
  </a-spin>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';

  import { CustomerPayment } from '@/api/customer/payment';
  import { SysDictData } from '@/api/sys-manage/sysDictData';
  import { Pagination } from '@/types/global';

  defineProps<{
    fetchData: () => Promise<void>;
    setLoading: (v: boolean) => void;
    onPageChange: (current: number) => void;
    pagination: Pagination;
    loading: boolean;
    renderData: CustomerPayment[];
    payMethodMap: Record<string, SysDictData>;
  }>();

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const size = ref<SizeProps>('medium');

  const columns = computed<TableColumnData[]>(() => [
    {
      title: '序号',
      dataIndex: 'index',
      slotName: 'index',
      width: 80,
    },
    {
      title: '类型',
      dataIndex: 'type',
      slotName: 'type',
    },
    {
      title: '客户',
      dataIndex: 'name',
      slotName: 'name',
    },
    {
      title: '客户微信',
      slotName: 'wechat',
    },
    {
      title: '金额',
      slotName: 'amount',
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
    },
    {
      title: '备注',
      dataIndex: 'extra',
      ellipsis: true,
      tooltip: { position: 'tr' },
      width: 200,
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
    name: 'CustomerPaymentListTable',
  };
</script>
