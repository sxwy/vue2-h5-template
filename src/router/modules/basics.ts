import { RouteConfig } from 'vue-router'

/** 基础相关路由 */
export default [
  // 首页路由
  {
    path: '/',
    redirect: '/demo/index'
  },
  // 兜底路由
  {
    path: '/:catchAll(.*)',
    redirect: '/exception/not-found/index'
  }
] as RouteConfig[]
