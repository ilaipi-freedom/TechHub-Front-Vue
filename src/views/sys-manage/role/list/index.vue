<template>
  <div class="container">
    <Breadcrumb
      :items="[
        'menu.sys-manage',
        'menu.sys-manage.role',
        'sys-manage.role.list',
      ]"
    />
    <RoleListSearch :fetch-data="search" />
    <RoleListAction />
    <a-divider style="margin-top: 0" />
    <RoleListTable
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

  import { queryRoleList, Role, RoleParams } from '@/api/sys-manage/role';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import { useRoleSearchStore } from '@/store/';

  import RoleListSearch from './components/search.vue';
  import RoleListAction from './components/action.vue';
  import RoleListTable from './components/list.vue';

  const roleSearchStore = useRoleSearchStore();
  const { loading, setLoading } = useLoading(true);
  const renderData = ref<Role[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const search = async () => {
    const query = {
      ...roleSearchStore.$state,
    } as RoleParams;
    fetchData(query);
  };
  const fetchData = async (
    params: RoleParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryRoleList(params);
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
    name: 'RoleList',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    background-color: #fff;
  }
</style>
