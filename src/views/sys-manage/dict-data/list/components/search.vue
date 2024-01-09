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
            <a-form-item field="q" label="关键字" tooltip="可模糊匹配名称和值">
              <a-input
                v-model="formModel.q"
                placeholder="请输入关键字"
                allow-clear
                @press-enter="search"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="type" label="字典类型">
              <a-select
                v-model="formModel.type"
                :options="sysDictList"
                placeholder="请选择"
                :field-names="{ value: 'type', label: 'name' }"
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

  import { SysDictDataParams } from '@/api/sys-manage/sysDictData';
  import useSysDictDataSearchStore from '@/store/modules/sys-manage/sysDictData/list';
  import {
    querySysDictList,
    SysDict,
    SysDictParams,
  } from '@/api/sys-manage/sysDict';

  const props = defineProps<{
    fetchData: () => void;
  }>();

  const sysDictDataSearchStore = useSysDictDataSearchStore();
  const searchStore = storeToRefs(sysDictDataSearchStore);
  const sysDictList = ref<SysDict[]>([]);

  const formModel = ref<Partial<SysDictDataParams>>(
    searchStore as Partial<SysDictDataParams>
  );

  const fetchSysDict = async (
    params: SysDictParams = { current: 1, pageSize: 20 }
  ) => {
    try {
      const { data } = await querySysDictList(params);
      sysDictList.value = data.list;
      console.log('==========data.list', data.list);
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  fetchSysDict();
  const search = async () => {
    const { q, type } = formModel.value;
    const searchParams: Partial<SysDictDataParams> = {};
    if (q) {
      searchParams.q = q;
    }
    if (type) {
      searchParams.type = type;
    }
    sysDictDataSearchStore.$reset();
    sysDictDataSearchStore.$patch(searchParams);
    props.fetchData();
  };
  const reset = () => {
    sysDictDataSearchStore.$reset();
    search();
  };
</script>

<script lang="ts">
  export default {
    name: 'SysDictDataListSearch',
  };
</script>
