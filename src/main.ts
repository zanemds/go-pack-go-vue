import { createApp } from "vue";
import App from "./App.vue";
import SetupGuide from "./components/setup/setup-guide.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/home/home.vue";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/setup",
      component: SetupGuide
    },
  ],
});

app.use(router);

// app.component("SetupGuide", SetupGuide);

app.mount("#app");
