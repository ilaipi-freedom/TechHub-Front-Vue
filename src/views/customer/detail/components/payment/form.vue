<template>
  <a-form ref="formRef" layout="vertical" auto-label-width :model="formData">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-form-item field="payMethod" label="支付方式">
          <a-select
            v-model="formData.payMethod"
            placeholder="Please select ..."
            allow-clear
          >
            <a-option
              v-for="option in fromOptions"
              :key="option.value"
              :value="option.label"
            >
              {{ option.label }}
            </a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="支付时间" field="payTime">
          <a-date-picker
            v-model="formData.payTime"
            show-time
            placeholder="Please select ..."
            class="w-full"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="支付金额" field="amount" validate-trigger="input">
          <a-input v-model="formData.amount" placeholder="Please Enter" />
        </a-form-item>
      </a-col>
    </a-row>
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
        <a-button type="primary" @click="savePayment">保存</a-button>
        <a-button @click="cancel">取消</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, toRef } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';

  import useLoading from '@/hooks/loading';

  import {
    CustomerPayment,
    createCustomerPayment,
    updateCustomerPayment,
  } from '@/api/customer/payment';
  import PaymentMethod from '@/types/PaymentType';

  const { setLoading } = useLoading();

  const fromOptions = Object.entries(PaymentMethod).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  const props = defineProps<{
    payment?: CustomerPayment;
    cancel: () => void;
    refresh: () => Promise<void>;
  }>();
  console.log('========payment', props.payment);

  const formData = toRef(props.payment || ({} as CustomerPayment));
  const formRef = ref<FormInstance>();

  const savePayment = async () => {
    const res = await formRef.value?.validate();
    const payload = formData.value;
    if (!res) {
      setLoading(true);
      if (props.payment?.id) {
        await updateCustomerPayment({ ...payload });
      } else {
        await createCustomerPayment({ ...payload });
      }
      await props.refresh();
      props.cancel();
      setLoading(false);
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetailPaymentForm',
  };
</script>

<style scoped lang="less"></style>
