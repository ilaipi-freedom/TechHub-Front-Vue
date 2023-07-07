<template>
  <a-card>
    <template #title>备注信息</template>
    <template #extra>
      <a-button type="primary" @click="add">添加</a-button>
    </template>
    <a-row class="list-row" :gutter="24">
      <a-col v-if="!!addingRemark" class="list-col" :span="12">
        <CustomerDetailEditRemark
          :cancel="removeAdding"
          :refresh="initRemarks"
        />
      </a-col>
      <a-col v-for="item in remarks" :key="item.id" class="list-col" :span="12">
        <a-card :title="item.title">
          <pre>{{ item.content }}</pre>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  import useLoading from '@/hooks/loading';
  import {
    queryCustomerRemarkList,
    CustomerRemark,
  } from '@/api/customer/remark';
  import CustomerDetailEditRemark from './remark-edit.vue';

  const { setLoading } = useLoading();

  const remarks = ref<Partial<CustomerRemark>[]>([]);
  const addingRemark = ref<Partial<CustomerRemark>>();

  const route = useRoute();
  const customerId = ref<string>(route.params.id as string);
  const initRemarks = async () => {
    if (!customerId.value) {
      return;
    }
    setLoading(true);
    const { data } = await queryCustomerRemarkList(customerId.value);
    remarks.value = data;
    setLoading(false);
  };
  initRemarks();

  const add = () => {
    addingRemark.value = {};
  };
  const removeAdding = () => {
    addingRemark.value = undefined;
  };
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetailRemark',
  };
</script>

<style scoped lang="less">
  .list-col {
    margin-bottom: 15px;
  }
</style>
