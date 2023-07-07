<template>
  <a-form ref="formRef" layout="vertical" auto-label-width :model="formData">
    <a-form-item label="标题" field="title" validate-trigger="input">
      <a-input
        v-model="formData.title"
        placeholder="please enter your title..."
      />
    </a-form-item>
    <a-form-item label="内容" field="content" validate-trigger="input">
      <a-textarea
        v-model="formData.content"
        placeholder="please enter your content..."
        :style="{ minHeight: '100px' }"
        auto-size
      />
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
  import { FormInstance } from '@arco-design/web-vue/es/form';

  import useLoading from '@/hooks/loading';
  import {
    CustomerRemark,
    createCustomerRemark,
    updateCustomerRemark,
  } from '@/api/customer/remark';

  const { setLoading } = useLoading();

  const props = defineProps<{
    remark?: CustomerRemark;
    cancel: () => void;
    refresh: () => Promise<void>;
  }>();
  const formData = ref<Partial<CustomerRemark> | undefined>(props.remark);
  const formRef = ref<FormInstance>();

  const saveRemark = async () => {
    const res = await formRef.value?.validate();
    const payload = formData.value;
    if (!res) {
      setLoading(true);
      if (props.remark?.id) {
        await updateCustomerRemark({ ...payload });
      } else {
        await createCustomerRemark({ ...payload });
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
