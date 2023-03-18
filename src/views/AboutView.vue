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

  // interface PackageInfo {
  //   version: string;
  // }
  // const api_url = ref<string>("index");
  // const packageInfo = JSON.parse(
  //   (import.meta as any).env.PACKAGE_INFO
  // ) as PackageInfo;
  // const app_version = computed(() => {
  //   return packageInfo.version;
  // });

  const message = ref<string>("/");

  onMounted(() => {
    get_message();
  });
  const get_message = () => {
    axios
      .get(message.value)
      .then(({ data }) => {
        console.log(data);
        message.value = data.message;
      })
      .catch((error) => console.error(error));
  };
</script>
