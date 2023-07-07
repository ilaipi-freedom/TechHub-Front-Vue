<template>
  <a-card>
    <template #title>支付信息</template>
    <template #extra>
      <a-button type="primary" @click="add">添加</a-button>
    </template>
    <a-grid :row-gap="15">
      <a-grid-item v-if="!!addingPayment" class="list-col" :span="24">
        <CustomerDetailPaymentForm
          :cancel="removeAdding"
          :refresh="initPayments"
        />
      </a-grid-item>
      <a-grid-item
        v-for="(item, index) in orders"
        :key="item.id"
        class="list-col"
        :span="24"
      >
        <a-descriptions
          :data="transformPayment(item as CustomerPayment, index)"
          layout="inline-vertical"
          bordered
          :column="2"
        />
      </a-grid-item>
    </a-grid>
  </a-card>
</template>

<script lang="ts" setup>
  import { h, ref, RenderFunction } from 'vue';
  import { useRoute } from 'vue-router';
  import dayjs from 'dayjs';

  import useLoading from '@/hooks/loading';
  import {
    CustomerPayment,
    queryCustomerPaymentList,
  } from '@/api/customer/payment';

  import { DescData } from '@arco-design/web-vue';
  import CustomerDetailPaymentForm from './form.vue';

  const route = useRoute();
  const customerId = ref<string>(route.params.id as string);

  const fieldsMap: {
    key: string;
    label: string;
    format?: (v: string) => string | RenderFunction;
  }[] = [
    {
      key: 'id',
      label: '支付id',
      format:
        (v: string): RenderFunction =>
        () =>
          renderId(v),
    },
    {
      key: 'payMethod',
      label: '支付方式',
    },
    {
      key: 'payTime',
      label: '支付时间',
      format: (v: string): string =>
        v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-',
    },
    {
      key: 'extra',
      label: '支付备注',
      format: (v: string) => () => renderPaymentText(v),
    },
  ];
  const transformPayment = (
    payment: CustomerPayment,
    index: number
  ): DescData[] => {
    const descData: DescData[] = [{ label: '次数', value: `${index + 1}` }];

    const transformedFields = fieldsMap.map(({ key, label, format }) => ({
      label,
      value: format
        ? format(payment[key as keyof CustomerPayment] as string)
        : payment[key as keyof CustomerPayment],
    }));

    return [...descData, ...transformedFields] as DescData[];
  };

  const renderPaymentText = (itemContent: string) =>
    itemContent
      ? h('div', { class: 'multiline-text-container' }, [
          h('pre', { class: 'multiline-text' }, itemContent),
        ])
      : '-';
  const renderId = (id: string) => h('p', {}, id);

  const { setLoading } = useLoading();
  const orders = ref<Partial<CustomerPayment>[]>([]);
  const addingPayment = ref<Partial<CustomerPayment>>();
  const initPayments = async () => {
    if (!customerId.value) {
      return;
    }
    setLoading(true);
    const { data } = await queryCustomerPaymentList(customerId.value);
    orders.value = data;
    setLoading(false);
  };
  initPayments();

  const add = () => {
    addingPayment.value = {};
  };
  const removeAdding = () => {
    addingPayment.value = undefined;
  };
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetailPayment',
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
