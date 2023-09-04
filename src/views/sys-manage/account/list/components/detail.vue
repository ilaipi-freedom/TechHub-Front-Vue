<template>
  <a-modal
    :visible="accountDetailStore.isVisible"
    :top="'20%'"
    :align-center="false"
    title-align="start"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>
      {{ accountDetailStore.id ? '编辑' : '添加' }}用户
    </template>
    <a-form ref="formRef" :model="formModel">
      <a-form-item
        label="用户姓名"
        field="name"
        validate-trigger="input"
        :rules="[{ required: true, message: '请输入姓名' }]"
      >
        <a-input v-model="formModel.name" placeholder="请输入..." />
      </a-form-item>
      <a-form-item
        label="手机号"
        field="phone"
        validate-trigger="input"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <a-input v-model="formModel.phone" placeholder="请输入..." />
      </a-form-item>
      <a-form-item
        label="用户名"
        field="username"
        validate-trigger="input"
        :rules="[{ required: true, message: '请输入用户名' }]"
        tooltip="登录后台、app时使用，可以与手机号相同"
      >
        <a-input v-model="formModel.username" placeholder="请输入..." />
      </a-form-item>
      <a-form-item
        v-if="!accountDetailStore.id"
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
      <a-form-item
        field="roleId"
        label="角色"
        :rules="[{ required: true, message: '请选择用户角色' }]"
      >
        <a-select
          v-model="formModel.roleId"
          placeholder="请选择..."
          allow-clear
          allow-search
          :filter-option="false"
          :loading="loading"
          @search="fetchRoleList"
          @clear="() => fetchRoleList()"
        >
          <a-option
            v-for="option in roleList"
            :key="option.id"
            :value="option.id"
          >
            {{ option.name }} ({{ option.perm }})
          </a-option>
        </a-select>
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
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import Message from '@arco-design/web-vue/es/message';

  import {
    Account,
    createAccount,
    queryAccountDetail,
    updateAccount,
  } from '@/api/sys-manage/account';
  import { Role, queryRoleList, RoleParams } from '@/api/sys-manage/role';
  import useLoading from '@/hooks/loading';
  import { useAccountDetailStore } from '@/store/';
  import { AvailableStatus } from '@/config/common';

  const props = defineProps<{
    fetchData: () => Promise<void>;
  }>();

  const formModel = ref<Partial<Account>>({ status: 'normal' });
  const formRef = ref<FormInstance>();
  const accountDetailStore = useAccountDetailStore();
  const { loading, setLoading } = useLoading();
  const roleList = ref<Role[]>([]);

  const handleOk = async () => {
    const validateRes = await formRef.value?.validate();
    if (validateRes) {
      return;
    }
    if (accountDetailStore.id) {
      await updateAccount(accountDetailStore.id, formModel.value);
      Message.success('更新用户信息成功');
    } else {
      await createAccount(formModel.value);
      Message.success('创建用户成功');
    }
    await props.fetchData();
    handleCancel();
  };

  const handleCancel = () => {
    accountDetailStore.$reset();
    formModel.value = {};
  };
  const fetchRoleList = async (q?: string) => {
    const searchParams: Partial<RoleParams> = {
      status: 'normal',
      current: 1,
      pageSize: 30,
    };
    if (q) {
      searchParams.q = q;
    }
    setLoading(true);
    const {
      data: { list },
    } = await queryRoleList(searchParams as RoleParams);
    roleList.value = list;
    setLoading(false);
  };
  fetchRoleList();

  const loadDetail = async (id: string) => {
    const { data: detail } = await queryAccountDetail(id);
    formModel.value = detail;
  };
  watch(
    () => accountDetailStore.id,
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
    name: 'AccountDetail',
  };
</script>
