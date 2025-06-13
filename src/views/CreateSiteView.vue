<template>
  <div>
    <DashboardNav />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Créer un nouveau site</h1>
        <p class="mt-1 text-gray-600 dark:text-gray-300">Remplissez les informations de base pour commencer</p>
      </div>
      
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <form @submit.prevent="handleCreateSite">
          <div class="space-y-6">
            <!-- Étape actuelle -->
            <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-lg">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                    {{ currentStep }}
                  </span>
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ stepTitles[currentStep-1] }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ stepDescriptions[currentStep-1] }}</p>
                </div>
              </div>
            </div>
            
            <!-- Étape 1: Informations générales -->
            <div v-if="currentStep === 1">
              <div class="mb-4">
                <label for="site-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom de l'institut <span class="text-red-500">*</span></label>
                <input 
                  id="site-name" 
                  v-model="siteData.name" 
                  type="text" 
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base"
                />
              </div>
              
              <div class="mb-4">
                <label for="site-tagline" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slogan</label>
                <input 
                  id="site-tagline" 
                  v-model="siteData.tagline" 
                  type="text" 
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base"
                  placeholder="Ex: Votre beauté, notre passion"
                />
              </div>
              
              <div class="mb-4">
                <label for="site-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea 
                  id="site-description" 
                  v-model="siteData.description" 
                  rows="3" 
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base"
                  placeholder="Décrivez votre institut et votre philosophie..."
                ></textarea>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="site-phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone <span class="text-red-500">*</span></label>
                  <input 
                    id="site-phone" 
                    v-model="siteData.phone" 
                    type="tel" 
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base"
                    placeholder="Ex: 01 23 45 67 89"
                  />
                </div>
                
                <div>
                  <label for="site-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email <span class="text-red-500">*</span></label>
                  <input 
                    id="site-email" 
                    v-model="siteData.email" 
                    type="email" 
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base"
                    placeholder="Ex: contact@moninstitut.fr"
                  />
                </div>
              </div>
            </div>
            
            <!-- Étape 2: Adresse et emplacement -->
            <div v-if="currentStep === 2">
              <div class="mb-4">
                <label for="site-address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse <span class="text-red-500">*</span></label>
                <input 
                  id="site-address" 
                  v-model="siteData.address.street" 
                  type="text" 
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base"
                  placeholder="Ex: 123 Rue de la Beauté"
                />
              </div>
              
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="site-postal-code" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Code postal <span class="text-red-500">*</span></label>
                  <input 
                    id="site-postal-code" 
                    v-model="siteData.address.postalCode" 
                    type="text" 
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base"
                    placeholder="Ex: 75001"
                  />
                </div>
                
                <div>
                  <label for="site-city" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ville <span class="text-red-500">*</span></label>
                  <input 
                    id="site-city" 
                    v-model="siteData.address.city" 
                    type="text" 
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base"
                    placeholder="Ex: Paris"
                  />
                </div>
              </div>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Horaires d'ouverture</label>
                
                <div v-for="(day, index) in days" :key="index" class="grid grid-cols-5 gap-2 mb-2 items-center">
                  <div class="col-span-1">
                    <span class="text-sm">{{ day }}</span>
                  </div>
                  
                  <div class="col-span-4 grid grid-cols-5 gap-2 items-center">
                    <input 
                      v-model="siteData.hours[index].open" 
                      type="time"
                      class="col-span-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                    />
                    <span class="text-center">à</span>
                    <input 
                      v-model="siteData.hours[index].close" 
                      type="time"
                      class="col-span-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Étape 3: Personnalisation -->
            <div v-if="currentStep === 3">
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Choix du thème</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div 
                    v-for="theme in themes" 
                    :key="theme.id"
                    @click="selectTheme(theme.id)"
                    :class="[
                      'cursor-pointer border-2 rounded-lg overflow-hidden hover:shadow-md transition-shadow', 
                      siteData.theme === theme.id ? 'border-primary' : 'border-gray-200 dark:border-gray-700'
                    ]"
                  >
                    <div class="h-32 bg-gray-100 dark:bg-gray-800 relative">
                      <img :src="theme.preview" :alt="theme.name" class="w-full h-full object-cover" />
                      <div v-if="siteData.theme === theme.id" class="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="p-3">
                      <h4 class="font-medium text-gray-900 dark:text-white">{{ theme.name }}</h4>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ theme.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Couleurs principales</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="primary-color" class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Couleur primaire</label>
                    <div class="flex items-center">
                      <input 
                        id="primary-color" 
                        v-model="siteData.colors.primary" 
                        type="color"
                        class="h-10 w-14 border-0 p-0"
                      />
                      <input 
                        v-model="siteData.colors.primary" 
                        type="text"
                        class="ml-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                        pattern="^#[0-9A-Fa-f]{6}$"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="secondary-color" class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Couleur secondaire</label>
                    <div class="flex items-center">
                      <input 
                        id="secondary-color" 
                        v-model="siteData.colors.secondary" 
                        type="color"
                        class="h-10 w-14 border-0 p-0"
                      />
                      <input 
                        v-model="siteData.colors.secondary" 
                        type="text"
                        class="ml-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                        pattern="^#[0-9A-Fa-f]{6}$"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label for="site-logo" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Logo (optionnel)</label>
                <input
                  id="site-logo"
                  ref="logoFileInput"
                  type="file"
                  accept="image/*"
                  @change="handleLogoUpload"
                  class="block w-full text-sm text-gray-500 dark:text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-medium
                        file:bg-primary file:text-white
                        hover:file:bg-primary/90"
                />
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">PNG, JPG ou GIF jusqu'à 1MB (plan gratuit)</p>
                
                <div v-if="logoPreview" class="mt-4">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Aperçu:</p>
                  <img :src="logoPreview" alt="Logo preview" class="h-20 object-contain border border-gray-200 dark:border-gray-700 rounded-md p-2" />
                </div>
              </div>
            </div>
            
            <!-- Navigation entre les étapes -->
            <div class="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                v-if="currentStep > 1"
                type="button"
                @click="prevStep"
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Précédent
              </button>
              <div v-else></div>
              
              <div class="flex space-x-2">
                <button
                  v-if="currentStep < totalSteps"
                  type="button"
                  @click="nextStep"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Suivant
                </button>
                
                <button
                  v-if="currentStep === totalSteps"
                  type="submit"
                  :disabled="isSubmitting"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isSubmitting ? 'Création en cours...' : 'Créer le site' }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import DashboardNav from '@/components/dashboard/DashboardNav.vue'
