import { MockMethod } from "vite-plugin-mock"
import Mock from 'mockjs'

const Random = Mock.Random

const users: MockMethod[] = [
  {
    url: '/api/getUserInfo',
    method: 'post',
    response: () => {
      return {
        code: 200,
        userInfo: {
          nickname: Random.cname(),
          age: Random.natural(10, 100),
          avatar: 'https://majestic.bootmb.com/images/faces/face5.jpg'
        }
      }
    }
  },
  {
    url: '/api/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          token: Random.string(32)
        }
      }
    }
  }
]

export default users