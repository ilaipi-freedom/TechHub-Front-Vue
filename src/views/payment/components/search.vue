<template>
  <a-row :gutter="16">
    <a-col :span="6">
      <a-form-item
        field="q"
        label="关键字"
        tooltip="模糊搜索备注、用户名，如果是用户id，请输入完整的"
      >
        <a-input v-model="formModel.q" placeholder="请输入" />
      </a-form-item>
    </a-col>
    <a-col :span="6">
      <a-form-item
        field="date"
        label="结算日期"
        tooltip="开始日期和结束日期都是包含的"
      >
        <a-range-picker
          v-model="formModel.date"
          style="width: 100%"
          @change="search"
        />
      </a-form-item>
    </a-col>
    <a-col :span="12">
      <a-space>
        <a-button type="primary" @click="search">
          <template #icon>
            <icon-search />
          </template>
          搜索
        </a-button>
        <a-button @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          重置
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import { CustomerPaymentParams } from '@/api/customer/payment';
  import { SysDictData } from '@/api/sys-manage/sysDictData';
  import useCustomerPaymentSearchStore from '@/store/modules/payment/list';

  const props = defineProps<{
    fetchData: () => void;
    payMethodList: SysDictData[];
  }>();

  const streamSearchStore = useCustomerPaymentSearchStore();
  const searchStore = storeToRefs(streamSearchStore);

  const formModel = ref<Partial<CustomerPaymentParams>>(
    searchStore as unknown as Partial<CustomerPaymentParams>
  );
  const search = async () => {
    const { q, date } = formModel.value;
    streamSearchStore.$reset();
    streamSearchStore.$patch({ q, date });
    props.fetchData();
  };
  const reset = () => {
    streamSearchStore.$reset();
    props.fetchData();
  };
</script>

<script lang="ts">
  export default {
    name: 'CustomerPaymentListSearch',
  };
</script>
