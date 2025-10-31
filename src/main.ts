import { createApp } from 'vue';
import App from './App.vue';
import Setup from './components/setup/setup.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/home/home.vue';
import { gpgRoute, setupRoutes } from './dal/models/route.model';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createStore } from 'vuex';
import {
  faHandPointRight,
  faHandPointUp,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const store = createStore({
  state() {
    return {};
  },
});

const app = createApp(App);

app.use(store);

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
        {
          path: setupRoutes.WELCOME,
          component: () => import('./components/setup/pages/setup-welcome.vue'),
        },
        {
          path: setupRoutes.BRIDGE,
          component: () => import('./components/setup/pages/setup-bridge.vue'),
        },
        {
          path: setupRoutes.DETAILS,
          component: () => import('./components/setup/pages/setup-details.vue'),
        },
      ],
    },
  ],
});

const icons = [faHouse, faHandPointRight, faHandPointUp];

library.add(icons);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');
