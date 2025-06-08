import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/create-site',
      name: 'create-site',
      component: () => import('../views/CreateSiteView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-site/:id',
      name: 'edit-site',
      component: () => import('../views/EditSiteView.vue'),
      meta: { requiresAuth: true }
  },
  // Ajouter cette route dans votre fichier router
  {
    path: '/sites/:id/preview',
    name: 'SitePreview',
    component: () => import('@/views/SitePreview.vue'),
    meta: { requiresAuth: true }
  }
]
})

// Navigation guard pour vérifier l'authentification
router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return {
        path: '/login',
        query: { redirect: to.fullPath }
      }
    }
  }
})

export default router
