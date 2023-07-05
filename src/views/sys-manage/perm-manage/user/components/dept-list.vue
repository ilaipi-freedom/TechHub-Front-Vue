<template>
  <div class="dept-tree">
    <div class="dept-tree__header">
      <div>组织架构</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { ChatRecord } from '@/api/message';

  defineProps({
    itemData: {
      type: Object as PropType<ChatRecord>,
      default() {
        return {};
      },
    },
  });
</script>

<style scoped lang="less">
  .dept-tree {
    height: 100%;
    width: 100%;
    &__header {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 10px;
      letter-spacing: 1px;
      position: relative;
      div {
        font-size: 14px;
        flex: 1;
        white-space: nowrap;
      }
    }
    &__container {
      height: calc(100% - 40px);
      :deep(.el-tree-node__content) {
        height: 36px;
        margin: 0 5px;
      }
    }
  }
</style>
