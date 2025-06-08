<template>
  <div class="site-renderer" :style="{ backgroundColor: siteData.colors?.primary + '10' || '#f9f9f9' }">
    <!-- En-tête du site -->
    <header class="mb-8">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between py-6" :style="{ borderBottom: '1px solid ' + (siteData.colors?.primary || '#5D5CDE') + '30' }">
          <div class="flex items-center">
            <div v-if="siteData.logoUrl" class="h-16 w-16 mr-4">
              <img :src="siteData.logoUrl" alt="Logo" class="h-full w-full object-contain" />
            </div>
            <div>
              <h1 class="text-2xl font-bold" :style="{ color: siteData.colors?.primary || '#5D5CDE' }">
                {{ siteData.name }}
              </h1>
              <p v-if="siteData.tagline" class="text-sm text-gray-600">{{ siteData.tagline }}</p>
            </div>
          </div>
          
          <nav class="hidden md:block">
            <ul class="flex space-x-6">
              <li><a href="#" class="hover:underline" :style="{ color: siteData.colors?.primary || '#5D5CDE' }">Accueil</a></li>
              <li><a href="#services" class="hover:underline" :style="{ color: siteData.colors?.secondary || '#FF6B9A' }">Services</a></li>
              <li><a href="#team" class="hover:underline" :style="{ color: siteData.colors?.secondary || '#FF6B9A' }">Équipe</a></li>
              <li><a href="#contact" class="hover:underline" :style="{ color: siteData.colors?.secondary || '#FF6B9A' }">Contact</a></li>
              <li>
                <a href="#" class="px-4 py-2 rounded-md text-white" :style="{ backgroundColor: siteData.colors?.primary || '#5D5CDE' }">
                  Réserver
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="container mx-auto px-4">
      <!-- Section héro -->
      <section class="text-center py-16">
        <h2 class="text-4xl font-bold mb-4" :style="{ color: siteData.colors?.primary || '#5D5CDE' }">
          Bienvenue chez {{ siteData.name }}
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {{ siteData.description || 'Votre institut de beauté de confiance' }}
        </p>
        <button class="px-8 py-3 rounded-lg text-white font-medium" :style="{ backgroundColor: siteData.colors?.primary || '#5D5CDE' }">
          Prendre rendez-vous
        </button>
      </section>

      <!-- Services (si pas vide) -->
      <section v-if="siteData.services?.length > 0" id="services" class="py-16">
        <h2 class="text-3xl font-bold text-center mb-12" :style="{ color: siteData.colors?.primary || '#5D5CDE' }">
          Nos Services
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="service in siteData.services" :key="service.id" class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-xl font-bold mb-2" :style="{ color: siteData.colors?.primary || '#5D5CDE' }">
              {{ service.name }}
            </h3>
            <div class="flex justify-between items-center mb-3">
              <span class="text-lg font-medium" :style="{ color: siteData.colors?.secondary || '#FF6B9A' }">
                {{ service.price }}
              </span>
              <span class="text-sm text-gray-500">{{ service.duration }}</span>
            </div>
            <p class="text-gray-600">{{ service.description }}</p>
          </div>
        </div>
      </section>

      <!-- Message pour site vide -->
      <section v-else class="py-16 text-center">
        <div class="bg-white rounded-lg p-8 shadow-sm max-w-md mx-auto">
          <div class="text-4xl mb-4">🌟</div>
          <h3 class="text-xl font-bold mb-2" :style="{ color: siteData.colors?.primary || '#5D5CDE' }">
            Votre site est créé !
          </h3>
          <p class="text-gray-600 mb-4">
            Ajoutez vos services, votre équipe et personnalisez votre site pour le rendre unique.
          </p>
          <p class="text-sm text-gray-500">
            Utilisez le bouton "Modifier" en haut pour commencer.
          </p>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="py-16">
        <h2 class="text-3xl font-bold text-center mb-12" :style="{ color: siteData.colors?.primary || '#5D5CDE' }">
          Nous Contacter
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-xl font-bold mb-4" :style="{ color: siteData.colors?.primary || '#5D5CDE' }">
              Coordonnées
            </h3>
            <div class="space-y-3">
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 mt-0.5" :style="{ color: siteData.colors?.secondary || '#FF6B9A' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p>{{ siteData.address?.street || 'Adresse à définir' }}</p>
                  <p>{{ siteData.address?.postalCode || '00000' }} {{ siteData.address?.city || 'Ville' }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" :style="{ color: siteData.colors?.secondary || '#FF6B9A' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p>{{ siteData.phone || 'Téléphone à définir' }}</p>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" :style="{ color: siteData.colors?.secondary || '#FF6B9A' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p>{{ siteData.email || 'Email à définir' }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-xl font-bold mb-4" :style="{ color: siteData.colors?.primary || '#5D5CDE' }">
              Horaires d'ouverture
            </h3>
            <div class="space-y-2">
              <div v-for="(day, index) in daysOfWeek" :key="index" class="flex justify-between">
                <span class="font-medium">{{ day }}</span>
                <span v-if="siteData.hours?.[index]?.open && siteData.hours?.[index]?.close">
                  {{ siteData.hours[index].open }} - {{ siteData.hours[index].close }}
                </span>
                <span v-else class="text-gray-500">Fermé</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Pied de page -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; {{ new Date().getFullYear() }} {{ siteData.name }}. Tous droits réservés.</p>
        <p class="text-sm text-gray-400 mt-2">Site créé avec BeautyCMS</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
defineProps({
  siteData: {
    type: Object,
    required: true
  }
})

const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
</script>