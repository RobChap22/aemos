import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
