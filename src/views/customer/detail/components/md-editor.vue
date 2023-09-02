<template>
  <div v-if="read">
    <a-scrollbar v-if="value" style="height: 400px; overflow-y: auto">
      <mavon-editor
        v-model="text"
        style="height: 100%"
        :subfield="false"
        :toolbars-flag="false"
        default-open="preview"
      />
    </a-scrollbar>
    <p v-else>-</p>
  </div>
  <div v-else>
    <mavon-editor
      v-model="text"
      style="height: 100%"
      :subfield="false"
      default-open="edit"
      @save="save"
      @change="save"
    />
  </div>
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
