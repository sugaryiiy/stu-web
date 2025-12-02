import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/Login/LoginPage.vue'
import OverviewPage from '@/views/Overview/OverviewPage.vue'
import OrdersPage from '@/views/Orders/OrdersPage.vue'
import UsersPage from '@/views/Users/UsersPage.vue'
import SettingsPage from '@/views/Settings/SettingsPage.vue'
import SignatureToolPage from '@/views/SignatureTool/SignatureToolPage.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/',
    name: 'overview',
    component: OverviewPage,
    meta: {
      requiresAuth: true,
      navKey: 'overview'
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersPage,
    meta: {
      requiresAuth: true,
      navKey: 'orders'
    }
  },
  {
    path: '/users',
    name: 'users',
    component: UsersPage,
    meta: {
      requiresAuth: true,
      navKey: 'users'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage,
    meta: {
      requiresAuth: true,
      navKey: 'settings'
    }
  },
  {
    path: '/signature',
    name: 'signature',
    component: SignatureToolPage,
    meta: {
      requiresAuth: true,
      navKey: 'signature'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = Boolean(localStorage.getItem('token'))

  if (to?.meta?.requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  if (to.path === '/login' && isLoggedIn) {
    return next('/')
  }

  next()
})

export default router
