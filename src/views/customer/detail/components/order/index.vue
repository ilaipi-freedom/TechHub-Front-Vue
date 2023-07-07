<template>
  <a-card>
    <template #title>订单信息</template>
    <template #extra>
      <a-button type="primary" @click="add">添加</a-button>
    </template>
  </a-card>
</template>

<script lang="ts" setup>
  const add = () => {};
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetailOrder',
  };
</script>

<style scoped lang="less"></style>
