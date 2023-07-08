<template>
  <a-card>
    <template #title>项目信息</template>
    <template #extra>
      <a-button v-if="!addingProject" type="primary" @click="add">
        添加
      </a-button>
    </template>
    <a-grid :row-gap="15">
      <a-grid-item v-if="!!addingProject" class="list-col" :span="24">
        <CustomerDetailProjectForm
          :cancel="removeAdding"
          :refresh="initProjects"
        />
      </a-grid-item>
      <a-grid-item
        v-for="(item, index) in projects"
        :key="item.id"
        class="list-col"
        :span="24"
      >
        <a-card v-if="editingId !== item.id" :bordered="false">
          <template #title>支付次数：{{ projects.length - index }}</template>
          <template #extra>
            <a-link type="primary" @click="() => edit(item.id as string)">
              编辑
            </a-link>
          </template>
          <a-descriptions
            :data="transformProject(item as CustomerProject)"
            layout="inline-vertical"
            bordered
            :column="2"
          />
        </a-card>
        <CustomerDetailProjectForm
          v-if="editingId === item.id"
          :project="item as CustomerProject"
          :cancel="cancelEdit"
          :refresh="initProjects"
        />
      </a-grid-item>
    </a-grid>
  </a-card>
</template>

<script lang="ts" setup>
  import { h, ref, RenderFunction } from 'vue';
  import { useRoute } from 'vue-router';
  import dayjs from 'dayjs';

  import useLoading from '@/hooks/loading';
  import {
    CustomerProject,
    queryCustomerProjectList,
  } from '@/api/customer/project';

  import { DescData } from '@arco-design/web-vue';
  import CustomerDetailProjectForm from './form.vue';

  const route = useRoute();
  const customerId = ref<string>(route.params.id as string);
  const editingId = ref<string>();

  const fieldsMap: {
    key: string;
    label: string;
    format?: (v: string) => string | RenderFunction;
  }[] = [
    {
      key: 'id',
      label: '项目id',
      format:
        (v: string): RenderFunction =>
        () =>
          renderId(v),
    },
    {
      key: 'title',
      label: '项目名称',
    },
    {
      key: 'begin',
      label: '开始时间',
      format: (v: string): string =>
        v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-',
    },
    {
      key: 'begin',
      label: '结束时间',
      format: (v: string): string =>
        v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-',
    },
    {
      key: 'description',
      label: '项目描述',
      format: (v: string) => () => renderProjectText(v),
    },
    {
      key: 'content',
      label: '项目内容',
      format: (v: string) => () => renderProjectText(v),
    },
    {
      key: 'extra',
      label: '项目备注',
      format: (v: string) => () => renderProjectText(v),
    },
  ];
  const transformProject = (project: CustomerProject): DescData[] => {
    const descData: DescData[] = [];

    const transformedFields = fieldsMap.map(({ key, label, format }) => ({
      label,
      value: format
        ? format(project[key as keyof CustomerProject] as string)
        : project[key as keyof CustomerProject],
    }));

    return [...descData, ...transformedFields] as DescData[];
  };

  const renderProjectText = (itemContent: string) =>
    itemContent
      ? h('div', { class: 'multiline-text-container' }, [
          h('pre', { class: 'multiline-text' }, itemContent),
        ])
      : '-';
  const renderId = (id: string) => h('p', {}, id);

  const { setLoading } = useLoading();
  const projects = ref<Partial<CustomerProject>[]>([]);
  const addingProject = ref<Partial<CustomerProject>>();
  const initProjects = async () => {
    if (!customerId.value) {
      return;
    }
    setLoading(true);
    const { data } = await queryCustomerProjectList(customerId.value);
    projects.value = data;
    setLoading(false);
  };
  initProjects();

  const edit = (id: string) => {
    editingId.value = id;
  };
  const cancelEdit = () => {
    editingId.value = undefined;
  };

  const add = () => {
    addingProject.value = {};
  };
  const removeAdding = () => {
    addingProject.value = undefined;
  };
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetailProject',
  };
</script>

<style scoped lang="less"></style>
