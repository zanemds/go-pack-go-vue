import { createApp } from 'vue';
import App from './App.vue';
import SetupGuide from './components/setup-guide.vue';

const app = createApp(App);

app.component('SetupGuide', SetupGuide);

app.mount('#app');
