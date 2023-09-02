<template>
  <a-card>
    <template #title>项目信息</template>
    <template #extra>
      <a-button v-if="customerId && !addingProject" type="primary" @click="add">
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
          <template #title>项目 {{ projects.length - index }}</template>
          <template #extra>
            <a-link type="primary" @click="() => edit(item.id as string)">
              编辑
            </a-link>
          </template>
          <a-descriptions layout="inline-vertical" bordered :column="2">
            <a-descriptions-item key="id" label="项目id">
              <p>{{ item.id }}</p>
            </a-descriptions-item>
            <a-descriptions-item key="title" label="项目名称">
              <p>{{ item.title }}</p>
            </a-descriptions-item>
            <a-descriptions-item key="begin" label="开始时间">
              <p>
                {{
                  item.begin
                    ? dayjs(item.begin).format('YYYY-MM-DD HH:mm')
                    : '-'
                }}
              </p>
            </a-descriptions-item>
            <a-descriptions-item key="end" label="结束时间">
              <p>
                {{
                  item.end ? dayjs(item.end).format('YYYY-MM-DD HH:mm') : '-'
                }}
              </p>
            </a-descriptions-item>
            <a-descriptions-item key="description" label="项目描述">
              <MDEditor :value="item.description as string" read />
            </a-descriptions-item>
            <a-descriptions-item key="content" label="项目内容">
              <MDEditor :value="item.content as string" read />
            </a-descriptions-item>
            <a-descriptions-item key="extra" label="项目备注">
              <MDEditor :value="item.extra as string" read />
            </a-descriptions-item>
          </a-descriptions>
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
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import dayjs from 'dayjs';

  import useLoading from '@/hooks/loading';
  import { useCustomerStore } from '@/store/';
  import {
    CustomerProject,
    queryCustomerProjectList,
  } from '@/api/customer/project';

  import CustomerDetailProjectForm from './form.vue';
  import MDEditor from '../md-editor.vue';

  const customerStore = useCustomerStore();

  const { customerId } = storeToRefs(customerStore);
  const editingId = ref<string>();

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
