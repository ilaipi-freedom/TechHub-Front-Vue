<template>
  <a-row>
    <a-col :flex="1">
      <a-form
        :model="formModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item field="q" label="公司简称">
              <a-input
                v-model="formModel.q"
                placeholder="请输入公司简称"
                allow-clear
                @press-enter="search"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="status" label="公司状态">
              <a-select
                v-model="formModel.status"
                :options="AvailableStatus"
                placeholder="请选择"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
    <a-col :flex="'86px'" style="text-align: right">
      <a-space :size="18">
        <a-button type="primary" @click="search">
          <template #icon>
            <icon-search />
          </template>
          搜索
        </a-button>
        <a-button @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          重置
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import { SysDictParams } from '@/api/sys-manage/sysDict';
  import { useSysDictSearchStore } from '@/store/';
  import { AvailableStatus } from '@/config/common';

  const props = defineProps<{
    fetchData: () => void;
  }>();

  const sysDictSearchStore = useSysDictSearchStore();
  const searchStore = storeToRefs(sysDictSearchStore);

  const formModel = ref<Partial<SysDictParams>>(
    searchStore as Partial<SysDictParams>
  );
  const search = async () => {
    const { q, status } = formModel.value;
    const searchParams: Partial<SysDictParams> = {};
    if (q) {
      searchParams.q = q;
    }
    if (status) {
      searchParams.status = status;
    }
    sysDictSearchStore.$reset();
    sysDictSearchStore.$patch(searchParams);
    props.fetchData();
  };
  const reset = () => {
    sysDictSearchStore.$reset();
    search();
  };
</script>

<script lang="ts">
  export default {
    name: 'SysDictListSearch',
  };
</script>
