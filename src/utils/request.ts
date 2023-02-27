import axios from 'axios'
import { useUserStore } from '@/store/modules/user'
import { getToken } from './auth'

const service = axios.create({
  timeout: 5000
})

// request 拦截器
service.interceptors.request.use(config => {
  // 插入token
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(response => {
  return response
}, error => {
  console.log('err' ,error)
  return Promise.reject(error)
})

export default service