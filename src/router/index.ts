'use strict'

import { createRouter, createWebHistory } from 'vue-router'
import Middleware from '@/middleware'
import module from './module/index'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/',
            name: 'App',
            component: { template: '<router-view></router-view>' },
            children: module,
        },
    ],
})

Middleware(router)
export default router
