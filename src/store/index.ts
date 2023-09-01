import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { STORE_CACHE_KEY } from '@/constants'
import { user } from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  plugins: [
    createPersistedState({
      key: STORE_CACHE_KEY,
      storage: sessionStorage
    })
  ]
})

export default store
