import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/components/pages/HomePage'
import CredentialsPage from '@/components/pages/CredentialsPage'
import ProjectsPage from '@/components/pages/ProjectsPage'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage,
        },
        {
            path: '/credentials',
            name: 'CredentialsPage',
            component: CredentialsPage,
        },
        {
            path: '/projects',
            name: 'ProjectsPage',
            component: ProjectsPage,
        },
    ],
})
