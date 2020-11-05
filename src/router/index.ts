import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { authGuard } from "../auth/authGuard.ts";
import Home from '../views/Home.vue'


import Profile from "../views/Profile.vue";



Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/army/:id',
    name: 'Army',
    component: () => import('../views/Army.vue')
  },
  {
    path: '/unit/:id',
    name: 'Unit',
    component: () => import('../views/Unit.vue')
  },
  {
    path: '/createarmy',
    name: 'CreateArmy',
    component: () => import('../views/CreateArmy.vue')
  },
  {
    path: '/createunit/:id',
    name: 'CreateUnit',
    component: () => import('../views/CreateUnit.vue')
  },
  {
    path: '/fb',
    name: 'Firebase',
    component: () => import('../views/FirebaseTest.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: authGuard,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
