<template>
  <a-scrollbar style="height: 400px; overflow-y: auto">
    <div v-if="read">
      <mavon-editor
        v-if="value"
        v-model="text"
        style="height: 100%"
        :subfield="false"
        :toolbars-flag="false"
        default-open="preview"
      />
      <p v-else>-</p>
    </div>
    <mavon-editor
      v-else
      v-model="text"
      style="height: 100%"
      :subfield="false"
      default-open="edit"
      @save="save"
      @change="save"
    />
  </a-scrollbar>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const props = defineProps<{
    read: boolean;
    value: string;
    save?: (v: string) => void;
  }>();

  const text = ref<string>(props.value);
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetailEditor',
  };
</script>
