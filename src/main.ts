import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = "http://localhost:3000";

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router).mount("#app");