import { convertToBase64, validateImageFile } from '@/utils/imageUtils'

const router = useRouter()
const user = useCurrentUser()
const logoFileInput = ref(null)
const logoPreview = ref(null)
const logoFile = ref(null)

// Étapes du formulaire
const currentStep = ref(1)
const totalSteps = 3
const isSubmitting = ref(false)

const stepTitles = [
  'Informations générales',
  'Adresse et horaires',
  'Personnalisation'
]

const stepDescriptions = [
  'Renseignez les informations de base de votre institut',
  'Ajoutez votre adresse et vos horaires d\'ouverture',
  'Personnalisez l\'apparence de votre site'
]

// Jours de la semaine
const days = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
]

// Thèmes disponibles
const themes = [
  {
    id: 'elegant',
    name: 'Élégant',
    description: 'Un design minimaliste et raffiné',
    preview: 'https://picsum.photos/id/1056/300/200'
  },
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Un look contemporain et dynamique',
    preview: 'https://picsum.photos/id/1047/300/200'
  },
  {
    id: 'cozy',
    name: 'Chaleureux',
    description: 'Une ambiance chaleureuse et accueillante',
    preview: 'https://picsum.photos/id/1062/300/200'
  }
]

// Données du site
const siteData = reactive({
  name: '',
  tagline: '',
  description: '',
  phone: '',
  email: '',
  address: {
    street: '',
    postalCode: '',
    city: ''
  },
  hours: days.map(() => ({ open: '09:00', close: '18:00' })),
  theme: 'elegant',
  colors: {
    primary: '#5D5CDE',
    secondary: '#FF6B9A'
  },
  logoUrl: '',
  services: [],
  team: [],
  gallery: [],
  publishStatus: 'draft',
  createdAt: null,
  updatedAt: null
})

// Navigation entre les étapes
const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Sélection du thème
const selectTheme = (themeId) => {
  siteData.theme = themeId
}

// Gestion du téléchargement du logo
const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // Vérifier le type et la taille du fichier
  if (!validateImageFile(file, 1024)) {
    logoFileInput.value.value = ''
    return
  }
  
  // Stocker le fichier pour la conversion ultérieure
  logoFile.value = file
  
  // Créer un aperçu
  const reader = new FileReader()
  reader.onload = (e) => {
    logoPreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

// Création du site
const handleCreateSite = async () => {
  try {
    isSubmitting.value = true
    
    if (!user.value) {
      throw new Error('Vous devez être connecté pour créer un site.')
    }
    
    // Convertir le logo en base64 si présent
    let logoUrl = ''
    if (logoFile.value) {
      logoUrl = await convertToBase64(logoFile.value)
    }
    
    // Préparer les données du site
    const newSite = {
      ...siteData,
      logoUrl,
      ownerId: user.value.uid,
      ownerName: user.value.displayName || '',
      ownerEmail: user.value.email,
      published: false,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    // Ajouter le site à Firestore
    const docRef = await addDoc(collection(db, 'sites'), newSite)
    
    // Rediriger vers la page d'édition du site
    router.push(`/edit-site/${docRef.id}`)
  } catch (error) {
    console.error('Erreur lors de la création du site:', error)
    alert('Une erreur est survenue lors de la création de votre site. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}
</script>