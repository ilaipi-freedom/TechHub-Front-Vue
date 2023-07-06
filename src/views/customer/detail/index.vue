<template>
  <div class="container">
    <Breadcrumb :items="['menu.customer', 'menu.customer.detail']" />
    <div class="layout">
      <div class="layout-left-side">
        <CustomerDetailContact />
      </div>
      <div class="layout-content">
        <a-space :size="16" direction="vertical" fill></a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import CustomerDetailContact from './components/detail-contact.vue';
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetail',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  .layout {
    display: flex;

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
