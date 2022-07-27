import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ProjectOne from "../components/Projects/ProjectOne.vue"
import ProjectTwo from "../components/Projects/ProjectTwo.vue"
import ProjectThree from "../components/Projects/ProjectThree.vue"
import ProjectFour from "../components/Projects/ProjectFour.vue"


import HelloWorld from "../components/HelloWorld.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HelloWorld
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
    path: '/case-studies/1',
    name: 'project-one',
    component: ProjectOne
  },
  {
    path: '/case-studies/2',
    name: 'project-two',
    component: ProjectTwo
  },
  {
    path: '/case-studies/3',
    name: 'project-three',
    component: ProjectThree
  },
  {
    path: '/case-studies/4',
    name: 'project-four',
    component: ProjectFour
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),  routes,

})

export default router
