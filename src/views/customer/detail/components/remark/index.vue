<template>
  <a-card>
    <template #title>备注信息</template>
    <template #extra>
      <a-button v-if="customerId && !addingRemark" type="primary" @click="add">
        添加
      </a-button>
    </template>
    <a-space />
    <a-row class="list-row" :gutter="24">
      <a-col v-if="!!addingRemark" class="list-col" :span="12">
        <a-card>
          <CustomerDetailEditRemark
            :cancel="removeAdding"
            :refresh="initRemarks"
          />
        </a-card>
      </a-col>
      <a-col v-for="item in remarks" :key="item.id" class="list-col" :span="12">
        <a-card v-if="item.id !== editingId" :title="item.title">
          <template #extra>
            <a-link type="primary" @click="() => edit(item.id as string)">
              编辑
            </a-link>
          </template>
          <MDEditor :value="item.content as string" read />
        </a-card>
        <CustomerDetailEditRemark
          v-if="item.id === editingId"
          :remark="item as CustomerRemark"
          :cancel="cancelEdit"
          :refresh="initRemarks"
        />
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import useLoading from '@/hooks/loading';
  import { useCustomerStore } from '@/store/';
  import {
    queryCustomerRemarkList,
    CustomerRemark,
  } from '@/api/customer/remark';
  import CustomerDetailEditRemark from './form.vue';
  import MDEditor from '../md-editor.vue';

  const customerStore = useCustomerStore();

  const { customerId } = storeToRefs(customerStore);

  const { setLoading } = useLoading();

  const remarks = ref<Partial<CustomerRemark>[]>([]);
  const addingRemark = ref<Partial<CustomerRemark>>();
  const editingId = ref<string>();
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

  const edit = (id: string) => {
    editingId.value = id;
  };
  const cancelEdit = () => {
    editingId.value = undefined;
  };

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
