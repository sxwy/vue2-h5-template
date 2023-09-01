import VueRouter from 'vue-router'
import { APP_NAME } from '@/constants'

export default (router: VueRouter) => {
  router.beforeEach((to, from, next) => {
    document.title = to.meta?.title ?? APP_NAME
    next()
  })
}
