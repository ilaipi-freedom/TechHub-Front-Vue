<template>
  <a-card>
    <template #title>订单信息</template>
    <template #extra>
      <a-button type="primary" @click="add">添加</a-button>
    </template>
    <a-grid :row-gap="15">
      <a-grid-item v-if="!!addingOrder" class="list-col" :span="24">
        <CustomerDetailOrderForm :cancel="removeAdding" :refresh="initOrders" />
      </a-grid-item>
      <a-grid-item
        v-for="item in orders"
        :key="item.id"
        class="list-col"
        :span="24"
      >
        <a-descriptions
          :data="transformOrder(item)"
          layout="inline-vertical"
          bordered
        />
      </a-grid-item>
    </a-grid>
  </a-card>
</template>

<script lang="ts" setup>
  import { h, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import dayjs from 'dayjs';

  import useLoading from '@/hooks/loading';
  import { CustomerOrder, queryCustomerOrderList } from '@/api/customer/order';
  import { getOrderStatusName } from '@/types/OrderType';

  import CustomerDetailOrderForm from './form.vue';

  const route = useRoute();
  const customerId = ref<string>(route.params.id as string);

  const { setLoading } = useLoading();
  const orders = ref<Partial<CustomerOrder>[]>([]);
  const addingOrder = ref<Partial<CustomerOrder>>();
  const initOrders = async () => {
    if (!customerId.value) {
      return;
    }
    setLoading(true);
    const { data } = await queryCustomerOrderList(customerId.value);
    orders.value = data;
    setLoading(false);
  };
  initOrders();
  const fieldsMap = [
    {
      field: 'id',
      label: '订单id',
    },
    {
      field: 'firstMessageTime',
      label: '首聊时间',
      format: (v: string) => (v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-'),
    },
    {
      field: 'orderTime',
      label: '接单时间',
      format: (v: string) => (v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-'),
    },
    {
      field: 'deliveryTime',
      label: '交付时间',
      format: (v: string) => (v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-'),
    },
    {
      field: 'from',
      label: '来源',
    },
    {
      field: 'status',
      label: '状态',
      format: (v) => getOrderStatusName(v),
    },
    {
      field: 'content',
      label: '工作内容',
      format: (v) => () => renderOrderText(v),
    },
    {
      field: 'detail',
      label: '工作详情',
      format: (v) => () => renderOrderText(v),
    },
    {
      field: 'extra',
      label: '工作备注',
      format: (v) => () => renderOrderText(v),
    },
    {
      field: 'industry',
      label: '行业类型',
      format: (v) => () => renderOrderText(v),
    },
    {
      field: 'industryDetail',
      label: '行业详情',
      format: (v) => () => renderOrderText(v),
    },
  ];

  const renderOrderText = (itemContent: string) =>
    h('div', { class: 'multiline-text-container' }, [
      h('pre', { class: 'multiline-text' }, itemContent),
    ]);

  const transformOrder = (order: CustomerOrder) =>
    fieldsMap.map(({ label, field, format }) => ({
      label,
      value: format ? format(order[field]) : order[field],
    }));

  const add = () => {
    addingOrder.value = {};
  };
  const removeAdding = () => {
    addingOrder.value = undefined;
  };
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetailOrder',
  };
</script>

<style scoped lang="less">
  .multiline-text-container {
    width: 100%;
    .multiline-text {
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }
  }
</style>
