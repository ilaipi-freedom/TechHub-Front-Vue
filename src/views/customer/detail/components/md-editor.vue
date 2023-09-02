<template>
  <div v-if="read">
    <a-scrollbar v-if="value" style="height: 400px; overflow-y: auto">
      <mavon-editor
        v-model="text"
        style="height: 100%"
        :subfield="false"
        :toolbars-flag="false"
        default-open="preview"
        :external-link="externalLink"
      />
    </a-scrollbar>
    <p v-else>-</p>
  </div>
  <div v-else>
    <a-scrollbar v-if="value" style="height: 400px; overflow-y: auto">
      <mavon-editor
        v-model="text"
        style="height: 100%"
        :subfield="false"
        default-open="edit"
        :external-link="externalLink"
        @save="save"
        @change="save"
      />
    </a-scrollbar>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const props = defineProps<{
    read: boolean;
    value?: string;
    save?: (v: string) => void;
  }>();

  const text = ref<string | undefined>(props.value);

  const externalLink = {
    markdown_css: false,
    hljs_js: () => '/md/highlightjs/highlight.min.js',
    hljs_css: (css: string) => `/md/highlightjs/styles/${css}.min.css`,
    hljs_lang: (lang: string) => `/md/highlightjs/languages/${lang}.min.js`,
    katex_css: () => '/md/katex/katex.min.css',
    katex_js: () => '/md/katex/katex.min.js',
  };
</script>

<script lang="ts">
  export default {
    name: 'CustomerDetailEditor',
  };
</script>
