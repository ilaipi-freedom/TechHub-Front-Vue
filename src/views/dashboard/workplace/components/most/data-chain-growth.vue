<template>
  <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
    <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }">
      <ChainItem
        :title="'支付金额最多'"
        quota="mostPaidAmount"
        chart-type="bar"
      />
    </a-grid-item>
    <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }">
      <ChainItem
        :title="'支付次数最多'"
        quota="mostPaidTimes"
        chart-type="bar"
      />
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
  import ChainItem from './chain-item.vue';
</script>
