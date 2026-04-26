import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/Dashboard',
    name: 'dashboard',
    component: () => import('@/views/HomeDashboard.vue'),
  },
  {
    path: '/List',
    name: 'list',
    component: () => import('@/views/HomeListPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
