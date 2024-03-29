<template>
  <a-row>
    <a-col :flex="1">
      <a-form
        :model="formModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item field="q" :label="$t('customer.list.q')">
              <a-input
                v-model="formModel.q"
                :placeholder="$t('customer.list.q.placeholder')"
                allow-clear
                @press-enter="search"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="status" :label="$t('searchTable.form.status')">
              <a-select
                v-model="formModel.status"
                :options="[]"
                :placeholder="$t('searchTable.form.selectDefault')"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item
              field="firstMessageTime"
              :label="$t('customer.list.form.firstMessageTime')"
            >
              <a-range-picker
                v-model="formModel.firstMessageTime"
                style="width: 100%"
                @change="search"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              field="orderTime"
              :label="$t('customer.list.form.orderTime')"
            >
              <a-range-picker
                v-model="formModel.orderTime"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              field="deliveryTime"
              :label="$t('customer.list.form.deliveryTime')"
            >
              <a-range-picker
                v-model="formModel.deliveryTime"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
    <a-divider style="height: 88px" direction="vertical" />
    <a-col :flex="'86px'" style="text-align: right">
      <a-space direction="vertical" :size="18">
        <a-button type="primary" @click="search">
          <template #icon>
            <icon-search />
          </template>
          {{ $t('searchTable.form.search') }}
        </a-button>
        <a-button @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          {{ $t('searchTable.form.reset') }}
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { merge } from 'lodash';

  import { CustomerParams } from '@/api/customer/list';
  import { useCustomerSearchStore } from '@/store/';

  const props = defineProps<{
    fetchData: (params: CustomerParams) => void;
  }>();

  const customerSearchStore = useCustomerSearchStore();
  const searchStore = storeToRefs(customerSearchStore);

  const formModel = ref<Partial<CustomerParams>>(
    searchStore as Partial<CustomerParams>
  );
  const search = async () => {
    const searchParams: Partial<CustomerParams> = {};
    merge(searchParams, formModel.value);
    customerSearchStore.$reset();
    customerSearchStore.$patch(searchParams);
    const query = {
      ...customerSearchStore.$state,
      ...searchParams,
    } as CustomerParams;
    props.fetchData(query);
  };
  const reset = () => {
    customerSearchStore.$reset();
    search();
  };
</script>

<script lang="ts">
  export default {
    name: 'CustomerListSearch',
  };
</script>
