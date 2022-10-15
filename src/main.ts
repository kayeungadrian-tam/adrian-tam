import { createApp } from "vue";

import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

import App from "./App.vue";
import router from "./router/index";
import VueObserveVisibility from 'vue-observe-visibility'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'


import {
    faBars,
    faBriefcase,
    faRectangleList,
    faUser,
    faUserSecret,
    faHouse,
    faTimeline,
    faSchool,
    faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons'

import {
    faGithub,
    faLinkedin,
    faFacebook
} from '@fortawesome/free-brands-svg-icons'







import "./style.css";


library.add(
    faUserSecret,
    faBriefcase,
    faGithub,
    faUser,
    faRectangleList,
    faHouse,
    faTimeline,
    faBars,
    faSchool,
    faArrowUpRightFromSquare,
    faLinkedin,
    faFacebook
)



const app = createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(VueObserveVisibility);

// app.component('video-background', VideoBackground);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.component('fa', FontAwesomeIcon);
app.mount("#app");
