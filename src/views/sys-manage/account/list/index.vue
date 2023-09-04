<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.sys-manage',
        'menu.sys-manage.account',
        'sys-manage.account.list',
      ]"
    />
    <AccountListSearch :fetch-data="search" />
    <AccountListAction />
    <a-divider style="margin-top: 0" />
    <AccountListTable
      :loading="loading"
      :fetch-data="search"
      :on-page-change="onPageChange"
      :pagination="pagination"
      :render-data="renderData"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';

  import {
    queryAccountList,
    Account,
    AccountParams,
  } from '@/api/sys-manage/account';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import { useAccountSearchStore } from '@/store/';

  import AccountListSearch from './components/search.vue';
  import AccountListAction from './components/action.vue';
  import AccountListTable from './components/list.vue';

  const accountSearchStore = useAccountSearchStore();
  const { loading, setLoading } = useLoading(true);
  const renderData = ref<Account[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const search = async () => {
    const query = {
      ...accountSearchStore.$state,
    } as AccountParams;
    fetchData(query);
  };
  const fetchData = async (
    params: AccountParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryAccountList(params);
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
    fetchData({ ...basePagination, current });
  };
  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'AccountList',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    background-color: #fff;
  }
</style>
