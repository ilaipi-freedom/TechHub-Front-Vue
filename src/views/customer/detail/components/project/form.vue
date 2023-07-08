<template>
  <a-form ref="formRef" layout="vertical" auto-label-width :model="formData">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-form-item label="名称" field="title" validate-trigger="input">
          <a-input
            v-model="formData.title"
            placeholder="please enter your title..."
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="开始时间" field="begin">
          <a-date-picker
            v-model="formData.begin"
            placeholder="Please select ..."
            class="w-full"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="结束时间" field="end">
          <a-date-picker
            v-model="formData.end"
            placeholder="Please select ..."
            class="w-full"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item label="项目描述" field="description" validate-trigger="input">
      <a-textarea
        v-model="formData.description"
        placeholder="please enter your description..."
        :style="{ minHeight: '100px' }"
        auto-size
      />
    </a-form-item>
    <a-form-item label="项目内容" field="content" validate-trigger="input">
      <a-textarea
        v-model="formData.content"
        placeholder="please enter your extra..."
        :style="{ minHeight: '100px' }"
        auto-size
      />
    </a-form-item>
    <a-form-item label="备注" field="extra" validate-trigger="input">
      <a-textarea
        v-model="formData.extra"
        placeholder="please enter your extra..."
        :style="{ minHeight: '100px' }"
        auto-size
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="saveProject">保存</a-button>
        <a-button @click="cancel">取消</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, toRef } from 'vue';
  import { storeToRefs } from 'pinia';
  import { FormInstance } from '@arco-design/web-vue/es/form';

  import useLoading from '@/hooks/loading';
  import { useCustomerStore } from '@/store/';

  import {
    CustomerProject,
    createCustomerProject,
    updateCustomerProject,
  } from '@/api/customer/project';

  const { setLoading } = useLoading();

  const customerStore = useCustomerStore();

  const { customerId } = storeToRefs(customerStore);

  const props = defineProps<{
    project?: CustomerProject;
    cancel: () => void;
    refresh: () => Promise<void>;
  }>();

  const formData = toRef(props.project || ({} as CustomerProject));
  const formRef = ref<FormInstance>();

  const saveProject = async () => {
    const res = await formRef.value?.validate();
    const payload = formData.value;
    if (!res) {
      setLoading(true);
      if (props.project?.id) {
        await updateCustomerProject({ ...payload });
      } else {
        await createCustomerProject({
          ...payload,
          customer: customerId.value,
        });
      }
      await props.refresh();
      props.cancel();
      setLoading(false);
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetailProjectForm',
  };
</script>

<style scoped lang="less"></style>
