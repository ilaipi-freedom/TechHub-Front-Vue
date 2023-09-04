<template>
  <a-modal
    :visible="resetStore.isVisible"
    :top="'20%'"
    :align-center="false"
    title-align="start"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>重置密码</template>
    <a-form ref="formRef" :model="formModel">
      <a-form-item
        label="密码"
        field="password"
        validate-trigger="input"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password
          v-model="formModel.password"
          placeholder="请输入..."
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import Message from '@arco-design/web-vue/es/message';

  import { Account, resetPassword } from '@/api/sys-manage/account';
  import { useAccountResetStore } from '@/store/';

  const formModel = ref<Partial<Account>>({});
  const formRef = ref<FormInstance>();
  const resetStore = useAccountResetStore();

  const handleOk = async () => {
    const validateRes = await formRef.value?.validate();
    if (validateRes) {
      return;
    }
    await resetPassword(resetStore.id, formModel.value.password as string);
    Message.success('更新用户信息成功');
    handleCancel();
  };

  const handleCancel = () => {
    resetStore.$reset();
    formModel.value = {};
  };
</script>

<script lang="ts">
  export default {
    name: 'AccountDetail',
  };
</script>
