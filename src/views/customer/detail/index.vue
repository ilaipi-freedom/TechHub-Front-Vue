<template>
  <div class="container">
    <Breadcrumb :items="['menu.customer', 'menu.customer.detail']" />
    <div class="layout">
      <div class="layout-left-side">
        <CustomerDetailContact />
      </div>
      <div class="layout-content">
        <a-space :size="16" direction="vertical" fill>
          <CustomerDetailRemark />
          <CustomerDetailOrder />
          <CustomerDetailPayment />
          <CustomerDetailProject />
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';

  import { useCustomerStore } from '@/store/';

  import CustomerDetailContact from './components/detail-contact.vue';
  import CustomerDetailRemark from './components/remark/index.vue';
  import CustomerDetailOrder from './components/order/index.vue';
  import CustomerDetailPayment from './components/payment/index.vue';
  import CustomerDetailProject from './components/project/index.vue';

  const route = useRoute();

  const customerStore = useCustomerStore();
  const update = (id: string) => {
    if (!id) {
      return;
    }
    customerStore.updateCustomerId(id);
  };
  update(route.params.id as string);
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetail',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
    height: 100%;
  }

  .layout {
    display: flex;
    height: 100%;
    padding-bottom: 50px;

    &-left-side {
      flex-basis: 300px;
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

      &-right-side {
        flex-basis: 100%;
      }
    }
  }
</style>
