import { createApp } from "vue";
import App from "./App.vue";
import Setup from "./components/setup/setup.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/home/home.vue";
import { gpgRoute, setupRoutes } from "./dal/models/route.model";
import SetupWelcome from "./components/setup/pages/setup-welcome.vue";
import SetupBridge from "./components/setup/pages/setup-bridge.vue";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: gpgRoute.root,
      redirect: gpgRoute.home,
    },
    {
      path: gpgRoute.home,
      component: Home,
    },
    {
      path: gpgRoute.setup,
      component: Setup,
      children: [
        { path: setupRoutes.WELCOME, component: SetupWelcome },
        { path: setupRoutes.BRIDGE, component: SetupBridge },
      ],
    },
  ],
});

app.use(router);

// app.component("SetupGuide", SetupGuide);

app.mount("#app");
