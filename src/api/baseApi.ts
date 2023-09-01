import { createHTTP } from './core'
import { BASE_API } from '@/constants'

const baseApi = createHTTP({
  baseURL: BASE_API,
  header: { 'Content-Type': 'application/json' }
})

export default baseApi
