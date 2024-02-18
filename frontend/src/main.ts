import "./assets/main.css";
import TheLayout from "./components/TheLayout.vue";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.component("TheLayout", TheLayout);

app.use(createPinia());
app.use(router);

app.mount("#app");
