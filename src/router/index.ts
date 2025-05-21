import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase.ts'
import SignIn from '../views/SignInView.vue'
import Dashboard from '../views/DashboardView.vue'
import Transactions from '../views/TransactionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions,
      meta: { requiresAuth: true },
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },
  ],
})

// This middleware, basically checkes if there's a session
// and the path you're going to requiresAuth.
router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isAuthenticated = !!session

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/signin')
  } else if (to.path === '/signin' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
