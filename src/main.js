import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import '@element-plus/theme-chalk/dist/index.css';
import VueScrollProgressBar from '@guillaumebriday/vue-scroll-progress-bar';
import VueObserveVisibility from 'vue-observe-visibility'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CountryFlag from 'vue-country-flag-next'

library.add(fas, far, fab)

const app = createApp(App);
app
    .use(VueScrollProgressBar)
    .use(router)
    .use(ElementPlus)
    .use(VueObserveVisibility)
        .component("fa", FontAwesomeIcon)
        .use(CountryFlag)
    .mount('#app');