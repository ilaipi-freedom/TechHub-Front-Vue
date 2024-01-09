<template>
  <a-card>
    <template #title>支付信息</template>
    <template #extra>
      <a-button v-if="customerId && !addingPayment" type="primary" @click="add">
        添加
      </a-button>
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
          <a-descriptions layout="inline-vertical" bordered :column="2">
            <a-descriptions-item label="支付id">
              <p>{{ item.id }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="支付方式">
              <p>{{ item.payMethod }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="支付金额">
              <p>{{ item.amount }}</p>
            </a-descriptions-item>
            <a-descriptions-item key="payTime" label="支付时间">
              <p>
                {{
                  item.payTime
                    ? dayjs(item.payTime).format('YYYY-MM-DD HH:mm')
                    : '-'
                }}
              </p>
            </a-descriptions-item>
            <a-descriptions-item key="extra" label="支付备注">
              <MDEditor :value="item.extra as string" read />
            </a-descriptions-item>
          </a-descriptions>
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
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import dayjs from 'dayjs';

  import useLoading from '@/hooks/loading';
  import { useCustomerStore } from '@/store/';
  import {
    CustomerPayment,
    queryCustomerPaymentList,
  } from '@/api/customer/payment';

  import CustomerDetailPaymentForm from './form.vue';
  import MDEditor from '../md-editor.vue';

  const customerStore = useCustomerStore();

  const { customerId } = storeToRefs(customerStore);
  const editingId = ref<string>();

  const { setLoading } = useLoading();
  const payments = ref<Partial<CustomerPayment>[]>([]);
  const addingPayment = ref<Partial<CustomerPayment>>();
  const initPayments = async () => {
    if (!customerId.value) {
      return;
    }
    setLoading(true);
    const { data } = await queryCustomerPaymentList({
      customerId: customerId.value,
      isAll: true,
    });
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

<style scoped lang="less"></style>
