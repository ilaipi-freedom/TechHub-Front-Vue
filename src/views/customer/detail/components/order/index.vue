<template>
  <a-card>
    <template #title>订单信息</template>
    <template #extra>
      <a-button v-if="!addingOrder" type="primary" @click="add">添加</a-button>
    </template>
    <a-grid :row-gap="15">
      <a-grid-item v-if="!!addingOrder" class="list-col" :span="24">
        <CustomerDetailOrderForm :cancel="removeAdding" :refresh="initOrders" />
      </a-grid-item>
      <a-grid-item
        v-for="(item, index) in orders"
        :key="item.id"
        class="list-col"
        :span="24"
      >
        <a-card v-if="editingId !== item.id" :bordered="false">
          <template #title>订单次数：{{ orders.length - index }}</template>
          <template #extra>
            <a-link type="primary" @click="() => edit(item.id as string)">
              编辑
            </a-link>
          </template>
          <a-descriptions
            :data="transformOrder(item as CustomerOrder)"
            layout="inline-vertical"
            bordered
            :column="2"
          />
        </a-card>
        <CustomerDetailOrderForm
          v-if="editingId === item.id"
          :order="item as CustomerOrder"
          :cancel="cancelEdit"
          :refresh="initOrders"
        />
      </a-grid-item>
    </a-grid>
  </a-card>
</template>

<script lang="ts" setup>
  import { h, ref, RenderFunction } from 'vue';
  import { useRoute } from 'vue-router';
  import dayjs from 'dayjs';
  import { DescData } from '@arco-design/web-vue';

  import useLoading from '@/hooks/loading';
  import { CustomerOrder, queryCustomerOrderList } from '@/api/customer/order';
  import { getOrderStatusName } from '@/types/OrderType';

  import CustomerDetailOrderForm from './form.vue';

  const route = useRoute();
  const customerId = ref<string>(route.params.id as string);
  const editingId = ref<string>();

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
  const fieldsMap: {
    field: string;
    label: string;
    format?: (v: string) => string | RenderFunction;
  }[] = [
    {
      field: 'id',
      label: '订单id',
      format:
        (v: string): RenderFunction =>
        () =>
          renderId(v),
    },
    {
      field: 'firstMessageTime',
      label: '首聊时间',
      format: (v: string): string =>
        v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-',
    },
    {
      field: 'orderTime',
      label: '接单时间',
      format: (v: string): string =>
        v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-',
    },
    {
      field: 'deliveryTime',
      label: '交付时间',
      format: (v: string): string =>
        v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-',
    },
    {
      field: 'from',
      label: '来源',
    },
    {
      field: 'status',
      label: '状态',
      format: (v: string) => getOrderStatusName(v),
    },
    {
      field: 'industry',
      label: '行业类型',
      format: (v: string) => () => renderOrderText(v),
    },
    {
      field: 'industryDetail',
      label: '行业详情',
      format: (v: string) => () => renderOrderText(v),
    },
    {
      field: 'content',
      label: '工作内容',
      format: (v: string) => () => renderOrderText(v),
    },
    {
      field: 'repo',
      label: '仓库地址',
      format: (v: string) => () =>
        v ? h('a', { href: v, target: '_blank' }, v) : '-',
    },
    {
      field: 'detail',
      label: '工作详情',
      format: (v: string) => () => renderOrderText(v),
    },
    {
      field: 'extra',
      label: '工作备注',
      format: (v: string) => () => renderOrderText(v),
    },
  ];

  const renderOrderText = (itemContent: string) =>
    itemContent
      ? h('div', { class: 'multiline-text-container' }, [
          h('pre', { class: 'multiline-text' }, itemContent),
        ])
      : '-';
  const renderId = (id: string) => h('p', {}, id);

  const transformOrder = (order: CustomerOrder) =>
    fieldsMap.map(({ label, field, format }) => ({
      label,
      value: format
        ? format(order[field as keyof CustomerOrder] as string)
        : order[field as keyof CustomerOrder],
    })) as DescData[];

  const edit = (id: string) => {
    editingId.value = id;
  };
  const cancelEdit = () => {
    editingId.value = undefined;
  };

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

<style scoped lang="less"></style>
