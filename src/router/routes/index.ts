import type { RouteRecordRaw } from 'vue-router'
import { authRoutes } from './auth.routes'
import { dashboardRoutes } from './dashboard.routes'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  ...authRoutes,
  ...dashboardRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  }
]
