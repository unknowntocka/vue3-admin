import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import '@icon-park/vue-next/styles/index.css'
import store from './store'

import '@/permission'

const app = createApp(App)
app
  .use(ElementPlus)
  .use(router)
  .use(store)
  .mount('#app')

