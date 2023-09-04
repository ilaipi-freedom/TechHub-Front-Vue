<template>
  <a-row style="margin-bottom: 16px">
    <a-col :span="12">
      <a-space>
        <a-button type="primary" @click="create">
          <template #icon>
            <icon-plus />
          </template>
          新建角色
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { useRoleDetailStore } from '@/store/';

  const roleDetailStore = useRoleDetailStore();

  const create = () => {
    roleDetailStore.toggleVisible();
  };
</script>

<script lang="ts">
  export default {
    name: 'RoleListAction',
  };
</script>
