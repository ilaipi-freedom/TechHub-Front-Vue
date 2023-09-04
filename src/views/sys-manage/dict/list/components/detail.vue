<template>
  <a-modal
    :visible="sysDictDetailStore.isVisible"
    :top="'20%'"
    :align-center="false"
    title-align="start"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>
      {{ sysDictDetailStore.id ? '编辑' : '添加' }}字典
    </template>
    <a-form ref="formRef" :model="formModel">
      <a-form-item
        label="字典名称"
        field="name"
        validate-trigger="input"
        :rules="[{ required: true, message: '请输入字典名称' }]"
      >
        <a-input v-model="formModel.name" placeholder="请输入..." />
      </a-form-item>
      <a-form-item
        label="类型"
        field="type"
        validate-trigger="input"
        :rules="[{ required: true, message: '请输入类型' }]"
      >
        <a-input v-model="formModel.type" placeholder="请输入..." />
      </a-form-item>
      <a-form-item
        field="status"
        label="状态"
        :rules="[{ required: true, message: '公司状态必须选择' }]"
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
      <a-form-item
        field="category"
        label="渲染类型"
        tooltip="无特殊说明，默认选择 select"
      >
        <a-select
          v-model="formModel.category"
          placeholder="请选择..."
          allow-clear
        >
          <a-option
            v-for="option in SysDictCategory"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="备注" field="remark">
        <a-textarea
          v-model="formModel.remark"
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
    SysDict,
    createSysDict,
    querySysDictDetail,
    updateSysDict,
  } from '@/api/sys-manage/sysDict';
  import { useSysDictDetailStore } from '@/store/';
  import { AvailableStatus, SysDictCategory } from '@/config/common';

  const props = defineProps<{
    fetchData: () => Promise<void>;
  }>();

  const formModel = ref<Partial<SysDict>>({ status: 'normal' });
  const formRef = ref<FormInstance>();
  const sysDictDetailStore = useSysDictDetailStore();

  const handleOk = async () => {
    const validateRes = await formRef.value?.validate();
    if (validateRes) {
      return;
    }
    if (sysDictDetailStore.id) {
      await updateSysDict(sysDictDetailStore.id, formModel.value);
      Message.success('更新字典信息成功');
    } else {
      await createSysDict(formModel.value);
      Message.success('创建字典成功');
    }
    await props.fetchData();
    handleCancel();
  };

  const handleCancel = () => {
    sysDictDetailStore.$reset();
    formModel.value = {};
  };

  const loadDetail = async (id: string) => {
    const { data: detail } = await querySysDictDetail(id);
    formModel.value = detail;
  };
  watch(
    () => sysDictDetailStore.id,
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
    name: 'SysDictDetail',
  };
</script>
