<template>
  <a-modal
    :visible="sysDictDataDetailStore.isVisible"
    :top="'20%'"
    :align-center="false"
    title-align="start"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>
      {{ sysDictDataDetailStore.id ? '编辑' : '添加' }}字典数据
    </template>
    <a-form ref="formRef" :model="formModel">
      <a-form-item
        label="数据类型"
        field="type"
        validate-trigger="input"
        :rules="[{ required: true, message: '请输入数据类型' }]"
      >
        <a-select
          v-model="formModel.type"
          placeholder="请选择"
          :options="sysDictList"
          :field-names="{ value: 'type', label: 'name' }"
        />
      </a-form-item>
      <a-form-item
        label="数据名称"
        field="label"
        validate-trigger="input"
        :rules="[{ required: true, message: '请输入数据名称' }]"
      >
        <a-input v-model="formModel.label" placeholder="请输入..." />
      </a-form-item>
      <a-form-item
        label="数据值"
        field="value"
        validate-trigger="input"
        :rules="[{ required: true, message: '请输入数据值' }]"
      >
        <a-input v-model="formModel.value" placeholder="请输入..." />
      </a-form-item>
      <a-form-item
        label="顺序"
        field="sort"
        validate-trigger="input"
        :rules="[{ required: true, message: '请输入顺序' }]"
      >
        <a-input-number
          v-model="formModel.sort"
          model-event="input"
          placeholder="请输入..."
        />
      </a-form-item>
      <a-form-item
        field="status"
        label="状态"
        :rules="[{ required: true, message: '用户状态必须选择' }]"
      >
        <a-radio-group v-model="formModel.status">
          <a-radio
            v-for="option in AvailableStatus"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="备注" field="remark">
        <a-textarea
          v-model="formModel.remark"
          placeholder="请输入"
          allow-clear
          :auto-size="{ minRows: 3, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item label="补充信息" field="extra" tooltip="使用JSON格式">
        <a-textarea
          v-model="formModel.extra"
          placeholder="请输入"
          allow-clear
          :auto-size="{ minRows: 3, maxRows: 6 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import Message from '@arco-design/web-vue/es/message';

  import {
    SysDictData,
    createSysDictData,
    querySysDictDataDetail,
    updateSysDictData,
  } from '@/api/sys-manage/sysDictData';
  import {
    querySysDictList,
    SysDict,
    SysDictParams,
  } from '@/api/sys-manage/sysDict';
  import useSysDictDataDetailStore from '@/store/modules/sys-manage/sysDictData/detail';
  import { AvailableStatus } from '@/config/common';

  const props = defineProps<{
    fetchData: () => Promise<void>;
  }>();

  const formModel = ref<Partial<SysDictData>>({ status: 'normal' });
  const formRef = ref<FormInstance>();
  const sysDictDataDetailStore = useSysDictDataDetailStore();
  const sysDictList = ref<SysDict[]>([]);

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

  const handleOk = async () => {
    const validateRes = await formRef.value?.validate();
    if (validateRes) {
      return;
    }
    if (sysDictDataDetailStore.id) {
      await updateSysDictData(sysDictDataDetailStore.id, formModel.value);
      Message.success('更新字典数据信息成功');
    } else {
      await createSysDictData(formModel.value);
      Message.success('创建字典数据成功');
    }
    await props.fetchData();
    handleCancel();
  };

  const handleCancel = () => {
    sysDictDataDetailStore.$reset();
    formModel.value = {};
  };

  const loadDetail = async (id: string) => {
    const { data: detail } = await querySysDictDataDetail(id);
    formModel.value = detail;
  };
  watch(
    () => sysDictDataDetailStore.id,
    (newId) => {
      if (!newId) {
        return;
      }
      loadDetail(newId);
    }
  );
</script>

<script lang="ts">
  export default {
    name: 'SysDictDataDetail',
  };
</script>
