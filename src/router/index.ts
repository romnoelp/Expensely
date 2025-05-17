import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignInView.vue';
import Dashboard from '../views/Dashboard.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    }
  ],
})

export default router
