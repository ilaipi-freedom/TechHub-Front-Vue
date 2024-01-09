<template>
  <div class="container">
    <Breadcrumb :items="['menu.payment.list']" />
    <CustomerPaymentListSearch
      :fetch-data="search"
      :pay-method-list="payMethodList"
    />
    <a-divider style="margin-top: -5px" />
    <CustomerPaymentListTable
      :loading="loading"
      :fetch-data="search"
      :on-page-change="onPageChange"
      :pagination="pagination"
      :render-data="renderData"
      :set-loading="setLoading"
      :pay-method-map="payMethodMap"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';

  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import {
    queryCustomerPaymentList,
    CustomerPayment,
    CustomerPaymentParams,
  } from '@/api/customer/payment';
  import useCustomerPaymentSearchStore from '@/store/modules/payment/list';
  import useDictData from '@/hooks/dictData';

  import CustomerPaymentListSearch from './components/search.vue';
  import CustomerPaymentListTable from './components/list.vue';

  const { map: payMethodMap, list: payMethodList } = useDictData(
    'customer-pay-method'
  );
  const searchStore = useCustomerPaymentSearchStore();
  const { loading, setLoading } = useLoading(true);
  const renderData = ref<CustomerPayment[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 15,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const search = async () => {
    const query = {
      ...searchStore.$state,
    } as CustomerPaymentParams;
    fetchData(query);
  };
  const fetchData = async (
    params: CustomerPaymentParams = { current: 1, pageSize: 50 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryCustomerPaymentList(params);
      renderData.value = data.list;
      pagination.current = params.current as number;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const onPageChange = (current: number) => {
    searchStore.$patch({ ...basePagination, current });
    search();
  };

  search();
</script>

<script lang="ts">
  export default {
    name: 'CustomerPaymentList',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    background-color: #fff;
  }
</style>
