<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Header avec contrôles -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <router-link to="/dashboard" class="text-primary hover:text-primary/80 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </router-link>
            <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
              Aperçu de {{ siteData.name }}
            </h1>
            <span v-if="isNewSite" class="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Nouveau site créé !
            </span>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Sélecteur de device -->
            <div class="flex space-x-2">
              <button
                @click="previewDevice = 'desktop'"
                :class="[
                  'p-2 rounded-md',
                  previewDevice === 'desktop' ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
                title="Vue Bureau"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                @click="previewDevice = 'tablet'"
                :class="[
                  'p-2 rounded-md',
                  previewDevice === 'tablet' ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
                title="Vue Tablette"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                @click="previewDevice = 'mobile'"
                :class="[
                  'p-2 rounded-md',
                  previewDevice === 'mobile' ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
                title="Vue Mobile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            <!-- Actions -->
            <router-link
              :to="`/sites/${siteData.id}/edit`"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier
            </router-link>

            <button
              @click="publishSite"
              :disabled="isPublishing"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg v-if="isPublishing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ siteData.published ? 'Publié' : 'Publier' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Zone de prévisualisation -->
    <div class="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-auto p-4">
      <div v-if="isLoading" class="text-center py-12">
        <svg class="animate-spin h-10 w-10 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-4 text-gray-600 dark:text-gray-300">Chargement de votre site...</p>
      </div>

      <div v-else :class="[
        'bg-white transition-all duration-300 shadow-lg overflow-hidden',
        previewDevice === 'desktop' ? 'w-full h-full' :
        previewDevice === 'tablet' ? 'w-[768px] h-[1024px]' :
        'w-[375px] h-[667px]'
      ]">
        <div class="w-full h-full overflow-auto">
          <!-- Rendu du site vitrine -->
          <SiteRenderer :siteData="siteData" />
        </div>
      </div>
    </div>

    <!-- Messages de félicitation pour nouveau site -->
    <div v-if="isNewSite && showWelcomeMessage" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md mx-4">
        <div class="text-center">
          <div class="text-6xl mb-4">🎉</div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Félicitations !
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Votre site <strong>{{ siteData.name }}</strong> a été créé avec succès !
          </p>
          <div class="space-y-3">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Voici ce que vous pouvez faire maintenant :
            </p>
            <ul class="text-sm text-left space-y-2">
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                Ajouter vos services et votre équipe
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                Personnaliser davantage l'apparence
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                Configurer le système de réservation
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                Publier votre site en ligne
              </li>
            </ul>
          </div>
          <div class="mt-6 flex space-x-3">
            <button
              @click="closeWelcomeMessage"
              class="px-4 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Continuer l'exploration
            </button>
            <router-link
              :to="`/sites/${siteData.id}/edit`"
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Modifier mon site
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { siteService } from '@/services/siteService'
import SiteRenderer from '@/components/SiteRenderer.vue'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const isPublishing = ref(false)
const siteData = ref({})
const previewDevice = ref('desktop')
const showWelcomeMessage = ref(false)

const isNewSite = computed(() => route.query.newSite === 'true')

onMounted(async () => {
  await loadSiteData()

  if (isNewSite.value) {
    showWelcomeMessage.value = true
  }
})

const loadSiteData = async () => {
  try {
    const siteId = route.params.id
    const response = await siteService.getSite(siteId)

    if (response.success) {
      siteData.value = response.data
    } else {
      throw new Error('Site non trouvé')
    }
  } catch (error) {
    console.error('Erreur lors du chargement du site:', error)
    router.push('/dashboard')
  } finally {
    isLoading.value = false
  }
}

const publishSite = async () => {
  try {
    isPublishing.value = true
    const response = await siteService.togglePublish(siteData.value.id, !siteData.value.published)

    if (response.success) {
      siteData.value.published = !siteData.value.published
      alert(siteData.value.published ? 'Site publié avec succès !' : 'Site dépublié avec succès !')
    }
  } catch (error) {
    console.error('Erreur lors de la publication:', error)
    alert('Erreur lors de la publication du site')
  } finally {
    isPublishing.value = false
  }
}

const closeWelcomeMessage = () => {
  showWelcomeMessage.value = false
}
</script>
