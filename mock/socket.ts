import { MockMethod } from "vite-plugin-mock"
import Mock from 'mockjs'

const Random = Mock.Random

const socket: MockMethod[] = [
  {
    url: '/api/getMessage',
    method: 'get',
    response: () => {
      return {
        code: 200,
        messageList: [
          {
            nickname: Random.cname(),
            age: Random.natural(10, 100),
            avatar: 'https://majestic.bootmb.com/images/faces/face4.jpg',
            lastMessage: Random.cparagraph(),
            id: Random.id()
          },
          {
            nickname: Random.cname(),
            age: Random.natural(10, 100),
            avatar: 'https://majestic.bootmb.com/images/faces/face2.jpg',
            lastMessage: Random.cparagraph(),
            id: Random.id()
          },
          {
            nickname: Random.cname(),
            age: Random.natural(10, 100),
            avatar: 'https://majestic.bootmb.com/images/faces/face3.jpg',
            lastMessage: Random.cparagraph(),
            id: Random.id()
          }
        ]
      }
    }
  },
  {
    url: 'api/getNotification',
    method: 'get',
    response: () => {
      return {
        code: 200,
        notificationList: [
          {
            icon: '',
            title: '应用错误记录',
            time: Random.datetime()
          },
          {
            icon: '',
            title: '设置',
            time: Random.datetime()
          },
          {
            icon: '',
            title: '新用户注册',
            time: Random.datetime()
          }
        ]
      }
    }
  }
]

export default socket