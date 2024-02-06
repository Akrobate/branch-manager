import HomePage from '@/pages/HomePage.vue'
import ProjectsPage from '@/pages/ProjectsPage.vue'
import RepositoriesPage from '@/pages/RepositoriesPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/projects',
      component: ProjectsPage,
    },
    {
      path: '/repositories',
      component: RepositoriesPage,
    },
  ],
})

export default router
