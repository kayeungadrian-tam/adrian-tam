import { createRouter, createWebHistory } from 'vue-router';
import LandingPageVue from '../components/LandingPage.vue';
import AboutMeVue from '../components/AboutMe.vue';
import TimelineVue from '../components/TimeLine.vue';
import ProjectsVue from '../components/Projects.vue';

const routes = [
    { path: '/', name: 'home', component: LandingPageVue },
    { path: '/projects', name: 'projects', component: ProjectsVue },
    { path: '/about-me', name: 'aboutme', component: AboutMeVue },
    { path: "/timeline", name: 'timeline', component: TimelineVue }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;