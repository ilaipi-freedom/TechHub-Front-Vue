<template>
  <a-form ref="formRef" layout="vertical" auto-label-width :model="formData">
    <a-form-item label="标题" field="title" validate-trigger="input">
      <a-input
        v-model="formData.title"
        placeholder="please enter your title..."
      />
    </a-form-item>
    <a-form-item label="内容" field="content" validate-trigger="input">
      <MDEditor :value="formData.content" :read="false" :save="saveEdit" />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="saveRemark">保存</a-button>
        <a-button @click="cancel">取消</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import Message from '@arco-design/web-vue/es/message';

  import useLoading from '@/hooks/loading';
  import { useCustomerStore } from '@/store/';
  import {
    CustomerRemark,
    createCustomerRemark,
    updateCustomerRemark,
  } from '@/api/customer/remark';

  import MDEditor from '../md-editor.vue';

  const { setLoading } = useLoading();

  const customerStore = useCustomerStore();

  const { customerId } = storeToRefs(customerStore);

  const props = defineProps<{
    remark?: CustomerRemark;
    cancel: () => void;
    refresh: () => Promise<void>;
  }>();
  const formData = ref<Partial<CustomerRemark>>(props.remark || {});
  const formRef = ref<FormInstance>();

  const saveEdit = (value: string) => {
    formData.value.content = value;
  };

  const saveRemark = async () => {
    const res = await formRef.value?.validate();
    const payload = formData.value;
    if (!res) {
      setLoading(true);
      if (props.remark?.id) {
        await updateCustomerRemark({ ...payload });
        Message.success('更新成功');
      } else {
        await createCustomerRemark({
          ...payload,
          customer: customerId.value,
        });
        Message.success('创建成功');
      }
      await props.refresh();
      props.cancel();
      setLoading(false);
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetailEditRemark',
  };
</script>

<style scoped lang="less"></style>
