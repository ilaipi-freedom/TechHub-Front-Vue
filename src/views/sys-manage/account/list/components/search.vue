<template>
  <a-form
    :model="formModel"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
    label-align="left"
  >
    <a-row :gutter="16">
      <a-col :span="8">
        <a-form-item
          field="q"
          label="关键字"
          tooltip="可模糊匹配姓名、手机号、用户名"
        >
          <a-input
            v-model="formModel.q"
            placeholder="请输入关键字"
            allow-clear
            @press-enter="search"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="status" label="用户状态">
          <a-select
            v-model="formModel.status"
            :options="AvailableStatus"
            placeholder="请选择"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-form-item
          field="date"
          label="创建时间"
          tooltip="开始日期和结束日期都是包含的"
        >
          <a-range-picker
            v-model="formModel.date"
            style="width: 100%"
            @change="search"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8" :offset="2">
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
  </a-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import { AccountParams } from '@/api/sys-manage/account';
  import { useAccountSearchStore } from '@/store/';
  import { AvailableStatus } from '@/config/common';

  const props = defineProps<{
    fetchData: () => void;
  }>();

  const accountSearchStore = useAccountSearchStore();
  const searchStore = storeToRefs(accountSearchStore);

  const formModel = ref<Partial<AccountParams>>(
    searchStore as Partial<AccountParams>
  );
  const search = async () => {
    const { q, status, companyId, date } = formModel.value;
    const searchParams: Partial<AccountParams> = {};
    if (q) {
      searchParams.q = q;
    }
    if (status) {
      searchParams.status = status;
    }
    if (companyId) {
      searchParams.companyId = companyId;
    }
    if (date) {
      searchParams.date = date;
    }
    accountSearchStore.$reset();
    accountSearchStore.$patch(searchParams);
    props.fetchData();
  };
  const reset = () => {
    accountSearchStore.$reset();
    search();
  };
</script>

<script lang="ts">
  export default {
    name: 'AccountListSearch',
  };
</script>
