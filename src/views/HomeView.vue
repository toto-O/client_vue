<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  </div>
  {{ version }}
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  // import { reactive, computed } from "vue";

  // const api_url = ref("");
  const version = ref<string>("vue3");
  onMounted(() => {
    // this.axios.get()
  });
</script>
