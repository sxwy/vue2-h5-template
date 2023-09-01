import { RouteConfig } from 'vue-router'

/** 异常相关路由 */
export default [
  // 404
  {
    name: 'ExceptionNotFoundIndex',
    path: '/exception/not-found/index',
    component: () => import('@/pages/exception/not-found/index.vue'),
    meta: {
      title: '404'
    }
  }
] as RouteConfig[]
