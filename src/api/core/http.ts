import axios from 'axios'
import store from '@/store'
import { createHTTPError, defaultErrorCode, defaultErrorMessage } from './error'

let isRefreshToken = false // 是否正在刷新 token
let httpList: (() => void)[] = [] // 暂存多余请求队列

export default (requestConfig = {}) => {
  const http = axios.create(requestConfig)

  http.interceptors.request.use(
    (config) => {
      if (store.state.user.session?.token && !config.headers.Authorization) {
        config.headers.set(
          'Authorization',
          `Bearer ${store.state.user.session.token}`
        )
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  http.interceptors.response.use(
    async (response) => {
      if (Object.prototype.toString.call(response.data) === '[object Object]') {
        const keys = Reflect.ownKeys(response.data)
        if (keys.includes('code') || keys.includes('returncode')) {
          const code = String(response.data.code || response.data.returncode)
          if (code === '10000') {
            return response.data.body
          } else if (code === '401') {
            if (isRefreshToken) {
              // 暂存多余请求
              return new Promise((resolve) => {
                Reflect.deleteProperty(response.config.headers, 'Authorization')
                httpList.push(() => {
                  resolve(http.request(response.config))
                })
              })
            } else {
              isRefreshToken = true
              try {
                await store.dispatch('user/updateSession')
              } catch (error) {
                httpList = []
                isRefreshToken = false
                return Promise.reject(error)
              }
              // 重新执行暂存的多余请求
              httpList.forEach((cb) => {
                cb()
              })
              httpList = [] // 全部执行完则清空暂存队列
              isRefreshToken = false
              Reflect.deleteProperty(response.config.headers, 'Authorization')
              return http.request(response.config)
            }
          } else {
            return Promise.reject(
              createHTTPError(
                code,
                response.data.message,
                response.config,
                response
              )
            )
          }
        } else if (keys.includes('flag')) {
          const flag = response.data.flag
          if (flag) {
            return response.data.data
          } else {
            return Promise.reject(
              createHTTPError(
                defaultErrorCode,
                response.data.msg,
                response.config,
                response
              )
            )
          }
        } else {
          return Promise.reject(
            createHTTPError(
              defaultErrorCode,
              defaultErrorMessage,
              response.config,
              response
            )
          )
        }
      } else {
        return Promise.reject(
          createHTTPError(
            defaultErrorCode,
            defaultErrorMessage,
            response.config,
            response
          )
        )
      }
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return http
}
