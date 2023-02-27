import { MockMethod } from 'vite-plugin-mock'
import socket from './socket'
import users from './user'


const mocks: MockMethod[] = [
  ...users,
  ...socket
]
export default mocks