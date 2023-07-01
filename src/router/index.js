import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue";
import ProfileView from "@/views/ProfileView.vue";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
