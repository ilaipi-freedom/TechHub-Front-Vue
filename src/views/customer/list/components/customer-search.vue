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
            <a-form-item field="q" :label="$t('customer.list.q')">
              <a-input
                v-model="formModel.q"
                :placeholder="$t('customer.list.q.placeholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="status" :label="$t('searchTable.form.status')">
              <a-select
                v-model="formModel.status"
                :options="[]"
                :placeholder="$t('searchTable.form.selectDefault')"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item
              field="firstMessageTime"
              :label="$t('customer.list.form.firstMessageTime')"
            >
              <a-range-picker
                v-model="formModel.firstMessageTime"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              field="orderTime"
              :label="$t('customer.list.form.orderTime')"
            >
              <a-range-picker
                v-model="formModel.orderTime"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              field="deliveryTime"
              :label="$t('customer.list.form.deliveryTime')"
            >
              <a-range-picker
                v-model="formModel.deliveryTime"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
    <a-divider style="height: 88px" direction="vertical" />
    <a-col :flex="'86px'" style="text-align: right">
      <a-space direction="vertical" :size="18">
        <a-button type="primary" @click="search">
          <template #icon>
            <icon-search />
          </template>
          {{ $t('searchTable.form.search') }}
        </a-button>
        <a-button @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          {{ $t('searchTable.form.reset') }}
        </a-button>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import useLoading from '@/hooks/loading';
  import { PolicyRecord, PolicyParams } from '@/api/list';
  import { queryCustomerList, CustomerParams } from '@/api/customer';
  import { Pagination } from '@/types/global';

  const generateFormModel = () => {
    return {
      q: '',
      status: '',
      firstMessageTime: '',
      orderTime: '',
      deliveryTime: '',
    };
  };
  const { _loading, setLoading } = useLoading(true);
  const renderData = ref<PolicyRecord[]>([]);
  const formModel = ref(generateFormModel());

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const fetchData = async (
    params: CustomerParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const data = await queryCustomerList(params);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as PolicyParams);
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
