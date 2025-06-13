<!-- src/views/HomeView.vue -->
<template>
  <div>
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-md">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold">
          <span>BeautifyMe</span>
        </router-link>
        
        <div class="flex items-center space-x-4">
          <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          
          <router-link to="/login" class="hidden md:block btn-primary">Connexion</router-link>
          <router-link to="/register" class="hidden md:block px-4 py-2 bg-secondary text-white rounded-md hover:bg-opacity-90 transition">Inscription</router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="py-12 md:py-20 container mx-auto px-4">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Créez votre site d'institut de beauté <span class="text-primary">sans coder</span>
        </h1>
        <p class="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Une solution simple et rapide pour permettre à votre institut de beauté d'avoir une présence en ligne professionnelle et attractive
        </p>
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <router-link to="/register" class="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition text-lg">
            Commencer maintenant
          </router-link>
          <a href="#features" class="px-6 py-3 bg-white dark:bg-gray-800 border border-primary text-primary rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition text-lg">
            En savoir plus
          </a>
        </div>
        <div class="relative max-w-4xl mx-auto">
          <img src="data:image/webp;base64,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" alt="Démonstration" class="w-full h-auto rounded-lg shadow-xl">
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-6">
            <span class="text-white text-sm">* Exemple de site créé avec BeautifyMe</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-16 container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Comment ça <span class="text-primary">fonctionne</span></h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Créez votre site web en quelques étapes simples, sans connaissances techniques
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
              1
            </div>
            <h3 class="text-xl font-semibold">Remplissez les formulaires</h3>
          </div>
          <p class="text-gray-600 dark:text-gray-300">Ajoutez facilement vos informations, services, horaires et images via des formulaires simples.</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
              2
            </div>
            <h3 class="text-xl font-semibold">Personnalisez votre site</h3>
          </div>
          <p class="text-gray-600 dark:text-gray-300">Choisissez parmi différents thèmes et couleurs pour créer un site qui correspond à votre image de marque.</p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
              3
            </div>
            <h3 class="text-xl font-semibold">Publiez et gérez</h3>
          </div>
          <p class="text-gray-600 dark:text-gray-300">Publiez votre site en un clic et gérez facilement vos réservations et votre contenu.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// État pour le mode sombre
const isDarkMode = computed(() => {
  return document.documentElement.classList.contains('dark')
})

// Basculer le mode sombre
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
}
</script>