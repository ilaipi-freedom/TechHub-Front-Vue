<template>
  <a-form ref="formRef" layout="vertical" auto-label-width :model="formData">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item field="from" label="来源">
          <a-select
            v-model="formData.from"
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
      <a-col :span="12">
        <a-form-item field="status" label="状态">
          <a-select
            v-model="formData.status"
            placeholder="Please select ..."
            allow-clear
          >
            <a-option
              v-for="option in statusOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-form-item label="首聊时间" field="firstMessageTime">
          <a-date-picker
            v-model="formData.firstMessageTime"
            show-time
            placeholder="Please select ..."
            class="w-full"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="接单时间"
          field="orderTime"
          validate-trigger="input"
        >
          <a-date-picker
            v-model="formData.orderTime"
            show-time
            placeholder="Please select ..."
            class="w-full"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="交付时间"
          field="deliveryTime"
          validate-trigger="input"
        >
          <a-date-picker
            v-model="formData.deliveryTime"
            show-time
            placeholder="Please select ..."
            class="w-full"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item field="industry" label="行业类型">
          <a-textarea
            v-model="formData.industry"
            placeholder="please enter your industry..."
            :style="{ minHeight: '50px' }"
            auto-size
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="industryDetail" label="行业详情">
          <a-textarea
            v-model="formData.industryDetail"
            placeholder="please enter your industryDetail..."
            :style="{ minHeight: '50px' }"
            auto-size
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item field="content" label="内容">
          <a-textarea
            v-model="formData.content"
            placeholder="please enter your content..."
            :style="{ minHeight: '50px' }"
            auto-size
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="repo" label="仓库">
          <a-textarea
            v-model="formData.repo"
            placeholder="please enter your repo..."
            :style="{ minHeight: '50px' }"
            auto-size
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item label="详情" field="detail" validate-trigger="input">
      <a-textarea
        v-model="formData.detail"
        placeholder="please enter your detail..."
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
        <a-button type="primary" @click="saveOrder">保存</a-button>
        <a-button @click="cancel">取消</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, toRef } from 'vue';
  import { useRoute } from 'vue-router';
  import { FormInstance } from '@arco-design/web-vue/es/form';

  import useLoading from '@/hooks/loading';

  import {
    CustomerOrder,
    createCustomerOrder,
    updateCustomerOrder,
  } from '@/api/customer/order';
  import { OrderFrom, OrderStatus } from '@/types/OrderType';

  const { setLoading } = useLoading();
  const route = useRoute();
  const customerId = ref<string>(route.params.id as string);
  const props = defineProps<{
    order?: CustomerOrder;
    cancel: () => void;
    refresh: () => Promise<void>;
  }>();

  const formData = toRef(props.order || ({} as CustomerOrder));
  const formRef = ref<FormInstance>();

  const fromOptions = Object.entries(OrderFrom).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  const statusOptions = Object.keys(OrderStatus)
    .filter((key) => !Number.isNaN(Number(key)))
    .map((key) => ({
      label: OrderStatus[key as keyof typeof OrderStatus],
      value: key,
    }));

  const saveOrder = async () => {
    const res = await formRef.value?.validate();
    const payload = formData.value;
    if (!res) {
      setLoading(true);
      if (props.order?.id) {
        await updateCustomerOrder(payload);
      } else {
        await createCustomerOrder({ ...payload, customerId: customerId.value });
      }
      await props.refresh();
      props.cancel();
      setLoading(false);
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetailOrderForm',
  };
</script>

<style scoped lang="less"></style>
