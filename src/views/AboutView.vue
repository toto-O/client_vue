<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    message:{{ message }}
  </div>
  <!-- app_version:{{ app_version }} -->
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  // import { computed } from "vue";
  import axios from "axios";

  const message = ref<string>("/");

  onMounted(() => {
    get_message();
  });
  const get_message = () => {
    console.log(`${process.env.VUE_APP_API_BASE_URL}`);
    axios
      .get(message.value)
      .then(({ data }) => {
        console.log(data);
        message.value = data.message;
      })
      .catch((error) => console.error(error));
  };
</script>
