<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->

    <input v-model="message" />
    <button type="submit" @click="update_message()">click</button>
    message:{{ message }}
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  // import { reactive, computed } from "vue";
  import axios from "axios";

  // const api_url = ref<string>("hello");
  const api_url = ref<string>("/users");

  const message = ref<string>("");
  onMounted(() => {
    get_message();
  });
  const get_message = () => {
    console.log(`${process.env.VUE_APP_API_BASE_URL}`);
    axios
      .get(api_url.value)
      .then(({ data }) => {
        console.log(data);
        message.value = data.message;
      })
      .catch((error) => console.error(error));
  };
  const update_message = () => {
    axios
      .post(api_url.value)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  };
</script>
