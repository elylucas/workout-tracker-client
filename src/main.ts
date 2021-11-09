import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import Button from '@/components/Button.vue';

const app = createApp(App);

app.component('Button', Button);

app.use(router).mount('#app');
