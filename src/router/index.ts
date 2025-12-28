import { createRouter, createWebHistory } from 'vue-router';
import LandingPageVue from '../components/LandingPage.vue';
import AboutMeVue from '../components/AboutMe.vue';
import TimelineVue from '../components/TimeLine.vue';
import ProjectsVue from '../components/Projects.vue';
import ThreeJsPlaygroundVue from '../components/ThreeJsPlayground.vue';
import NewPageVue from '../components/NewPage.vue';

const routes = [
    { path: '/projects', name: 'projects', component: ProjectsVue },
    { path: '/about-me', name: 'aboutme', component: AboutMeVue },
    { path: "/timeline", name: 'timeline', component: TimelineVue },
    { path: "/threejs", name: 'threejs', component: ThreeJsPlaygroundVue },
    { path: "/threejs-ik", name: 'threejsik', component: NewPageVue, meta: { hideChrome: true } },
    { path: "/adrian-tam", name: 'backhome', component: LandingPageVue }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
