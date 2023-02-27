import request from '@/utils/request'

// 实际应该使用 websocket 实时获取
// 获取消息
export const getMessage = () => {
  return request.get('api/getMessage')
}

// 获取提醒
export const getNotification = () => {
  return request.get('api/getNotification')
}