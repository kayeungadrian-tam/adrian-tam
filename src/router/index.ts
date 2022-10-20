import { createRouter, createWebHistory } from 'vue-router';
import LandingPageVue from '../components/LandingPage.vue';
import AboutMeVue from '../components/AboutMe.vue';
import TimelineVue from '../components/TimeLine.vue';
import ProjectsVue from '../components/Projects.vue';

const routes = [
    { path: '/adrian-tam', name: 'home', component: LandingPageVue },
    { path: '/adrian-tam/projects', name: 'projects', component: ProjectsVue },
    { path: '/adrian-tam/about-me', name: 'aboutme', component: AboutMeVue },
    { path: "/adrian-tam/timeline", name: 'timeline', component: TimelineVue },
    // { path: "*", name: 'backhome', component: LandingPageVue }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;