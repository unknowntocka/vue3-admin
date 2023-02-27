import { UserLoginInfo } from '@/interfaces/user'
import request from '@/utils/request'

export const login = (data: UserLoginInfo) => {
  return request.post('/api/login', data)
}

export const getInfo = () => {
  return request.post('/api/getUserInfo')
}