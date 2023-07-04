import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue";
import ProfileView from "@/views/ProfileView.vue";
import ExpensesView from "@/views/ExpensesView.vue";
import ReportsView from "@/views/ReportsView.vue";
import SettingsView from "@/views/SettingsView.vue";
import {useStore} from "vuex";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
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
        component: DashboardView,
        meta: {requiresAuth: true}
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        meta: {requiresAuth: true}
    },
    {
        path: '/expenses',
        name: 'expenses',
        component: ExpensesView,
        meta: {requiresAuth: true}
    },
    {
        path: '/reports',
        name: 'reports',
        component: ReportsView,
        meta: {requiresAuth: true}
    },
    {
        path: '/settings',
        name: 'settings',
        component: SettingsView,
        meta: {requiresAuth: true}
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: LoginView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,

})

router.beforeEach((to, from, next) => {
    const store = useStore()
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.currentUserName === '') {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router
