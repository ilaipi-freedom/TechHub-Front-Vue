<template>
  <a-row style="margin-bottom: 16px">
    <a-col :span="12">
      <a-space>
        <a-button type="primary" @click="create">
          <template #icon>
            <icon-plus />
          </template>
          新建字典数据
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import useSysDictDataDetailStore from '@/store/modules/sys-manage/sysDictData/detail';

  const sysDictDataDetailStore = useSysDictDataDetailStore();

  const create = () => {
    sysDictDataDetailStore.toggleVisible();
  };
</script>

<script lang="ts">
  export default {
    name: 'SysDictDataListAction',
  };
</script>
