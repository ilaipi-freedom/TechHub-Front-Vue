<template>
  <a-row style="margin-bottom: 16px">
    <a-col :span="12">
      <a-space>
        <a-button type="primary" @click="create">
          <template #icon>
            <icon-plus />
          </template>
          新建字典
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import useSysDictDetailStore from '@/store/modules/sys-manage/sysDict/detail';

  const sysDictDetailStore = useSysDictDetailStore();

  const create = () => {
    sysDictDetailStore.toggleVisible();
  };
</script>

<script lang="ts">
  export default {
    name: 'SysDictListAction',
  };
</script>
