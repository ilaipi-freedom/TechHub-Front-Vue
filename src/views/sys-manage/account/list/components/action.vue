<template>
  <a-row style="margin-bottom: 16px">
    <a-col :span="12">
      <a-space>
        <a-button type="primary" @click="create">
          <template #icon>
            <icon-plus />
          </template>
          新建用户
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { useAccountDetailStore } from '@/store/';

  const accountDetailStore = useAccountDetailStore();

  const create = () => {
    accountDetailStore.toggleVisible();
  };
</script>

<script lang="ts">
  export default {
    name: 'AccountListAction',
  };
</script>
