import { getToken, setToken } from '@/utils/auth'
import { defineStore } from 'pinia'
import { getInfo, login } from '@/api/user'
import { UserLoginInfo } from '@/interfaces/user'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: getToken(),
      name: '',
      avatar: ''
    }
  },
  actions: {
    updateUserInfo(name: string) {
      this.name = name
    },
    updateAvatar(avatarUrl: string) {
      this.avatar = avatarUrl
    },
    async getUserInfo() {
      const res = await getInfo()
      const { nickname, avatar } = res.data.userInfo
      this.updateAvatar(avatar)
      this.updateUserInfo(nickname)
    },
    async login(userLoginInfo: UserLoginInfo) {
      const res = await login(userLoginInfo)
      setToken(res.data.data.token)
    }
  }
})