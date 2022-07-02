import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectOne from "../components/Projects/ProjectOne.vue"
import ProjectTwo from "../components/Projects/ProjectTwo.vue"
import ProjectThree from "../components/Projects/ProjectThree.vue"


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/project_1',
    name: 'project-one',
    component: ProjectOne
  },
  {
    path: '/project_2',
    name: 'project-two',
    component: ProjectTwo
  },
  {
    path: '/project_3',
    name: 'project-three',
    component: ProjectThree
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
