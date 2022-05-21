import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import '@element-plus/theme-chalk/dist/index.css';
import VueScrollProgressBar from '@guillaumebriday/vue-scroll-progress-bar';
import VueObserveVisibility from 'vue-observe-visibility'

const app = createApp(App);
app
    .use(VueScrollProgressBar)
    .use(router)
    .use(ElementPlus)
    .use(VueObserveVisibility)
    .mount('#app');