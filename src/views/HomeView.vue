<template>
  <div>
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-md">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold">
          BeautifyMe
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
          <img src="https://picsum.photos/id/1066/800/450" alt="Démonstration" class="w-full h-auto rounded-lg shadow-xl">
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-6">
            <span class="text-white text-sm">* Exemple de site créé avec BeautyCMS</span>
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
import {computed } from 'vue'

// État pour le mode sombre
const isDarkMode = computed(() => {
  return document.documentElement.classList.contains('dark')
})

// Basculer le mode sombre
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
}
</script>
