<template>
  <a-card>
    <template #title>订单信息</template>
    <template #extra>
      <a-button v-if="customerId && !addingOrder" type="primary" @click="add">
        添加
      </a-button>
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
          <a-descriptions layout="inline-vertical" bordered :column="2">
            <a-descriptions-item label="订单id">
              <p>{{ item.id }}</p>
            </a-descriptions-item>
            <a-descriptions-item key="firstMessageTime" label="首聊时间">
              <p>
                {{
                  item.firstMessageTime
                    ? dayjs(item.firstMessageTime).format('YYYY-MM-DD HH:mm')
                    : '-'
                }}
              </p>
            </a-descriptions-item>
            <a-descriptions-item key="orderTime" label="接单时间">
              <p>
                {{
                  item.orderTime
                    ? dayjs(item.orderTime).format('YYYY-MM-DD HH:mm')
                    : '-'
                }}
              </p>
            </a-descriptions-item>
            <a-descriptions-item key="deliveryTime" label="交付时间">
              <p>
                {{
                  item.deliveryTime
                    ? dayjs(item.deliveryTime).format('YYYY-MM-DD HH:mm')
                    : '-'
                }}
              </p>
            </a-descriptions-item>
            <a-descriptions-item label="来源">
              <p>{{ item.from }}</p>
            </a-descriptions-item>
            <a-descriptions-item label="状态">
              <p>{{ getOrderStatusName(item.status as unknown as string) }}</p>
            </a-descriptions-item>
            <a-descriptions-item key="industry" label="行业类型">
              <MDEditor :value="item.industry as string" read />
            </a-descriptions-item>
            <a-descriptions-item key="industryDetail" label="行业详情">
              <MDEditor :value="item.industryDetail as string" read />
            </a-descriptions-item>
            <a-descriptions-item key="content" label="工作内容">
              <MDEditor :value="item.content as string" read />
            </a-descriptions-item>
            <a-descriptions-item label="仓库地址">
              <a :href="item.repo" target="_blank">{{ item.repo }}</a>
            </a-descriptions-item>
            <a-descriptions-item key="detail" label="工作详情">
              <MDEditor :value="item.detail as string" read />
            </a-descriptions-item>
            <a-descriptions-item key="extra" label="工作备注">
              <MDEditor :value="item.extra as string" read />
            </a-descriptions-item>
          </a-descriptions>
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
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import dayjs from 'dayjs';

  import useLoading from '@/hooks/loading';
  import { useCustomerStore } from '@/store/';
  import { CustomerOrder, queryCustomerOrderList } from '@/api/customer/order';
  import { getOrderStatusName } from '@/types/OrderType';

  import CustomerDetailOrderForm from './form.vue';
  import MDEditor from '../md-editor.vue';

  const customerStore = useCustomerStore();

  const { customerId } = storeToRefs(customerStore);

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
