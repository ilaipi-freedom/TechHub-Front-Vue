<template>
  <div class="container">
    <Breadcrumb :items="['menu.customer', 'menu.customer.list']" />
    <CustomerListSearch :fetch-data="fetchData" />
    <CustomerListAction />
    <a-divider style="margin-top: 0" />
    <CustomerListTable
      :loading="loading"
      :fetch-data="fetchData"
      :on-page-change="onPageChange"
      :pagination="pagination"
      :render-data="renderData"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';

  import {
    queryCustomerList,
    CustomerParams,
    Customer,
  } from '@/api/customer/list';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import { useCustomerSearchStore } from '@/store/';

  import CustomerListSearch from './components/customer-search.vue';
  import CustomerListAction from './components/customer-action.vue';
  import CustomerListTable from './components/customer-list.vue';

  const searchStore = useCustomerSearchStore();
  const { loading, setLoading } = useLoading(true);
  const renderData = ref<Customer[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const search = async () => {
    const query = {
      ...searchStore.$state,
    } as CustomerParams;
    fetchData(query);
  };
  const fetchData = async (
    params: CustomerParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryCustomerList(params);
      renderData.value = data.list;
      pagination.current = params.current;
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
    name: 'CustomerList',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    background-color: #fff;
  }
</style>
