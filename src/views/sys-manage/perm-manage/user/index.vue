<template>
  <div class="container">
    <Breadcrumb :items="['menu.sys', 'menu.sys.perm', 'menu.sys.perm.user']" />
    <div class="layout">
      <div class="layout-left-side">
        <DeptListPanel />
      </div>
      <div class="layout-content">
        <a-space :size="16" direction="vertical" fill>
          <Studio />
          <DataStatistic />
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import DeptListPanel from './components/dept-list.vue';
  import Studio from './components/studio.vue';
  import DataStatistic from './components/data-statistic.vue';
</script>

<script lang="ts">
  export default {
    name: 'UserList',
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
