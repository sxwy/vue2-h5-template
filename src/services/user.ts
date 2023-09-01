import { baseApi } from '@/api'
import { LoginQuery, Session, User } from '@/types'

/**
 * 登录
 * @param data 参数
 */
export const login = (data: LoginQuery) => {
  return baseApi.request<Session>({
    method: 'POST',
    url: '/api/login/v1.0',
    data
  })
}

/**
 * 刷新 token
 */
export const refreshToken = () => {
  return baseApi.request<Session>({
    method: 'POST',
    url: '/api/refreshToken/v1.0'
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return baseApi.request<User>({
    method: 'POST',
    url: '/api/getUserInfo/v1.0'
  })
}
