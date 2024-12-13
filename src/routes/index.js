import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/coins',
        name: 'Coin',
        component: () => import('../views/Coin.vue')
    },
    {
        path: '/trending',
        name: 'Trending',
        component: () => import('../views/Trending.vue')
    },
    {
        path: '/exchange',
        name: 'Exchange',
        component: () => import('../views/Exchange.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router