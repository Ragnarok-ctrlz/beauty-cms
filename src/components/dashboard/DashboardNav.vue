<!-- src/components/dashboard/DashboardNav.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="font-bold text-xl text-primary">
              <span class="text-secondary">BeautifyMe</span>
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link 
              to="/dashboard" 
              class="border-transparent text-gray-500 dark:text-gray-300 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="{ 'border-primary text-primary': isActive('dashboard') }"
            >
              Tableau de bord
            </router-link>
            <router-link 
              to="/create-site" 
              class="border-transparent text-gray-500 dark:text-gray-300 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="{ 'border-primary text-primary': isActive('create-site') }"
            >
              Créer un site
            </router-link>
          </div>
        </div>
        <div class="flex items-center">
          <div class="ml-3 relative">
            <div>
              <button 
                @click="toggleProfileMenu" 
                class="bg-white dark:bg-gray-700 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span class="sr-only">Ouvrir le menu utilisateur</span>
                <div v-if="user" class="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                  {{ userInitials }}
                </div>
              </button>
            </div>
            <div 
              v-if="isProfileMenuOpen"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            >
              <div class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <div class="font-medium">{{ user?.displayName || 'Utilisateur' }}</div>
                <div class="truncate">{{ user?.email }}</div>
              </div>
              <button
                @click="toggleDarkMode"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span v-if="isDarkMode">Mode clair</span>
                <span v-else>Mode sombre</span>
              </button>
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { signOut } from 'firebase/auth'
import { useCurrentUser } from 'vuefire'
import { auth } from '@/firebase'

const router = useRouter()
const route = useRoute()
const user = useCurrentUser()

const isProfileMenuOpen = ref(false)

// Obtenir les initiales de l'utilisateur pour l'avatar
const userInitials = computed(() => {
  if (!user.value?.displayName) return '?'
  
  return user.value.displayName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

// Vérifier si un lien est actif
const isActive = (routeName) => {
  return route.name === routeName
}

// Vérifier le mode sombre
const isDarkMode = computed(() => {
  return document.documentElement.classList.contains('dark')
})

// Basculer le mode sombre
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
  isProfileMenuOpen.value = false
}

// Ouvrir/fermer le menu profil
const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

// Gestion de la déconnexion
const handleLogout = async () => {
  try {
    await signOut(auth)
    isProfileMenuOpen.value = false
    router.push('/login')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  }
}
</script>