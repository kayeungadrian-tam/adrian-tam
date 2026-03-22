import { createApp } from "vue";

import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

import App from "./App.vue";
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
    faArrowUpRightFromSquare,
    faLightbulb,
    faVolumeHigh,
    faVolumeXmark,
    faMousePointer,
    faFileAlt,
    faCube,
    faLocationDot,
    faDownload,
    faCode,
    faRocket,
    faChartLine,
    faEnvelope,
    faTimes,
    faDoorOpen
} from '@fortawesome/free-solid-svg-icons'

import {
  faGithub,
  faLinkedin,
  faGoogle,
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
    faLightbulb,
    faVolumeHigh,
    faVolumeXmark,
    faMousePointer,
    faLinkedin,
    faGoogle,
    faFacebook,
    faFileAlt,
    faCube,
    faLocationDot,
    faDownload,
    faCode,
    faRocket,
    faChartLine,
    faEnvelope,
    faTimes,
    faDoorOpen
)

const app = createApp(App)
    .use(ElementPlus)
    .use(VueObserveVisibility);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.component('fa', FontAwesomeIcon);
app.mount("#app");
