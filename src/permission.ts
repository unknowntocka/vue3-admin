import router from "./router"
import { getToken } from "./utils/auth"
import { useUserStore } from "./store/modules/user"

const whiteList = ['/login']

// 全局守卫
router.beforeEach(async(to, from, next) => {
  document.title = '自定义标签名'
  const hasToken = getToken()
  const userStore = useUserStore()
  if (hasToken) {
    if(to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasGetUserInfo = userStore.name
      if (hasGetUserInfo) {
        next()
      } else {
        await userStore.getUserInfo()
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})