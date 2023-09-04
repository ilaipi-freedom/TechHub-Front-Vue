<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.sys-manage',
        'menu.sys-manage.dict',
        'menu.sys-manage.dict.data',
      ]"
    />
    <SysDictDataListSearch :fetch-data="search" />
    <SysDictDataListAction />
    <a-divider style="margin-top: 0" />
    <SysDictDataListTable
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
    querySysDictData,
    SysDictData,
    SysDictDataParams,
  } from '@/api/sys-manage/sysDictData';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import { useSysDictDataSearchStore } from '@/store/';

  import SysDictDataListSearch from './components/search.vue';
  import SysDictDataListAction from './components/action.vue';
  import SysDictDataListTable from './components/list.vue';

  const sysDictDataSearchStore = useSysDictDataSearchStore();
  const { loading, setLoading } = useLoading(true);
  const renderData = ref<SysDictData[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const search = async () => {
    const query = {
      ...sysDictDataSearchStore.$state,
    } as SysDictDataParams;
    fetchData(query);
  };
  const fetchData = async (
    params: SysDictDataParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await querySysDictData(params);
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
    fetchData({ ...basePagination, current });
  };

  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'SysDictDataList',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    background-color: #fff;
  }
</style>
