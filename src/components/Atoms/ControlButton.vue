<template>
  <button @click="ignition_function()">
    {{ props.label_name }}
  </button>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from "vue";
  const props = defineProps({
    label_name: String,
  });
  interface Emits {
    // 関数名, 引数の型, 返り値の型
    (function_name: string, argument_name: null): void;
  }
  const emits = defineEmits<Emits>();
  const ignition_function = () => {
    emits("ignition_function", null);
  };
</script>
