<!-- src/views/DashboardView.vue -->
<template>
  <div>
    <DashboardNav />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Tableau de bord</h1>
        <p class="mt-1 text-gray-600 dark:text-gray-300">Gérez vos sites web d'institut de beauté</p>
      </div>
      
      <div v-if="isLoading" class="text-center py-12">
        <svg class="animate-spin h-10 w-10 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-4 text-gray-600 dark:text-gray-300">Chargement de vos sites...</p>
      </div>
      
      <div v-else>
        <!-- Aucun site existant -->
        <div v-if="userSites.length === 0" class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 10.5v6m-3-3h6" />
          </svg>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Vous n'avez pas encore de site</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">Créez votre premier site d'institut de beauté en quelques minutes</p>
          <router-link to="/create-site" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Créer un site
          </router-link>
        </div>
        
        <!-- Liste des sites existants -->
        <div v-else>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Vos sites</h2>
            <router-link to="/create-site" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Nouveau site
            </router-link>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="site in userSites" :key="site.id" class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div class="h-40 bg-gray-200 dark:bg-gray-700 relative">
                <!-- Image de prévisualisation du site -->
                <img :src="getSiteThumbnail(site)" :alt="site.name" class="w-full h-full object-cover" />
                <div class="absolute top-0 right-0 m-2">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    site.published ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  ]">
                    {{ site.published ? 'Publié' : 'Brouillon' }}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">{{ site.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {{ site.description || 'Aucune description' }}
                </p>
                <div class="flex justify-between">
                  <router-link :to="`/edit-site/${site.id}`" class="text-primary hover:text-opacity-80 text-sm font-medium">
                    Modifier
                  </router-link>
                  <button 
                    @click="openSitePreview(site)"
                    :class="['text-sm font-medium', site.published ? 'text-gray-600 dark:text-gray-300 hover:text-primary' : 'text-gray-400 dark:text-gray-500']"
                  >
                    {{ site.published ? 'Voir le site' : 'Aperçu' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCurrentUser } from 'vuefire'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import DashboardNav from '@/components/dashboard/DashboardNav.vue'
import { getPlaceholderImage } from '@/utils/imageUtils'

const user = useCurrentUser()
const userSites = ref([])
const isLoading = ref(true)

onMounted(async () => {
  await loadUserSites()
})

// Charger les sites de l'utilisateur
const loadUserSites = async () => {
  try {
    isLoading.value = true
    
    if (!user.value) return
    
    // Requête pour récupérer les sites de l'utilisateur actuel
    const sitesQuery = query(
      collection(db, 'sites'),
      where('ownerId', '==', user.value.uid)
    )
    
    const querySnapshot = await getDocs(sitesQuery)
    userSites.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Erreur lors du chargement des sites:', error)
  } finally {
    isLoading.value = false
  }
}

// Obtenir une image de prévisualisation pour un site
const getSiteThumbnail = (site) => {
  // Si le site a un thème spécifique, on peut retourner une image en fonction du thème
  const themeImages = {
    'elegant': 'https://picsum.photos/id/1056/600/400',
    'modern': 'https://picsum.photos/id/1047/600/400',
    'cozy': 'https://picsum.photos/id/1062/600/400'
  }
  
  // Utiliser l'image du thème ou générer une image aléatoire
  return themeImages[site.theme] || getPlaceholderImage(600, 400)
}

// Ouvrir l'aperçu du site
const openSitePreview = (site) => {
  // Pour l'instant, afficher une alerte
  // Dans une version complète, on pourrait ouvrir une prévisualisation ou rediriger vers le site publié
  if (site.published && site.url) {
    window.open(site.url, '_blank')
  } else {
    alert(`Aperçu du site "${site.name}" - Cette fonctionnalité sera disponible prochainement.`)
  }
}
</script>