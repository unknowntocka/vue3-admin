import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from '@/layout/index.vue'

export type CustomRoute = RouteRecordRaw & {
  hidden?: boolean
  meta?: {
    title?: string
    icon?: string
  }
}

const constantRoutes: CustomRoute[] = [
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: {
          icon: 'dashboard',
          title: '仪表盘'
        }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/form/abc',
    meta: {
      icon: 'form-one',
      title: '表单'
    },
    children: [
      {
        path: 'abc',
        component: () => import('@/views/Form/index.vue'),
        meta: {
          icon: 'agreement',
          title: '协议'
        },
      },
      {
        path: 'bcd',
        component: () => import('@/views/Form/index.vue'),
        meta: {
          icon: 'box',
          title: '收集箱'
        },
      },
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

