import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

const localService = axios.create({
  baseURL: 'http://127.0.0.1:8090/localMac/',
  timeout: 6000, // request timeout
  crossDomain: true
})

localService.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
localService.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
localService.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default localService
