import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { authGuard } from "../auth/authGuard";
import Home from '../views/Home.vue'


import ExternalApiView from "../views/ExternalApi.vue";



Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: authGuard,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/army/:id',
    name: 'Army',
    component: () => import('../views/Army.vue'),
    // beforeEnter: authGuard,
  },
  {
    path: '/unit/:id',
    name: 'Unit',
    component: () => import('../views/Unit.vue'),
    // beforeEnter: authGuard,
  },
  {
    path: '/createarmy',
    name: 'CreateArmy',
    component: () => import('../views/CreateArmy.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/createunit/:id',
    name: 'CreateUnit',
    component: () => import('../views/CreateUnit.vue'),
    beforeEnter: authGuard,
  },
  {
    path: "/external-api",
    name: "external-api",
    component: ExternalApiView,
    beforeEnter: authGuard
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
