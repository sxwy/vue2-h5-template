import Vue from 'vue'
import VueRouter from 'vue-router'
import { BASE_SITE } from '@/constants'
import guard from './guard'
import { basicsRoutes, exceptionRoutes, demoRoutes } from './modules'

Vue.use(VueRouter)

const routes = [...exceptionRoutes, ...demoRoutes, ...basicsRoutes]

const router = new VueRouter({
  mode: 'history',
  base: BASE_SITE,
  routes
})

guard(router)

export default router
