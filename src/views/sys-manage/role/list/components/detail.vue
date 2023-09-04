<template>
  <a-modal
    :visible="roleDetailStore.isVisible"
    :top="'20%'"
    :align-center="false"
    title-align="start"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>{{ roleDetailStore.id ? '编辑' : '添加' }}角色</template>
    <a-form ref="formRef" :model="formModel">
      <a-form-item
        label="角色名称"
        field="name"
        validate-trigger="input"
        :rules="[{ required: true, message: '请输入角色名称' }]"
      >
        <a-input v-model="formModel.name" placeholder="请输入..." />
      </a-form-item>
      <a-form-item
        label="权限字符"
        field="perm"
        validate-trigger="input"
        :rules="[{ required: true, message: '请输入权限字符' }]"
      >
        <a-input v-model="formModel.perm" placeholder="请输入..." />
      </a-form-item>
      <!--
      <a-form-item
        label="默认路由"
        field="route"
        validate-trigger="input"
        tooltip="每次登录默认打开的页面路径"
      >
        <a-input v-model="formModel.route" placeholder="请输入..." />
      </a-form-item>
      -->
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
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import Message from '@arco-design/web-vue/es/message';

  import {
    Role,
    createRole,
    queryRoleDetail,
    updateRole,
  } from '@/api/sys-manage/role';
  import { useRoleDetailStore } from '@/store/';
  import { AvailableStatus } from '@/config/common';

  const props = defineProps<{
    fetchData: () => Promise<void>;
  }>();

  const formModel = ref<Partial<Role>>({ status: 'normal' });
  const formRef = ref<FormInstance>();
  const roleDetailStore = useRoleDetailStore();

  const handleOk = async () => {
    const validateRes = await formRef.value?.validate();
    if (validateRes) {
      return;
    }
    if (roleDetailStore.id) {
      await updateRole(roleDetailStore.id, formModel.value);
      Message.success('更新角色信息成功');
    } else {
      await createRole(formModel.value);
      Message.success('创建角色成功');
    }
    await props.fetchData();
    handleCancel();
  };

  const handleCancel = () => {
    roleDetailStore.$reset();
    formModel.value = {};
  };

  const loadDetail = async (id: string) => {
    const { data: detail } = await queryRoleDetail(id);
    formModel.value = detail;
  };
  watch(
    () => roleDetailStore.id,
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
    name: 'RoleDetail',
  };
</script>
