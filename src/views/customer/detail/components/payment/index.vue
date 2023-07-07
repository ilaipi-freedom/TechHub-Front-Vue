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
        v-for="(item, index) in payments"
        :key="item.id"
        class="list-col"
        :span="24"
      >
        <a-card v-if="editingId !== item.id" :bordered="false">
          <template #title>支付次数：{{ payments.length - index }}</template>
          <template #extra>
            <a-link type="primary" @click="() => edit(item.id as string)">
              编辑
            </a-link>
          </template>
          <a-descriptions
            :data="transformPayment(item as CustomerPayment)"
            layout="inline-vertical"
            bordered
            :column="2"
          />
        </a-card>
        <CustomerDetailPaymentForm
          v-if="editingId === item.id"
          :payment="item as CustomerPayment"
          :cancel="cancelEdit"
          :refresh="initPayments"
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
  const editingId = ref<string>();

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
      key: 'amount',
      label: '支付金额',
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
  const transformPayment = (payment: CustomerPayment): DescData[] => {
    const descData: DescData[] = [];

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
  const payments = ref<Partial<CustomerPayment>[]>([]);
  const addingPayment = ref<Partial<CustomerPayment>>();
  const initPayments = async () => {
    if (!customerId.value) {
      return;
    }
    setLoading(true);
    const { data } = await queryCustomerPaymentList(customerId.value);
    payments.value = data;
    setLoading(false);
  };
  initPayments();

  const edit = (id: string) => {
    editingId.value = id;
  };
  const cancelEdit = () => {
    editingId.value = undefined;
  };

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
