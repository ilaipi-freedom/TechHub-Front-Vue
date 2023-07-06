<template>
  <div class="container">
    <Breadcrumb :items="['menu.customer', 'menu.customer.list']" />
    <CustomerListSearch />
    <CustomerListAction />
    <a-divider style="margin-top: 0" />
    <CustomerListTable />
  </div>
</template>

<script lang="ts" setup>
  import CustomerListSearch from './components/customer-search.vue';
  import CustomerListAction from './components/customer-action.vue';
  import CustomerListTable from './components/customer-list.vue';
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

  .layout {
    display: flex;

    &-left-side {
      flex-basis: 300px;
      border-right: 1px solid #0000001a;
    }

    &-content {
      flex: 1;
      padding: 0 16px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .layout {
      flex-wrap: wrap;
      &-left-side {
        flex: 1;
        flex-basis: 100%;
        margin-bottom: 16px;
      }

      &-content {
        flex: none;
        flex-basis: 100%;
        padding: 0;
        order: -1;
        margin-bottom: 16px;
      }
    }
  }
</style>
