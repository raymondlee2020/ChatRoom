import Vue from 'vue'
import Router from 'vue-router'
import vuex from '@/store'
import LoginBlock from '@/components/LoginBlock'
import ChatBlock from '@/components/ChatBlock'

Vue.use(Router);

const router = new Router({
    mode:"history",
    routes: [
        { path: '', redirect: '/login'},
        {
            path: '/chat',
            component: ChatBlock
        },
        {
            path: '/login',
            component: LoginBlock
        }
    ]
})

export default router;