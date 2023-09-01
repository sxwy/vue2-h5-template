import { Module } from 'vuex'
import { login, getUserInfo, refreshToken } from '@/services'
import { LoginQuery, Session, User } from '@/types'
import { UserState, StoreState } from '../type'

export const SET_SESSION = 'SET_SESSION'
export const SET_CURRENT = 'SET_CURRENT'
export const CLEAR_STATE = 'CLEAR_STATE'

export const user: Module<UserState, StoreState> = {
  namespaced: true,
  state: {
    session: null,
    current: null
  },
  mutations: {
    [SET_SESSION](state, session: Session) {
      state.session = session
    },
    [SET_CURRENT](state, current: User) {
      state.current = current
    },
    [CLEAR_STATE](state) {
      state.session = null
      state.current = null
    }
  },
  actions: {
    /**
     * 登录初始化
     * @param payload 参数
     */
    async loginInit({ commit }, payload: LoginQuery) {
      const result = await login(payload)
      commit(SET_SESSION, result)
    },
    /**
     * 更新会话信息
     */
    async updateSession({ commit }) {
      const result = await refreshToken()
      commit(SET_SESSION, result)
    },
    /**
     * 获取用户信息
     */
    async userInit({ commit }) {
      const result = await getUserInfo()
      commit(SET_CURRENT, result)
    },
    /**
     * 退出登录
     */
    logout({ commit }) {
      commit(CLEAR_STATE)
    }
  }
}
