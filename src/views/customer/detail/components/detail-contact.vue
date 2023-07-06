<template>
  <a-card
    :body-style="{
      height: '100%',
      paddingTop: '16px',
      display: 'flex',
      flexFlow: 'column',
    }"
  >
    <template #title>联系信息</template>
    <template #extra>
      <a-button type="primary" @click="onSubmitClick">保存</a-button>
    </template>
    <a-form ref="formRef" layout="vertical" auto-label-width :model="formData">
      <a-form-item label="微信" field="weixin" validate-trigger="input">
        <a-input
          v-model="formData.weixin"
          placeholder="please enter your weixin..."
        />
      </a-form-item>
      <a-form-item label="微信ID" field="weixinId" validate-trigger="input">
        <a-input
          v-model="formData.weixinId"
          placeholder="please enter your weixinId..."
        />
      </a-form-item>
      <a-form-item field="xianyu" label="闲鱼">
        <a-input
          v-model="formData.xianyu"
          placeholder="please enter your xianyu..."
        />
      </a-form-item>
      <a-form-item label="QQ昵称" field="qq" validate-trigger="input">
        <a-input v-model="formData.qq" placeholder="please enter your qq..." />
      </a-form-item>
      <a-form-item label="qq号" field="qqNum" validate-trigger="input">
        <a-input
          v-model="formData.qqNum"
          placeholder="please enter your qqNum..."
        />
      </a-form-item>
      <a-form-item field="firstMessageTime" label="首聊时间">
        <a-date-picker
          v-model="formData.firstMessageTime"
          show-time
          placeholder="Please select ..."
        />
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import useLoading from '@/hooks/loading';
  import {
    Customer,
    getCustomer,
    updateCustomer,
    createCustomer,
  } from '@/api/customer';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const customerId = ref<string>(route.params.id as string);

  const formData = ref<Partial<Customer>>({});
  const formRef = ref<FormInstance>();
  const { setLoading } = useLoading();
  const initCustomer = async () => {
    if (!customerId.value) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await getCustomer(customerId.value);
      formData.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  initCustomer();
  const onSubmitClick = async () => {
    const res = await formRef.value?.validate();
    const payload = formData.value;
    if (!res) {
      setLoading(true);
      if (customerId.value) {
        await updateCustomer({ ...payload, id: customerId.value });
      } else {
        const created = await createCustomer({ ...payload });
        customerId.value = created.data.id;
      }
      setLoading(false);
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetailContact',
  };
</script>

<style scoped lang="less"></style>
