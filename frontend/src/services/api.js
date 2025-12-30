import axios from 'axios'
import { attachInterceptors } from './interceptors'

const api = axios.create({
  baseURL: '/api',
})

attachInterceptors(api)

export default api
