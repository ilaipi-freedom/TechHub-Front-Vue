<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.sys-manage',
        'menu.sys-manage.dict',
        'menu.sys-manage.dict.list',
      ]"
    />
    <SysDictListSearch :fetch-data="search" />
    <SysDictListAction />
    <a-divider style="margin-top: 0" />
    <SysDictListTable
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
    querySysDictList,
    SysDict,
    SysDictParams,
  } from '@/api/sys-manage/sysDict';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import useSysDictSearchStore from '@/store/modules/sys-manage/sysDict/list';

  import SysDictListSearch from './components/search.vue';
  import SysDictListAction from './components/action.vue';
  import SysDictListTable from './components/list.vue';

  const sysDictSearchStore = useSysDictSearchStore();
  const { loading, setLoading } = useLoading(true);
  const renderData = ref<SysDict[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const search = async () => {
    const query = {
      ...sysDictSearchStore.$state,
    } as SysDictParams;
    fetchData(query);
  };
  const fetchData = async (
    params: SysDictParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await querySysDictList(params);
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
    name: 'SysDictList',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    background-color: #fff;
  }
</style>
