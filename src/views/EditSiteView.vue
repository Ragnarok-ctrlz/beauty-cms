<template>
  <div>
    <DashboardNav />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="isLoading" class="text-center py-12">
        <svg
          class="animate-spin h-10 w-10 text-primary mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="mt-4 text-gray-600 dark:text-gray-300">Chargement des informations du site...</p>
      </div>

      <div v-else>
        <!-- En-tête avec le nom du site et les boutons d'action -->
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ siteData.name }}</h1>
            <p class="mt-1 text-gray-600 dark:text-gray-300">
              <span
                v-if="siteData.published"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              >
                Publié
              </span>
              <span
                v-else
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              >
                Brouillon
              </span>
              <span class="ml-2">Dernière modification: {{ formatDate(siteData.updatedAt) }}</span>
            </p>
          </div>

          <div class="mt-4 md:mt-0 flex flex-wrap gap-2">
            <button
              @click="previewSite"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Aperçu
            </button>

            <button
              @click="publishSite"
              :class="[
                'inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                siteData.published
                  ? 'border-gray-300 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  : 'border-transparent text-white bg-primary hover:bg-opacity-90',
              ]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {{ siteData.published ? 'Dépublier' : 'Publier' }}
            </button>

            <button
              @click="saveChanges"
              :disabled="isSaving"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg
                v-if="isSaving"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              {{ isSaving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </div>

        <!-- Onglets pour les différentes sections -->
        <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Contenu des onglets -->
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <!-- 1. Informations générales -->
          <div v-if="activeTab === 'general'" class="space-y-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
              Informations générales
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="edit-site-name"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Nom de l'institut <span class="text-red-500">*</span></label
                >
                <input
                  id="edit-site-name"
                  v-model="siteData.name"
                  type="text"
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label
                  for="edit-site-tagline"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Slogan</label
                >
                <input
                  id="edit-site-tagline"
                  v-model="siteData.tagline"
                  type="text"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                for="edit-site-description"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Description</label
              >
              <textarea
                id="edit-site-description"
                v-model="siteData.description"
                rows="3"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="edit-site-phone"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Téléphone <span class="text-red-500">*</span></label
                >
                <input
                  id="edit-site-phone"
                  v-model="siteData.phone"
                  type="tel"
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label
                  for="edit-site-email"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Email <span class="text-red-500">*</span></label
                >
                <input
                  id="edit-site-email"
                  v-model="siteData.email"
                  type="email"
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Adresse</label
              >
              <div class="grid grid-cols-1 gap-y-3">
                <input
                  v-model="siteData.address.street"
                  type="text"
                  placeholder="Rue"
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />

                <div class="grid grid-cols-2 gap-3">
                  <input
                    v-model="siteData.address.postalCode"
                    type="text"
                    placeholder="Code postal"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />

                  <input
                    v-model="siteData.address.city"
                    type="text"
                    placeholder="Ville"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                for="edit-site-logo"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >Logo</label
              >
              <div class="flex items-center space-x-4">
                <div
                  class="flex-shrink-0 h-20 w-20 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center overflow-hidden"
                >
                  <img
                    v-if="siteData.logoUrl"
                    :src="siteData.logoUrl"
                    alt="Logo"
                    class="h-full w-full object-contain"
                  />
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <div class="flex-grow">
                  <input
                    id="edit-site-logo"
                    ref="logoFileInput"
                    type="file"
                    accept="image/*"
                    @change="handleLogoUpload"
                    class="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90"
                  />
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG ou GIF jusqu'à 1MB (plan gratuit)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Services -->
          <div v-else-if="activeTab === 'services'" class="space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-medium text-gray-900 dark:text-white">Services</h2>
              <button
                @click="showAddServiceModal = true"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Ajouter un service
              </button>
            </div>

            <!-- Liste des services -->
            <div v-if="siteData.services.length === 0" class="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p class="mt-4 text-gray-500 dark:text-gray-400">Aucun service n'a été ajouté</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Ajoutez des services pour présenter vos prestations
              </p>
            </div>

            <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                v-for="(service, index) in siteData.services"
                :key="index"
                class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-medium text-gray-900 dark:text-white">{{ service.name }}</h3>
                    <div class="flex items-center mt-1">
                      <span class="text-primary font-medium">{{ service.price }}</span>
                      <span class="mx-2 text-gray-400">•</span>
                      <span class="text-gray-500 dark:text-gray-400 text-sm">{{
                        service.duration
                      }}</span>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button @click="editService(index)" class="text-gray-400 hover:text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button @click="removeService(index)" class="text-gray-400 hover:text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {{ service.description }}
                </p>
                <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Catégorie: {{ getCategoryLabel(service.category) }}
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Équipe -->
          <div v-else-if="activeTab === 'team'" class="space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-medium text-gray-900 dark:text-white">Équipe</h2>
              <button
                @click="addTeamMember"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Ajouter un membre
              </button>
            </div>

            <!-- Liste des membres d'équipe -->
            <div v-if="siteData.team.length === 0" class="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <p class="mt-4 text-gray-500 dark:text-gray-400">Aucun membre d'équipe ajouté</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Présentez votre équipe pour personnaliser votre site
              </p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="(member, index) in siteData.team"
                :key="index"
                class="bg-white dark:bg-gray-700 rounded-lg shadow border border-gray-200 dark:border-gray-600 overflow-hidden"
              >
                <div class="h-48 bg-gray-200 dark:bg-gray-600 relative">
                  <img
                    v-if="member.photoUrl"
                    :src="member.photoUrl"
                    :alt="member.name"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-16 w-16 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div class="absolute top-2 right-2 flex space-x-1">
                    <button
                      @click="editTeamMember(index)"
                      class="p-1 rounded-full bg-white bg-opacity-80 text-gray-700 hover:bg-opacity-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="removeTeamMember(index)"
                      class="p-1 rounded-full bg-white bg-opacity-80 text-red-500 hover:bg-opacity-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-medium text-gray-900 dark:text-white">{{ member.name }}</h3>
                  <p class="text-primary text-sm">{{ member.position }}</p>
                  <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">{{ member.bio }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. Galerie -->
          <div v-else-if="activeTab === 'gallery'" class="space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-medium text-gray-900 dark:text-white">Galerie</h2>
              <button
                @click="addGalleryImage"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Ajouter des images
              </button>
            </div>

            <!-- Galerie d'images -->
            <div v-if="siteData.gallery.length === 0" class="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p class="mt-4 text-gray-500 dark:text-gray-400">Aucune image dans la galerie</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Ajoutez des images pour mettre en valeur votre institut
              </p>
            </div>

            <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div
                v-for="(image, index) in siteData.gallery"
                :key="index"
                class="relative rounded-lg overflow-hidden aspect-square"
              >
                <img
                  :src="image.url"
                  :alt="image.description || 'Image de galerie'"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100"
                >
                  <div class="flex space-x-2">
                    <button
                      @click="editGalleryImage(index)"
                      class="p-2 rounded-full bg-white text-gray-700"
                      title="Modifier la description"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="removeGalleryImage(index)"
                      class="p-2 rounded-full bg-white text-red-500"
                      title="Supprimer l'image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-2 truncate"
                >
                  {{ image.description || 'Sans description' }}
                </div>
              </div>
            </div>
          </div>

          <!-- 5. Réservations -->
          <div v-else-if="activeTab === 'booking'" class="space-y-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
              Système de réservation
            </h2>

            <div
              class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded"
            >
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-yellow-700 dark:text-yellow-200">
                    Vous avez deux options pour les réservations : utiliser notre système intégré ou
                    rediriger vers votre solution existante.
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center">
                <input
                  type="radio"
                  id="booking-integrated"
                  name="booking-type"
                  value="integrated"
                  v-model="siteData.bookingType"
                  class="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                />
                <label
                  for="booking-integrated"
                  class="ml-2 block text-sm text-gray-900 dark:text-white"
                >
                  Utiliser le système intégré
                </label>
              </div>

              <div v-if="siteData.bookingType === 'integrated'" class="ml-6 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >Horaires d'ouverture</label
                  >
                  <div class="space-y-2">
                    <div
                      v-for="(day, index) in days"
                      :key="index"
                      class="grid grid-cols-5 gap-2 items-center"
                    >
                      <div class="col-span-1">
                        <span class="text-sm">{{ day }}</span>
                      </div>

                      <div class="col-span-4 grid grid-cols-5 gap-2 items-center">
                        <input
                          v-model="siteData.hours[index].open"
                          type="time"
                          class="col-span-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <span class="text-center">à</span>
                        <input
                          v-model="siteData.hours[index].close"
                          type="time"
                          class="col-span-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >Réglages des créneaux</label
                  >
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs mb-1">Durée des créneaux</label>
                      <select
                        v-model="siteData.bookingSettings.slotDuration"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs mb-1">Temps de préparation</label>
                      <select
                        v-model="siteData.bookingSettings.breakTime"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="0">0 minutes</option>
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center">
                <input
                  type="radio"
                  id="booking-external"
                  name="booking-type"
                  value="external"
                  v-model="siteData.bookingType"
                  class="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                />
                <label
                  for="booking-external"
                  class="ml-2 block text-sm text-gray-900 dark:text-white"
                >
                  Rediriger vers ma solution existante
                </label>
              </div>

              <div v-if="siteData.bookingType === 'external'" class="ml-6 space-y-3">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    for="booking-url"
                    >URL de votre système de réservation</label
                  >
                  <input
                    id="booking-url"
                    v-model="siteData.bookingSettings.externalUrl"
                    type="url"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Ex: https://mon-institut.reservio.com"
                  />
                </div>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="booking-new-tab"
                    v-model="siteData.bookingSettings.newTab"
                    class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                  />
                  <label
                    for="booking-new-tab"
                    class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Ouvrir dans un nouvel onglet
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- 6. Apparence -->
          <div v-else-if="activeTab === 'appearance'" class="space-y-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">Apparence du site</h2>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                >Thème</label
              >
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div
                  v-for="theme in themes"
                  :key="theme.id"
                  @click="selectTheme(theme.id)"
                  :class="[
                    'cursor-pointer border-2 rounded-lg overflow-hidden hover:shadow-md transition-shadow',
                    siteData.theme === theme.id
                      ? 'border-primary'
                      : 'border-gray-200 dark:border-gray-700',
                  ]"
                >
                  <div class="h-32 bg-gray-100 dark:bg-gray-800 relative">
                    <img
                      :src="theme.preview"
                      :alt="theme.name"
                      class="w-full h-full object-cover"
                    />
                    <div
                      v-if="siteData.theme === theme.id"
                      class="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
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

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
                >Couleurs</label
              >
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    for="primary-color"
                    class="block text-xs text-gray-500 dark:text-gray-400 mb-1"
                    >Couleur primaire</label
                  >
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
                      class="ml-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      pattern="^#[0-9A-Fa-f]{6}$"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="secondary-color"
                    class="block text-xs text-gray-500 dark:text-gray-400 mb-1"
                    >Couleur secondaire</label
                  >
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
                      class="ml-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      pattern="^#[0-9A-Fa-f]{6}$"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modales pour l'ajout/édition des services, membres d'équipe et images -->
    <!-- Modal Ajout Service -->
    <div v-if="showAddServiceModal" class="fixed inset-0 overflow-y-auto z-50">
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {{ editingServiceIndex !== null ? 'Modifier le service' : 'Ajouter un service' }}
            </h3>
            <div class="mt-4 space-y-4">
              <div>
                <label
                  for="service-name"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Nom du service <span class="text-red-500">*</span></label
                >
                <input
                  id="service-name"
                  v-model="serviceForm.name"
                  type="text"
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Ex: Coupe et brushing"
                />
              </div>

              <div>
                <label
                  for="service-description"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Description</label
                >
                <textarea
                  id="service-description"
                  v-model="serviceForm.description"
                  rows="2"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Description du service..."
                ></textarea>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    for="service-price"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Prix <span class="text-red-500">*</span></label
                  >
                  <input
                    id="service-price"
                    v-model="serviceForm.price"
                    type="text"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Ex: 45€"
                  />
                </div>
                <div>
                  <label
                    for="service-duration"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >Durée <span class="text-red-500">*</span></label
                  >
                  <input
                    id="service-duration"
                    v-model="serviceForm.duration"
                    type="text"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Ex: 45 min"
                  />
                </div>
              </div>

              <div>
                <label
                  for="service-category"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Catégorie</label
                >
                <select
                  id="service-category"
                  v-model="serviceForm.category"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="hair">Coiffure</option>
                  <option value="facial">Soins du visage</option>
                  <option value="body">Soins du corps</option>
                  <option value="nails">Manucure/Pédicure</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="saveService"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ editingServiceIndex !== null ? 'Enregistrer' : 'Ajouter' }}
            </button>
            <button
              @click="showAddServiceModal = false"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Ajout/Édition Membre d'Équipe -->
    <div v-if="showAddTeamModal" class="fixed inset-0 overflow-y-auto z-50">
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {{
                editingTeamMemberIndex !== null
                  ? 'Modifier le membre'
                  : "Ajouter un membre d'équipe"
              }}
            </h3>
            <div class="mt-4 space-y-4">
              <div>
                <label
                  for="team-name"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Nom <span class="text-red-500">*</span></label
                >
                <input
                  id="team-name"
                  v-model="teamForm.name"
                  type="text"
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Ex: Marie Dupont"
                />
              </div>

              <div>
                <label
                  for="team-position"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Poste <span class="text-red-500">*</span></label
                >
                <input
                  id="team-position"
                  v-model="teamForm.position"
                  type="text"
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Ex: Esthéticienne"
                />
              </div>

              <div>
                <label
                  for="team-bio"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Biographie</label
                >
                <textarea
                  id="team-bio"
                  v-model="teamForm.bio"
                  rows="3"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Quelques mots sur ce membre d'équipe..."
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Photo</label
                >
                <div class="flex items-center space-x-4">
                  <div
                    class="h-24 w-24 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center overflow-hidden"
                  >
                    <img
                      v-if="teamForm.photoUrl"
                      :src="teamForm.photoUrl"
                      alt="Photo"
                      class="h-full w-full object-cover"
                    />
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>

                  <div class="flex-grow">
                    <input
                      id="team-photo"
                      ref="teamPhotoInput"
                      type="file"
                      accept="image/*"
                      @change="handleTeamPhotoUpload"
                      class="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90"
                    />
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG ou GIF jusqu'à 500KB (plan gratuit)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="saveTeamMember"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ editingTeamMemberIndex !== null ? 'Enregistrer' : 'Ajouter' }}
            </button>
            <button
              @click="closeTeamMemberModal"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Ajout/Édition Image Galerie -->
    <div v-if="showAddGalleryModal" class="fixed inset-0 overflow-y-auto z-50">
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {{
                editingGalleryImageIndex !== null
                  ? "Modifier l'image"
                  : 'Ajouter une image à la galerie'
              }}
            </h3>
            <div class="mt-4 space-y-4">
              <div v-if="editingGalleryImageIndex === null">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >Image</label
                >
                <div>
                  <div
                    class="relative h-40 w-full mb-4 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center"
                  >
                    <img
                      v-if="galleryForm.file"
                      :src="galleryForm.previewUrl"
                      alt="Preview"
                      class="h-full w-full object-contain"
                    />
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-16 w-16 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <input
                    id="gallery-image"
                    ref="galleryImageInput"
                    type="file"
                    accept="image/*"
                    @change="handleGalleryImageUpload"
                    class="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90"
                  />
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG ou GIF jusqu'à 1MB (plan gratuit)
                  </p>
                </div>
              </div>

              <div v-else>
                <div
                  class="h-48 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center overflow-hidden mb-4"
                >
                  <img
                    v-if="galleryForm.url"
                    :src="galleryForm.url"
                    alt="Image"
                    class="h-full w-full object-contain"
                  />
                </div>
              </div>

              <div>
                <label
                  for="gallery-description"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >Description</label
                >
                <textarea
                  id="gallery-description"
                  v-model="galleryForm.description"
                  rows="2"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Description de l'image..."
                ></textarea>
              </div>

              <div v-if="editingGalleryImageIndex === null">
                <p class="text-sm">
                  Astuce: Pour le plan gratuit, nous générons actuellement une image de
                  démonstration. Dans la version payante, vous pourrez télécharger vos propres
                  images.
                </p>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              @click="saveGalleryImage"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ editingGalleryImageIndex !== null ? 'Enregistrer' : 'Ajouter' }}
            </button>
            <button
              @click="closeGalleryImageModal"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Prévisualisation du site -->
    <div v-if="showPreviewModal" class="fixed inset-0 overflow-y-auto z-50">
      <div class="flex flex-col min-h-screen">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        <div class="relative flex flex-col bg-white dark:bg-gray-800 shadow-xl min-h-screen w-full">
          <!-- Barre d'outils de prévisualisation -->
          <div
            class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                Prévisualisation: {{ siteData.name }}
              </h3>
              <div class="ml-4 flex space-x-2">
                <button
                  @click="previewDevice = 'desktop'"
                  :class="[
                    'p-2 rounded-md',
                    previewDevice === 'desktop'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300',
                  ]"
                  title="Affichage Bureau"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <button
                  @click="previewDevice = 'tablet'"
                  :class="[
                    'p-2 rounded-md',
                    previewDevice === 'tablet'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300',
                  ]"
                  title="Affichage Tablette"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <button
                  @click="previewDevice = 'mobile'"
                  :class="[
                    'p-2 rounded-md',
                    previewDevice === 'mobile'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300',
                  ]"
                  title="Affichage Mobile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button
              @click="showPreviewModal = false"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span class="sr-only">Fermer</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Iframe de prévisualisation avec taille adaptative -->
          <div
            class="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-auto p-4"
          >
            <div
              :class="[
                'bg-white transition-all duration-300 shadow-lg overflow-hidden',
                previewDevice === 'desktop'
                  ? 'w-full h-full'
                  : previewDevice === 'tablet'
                    ? 'w-[768px] h-[1024px]'
                    : 'w-[375px] h-[667px]',
              ]"
            >
              <div class="w-full h-full overflow-auto">
                <!-- Intégrer la prévisualisation du site ici -->
                <div
                  class="p-4 h-full"
                  :style="{ backgroundColor: siteData.colors.primary + '10' }"
                >
                  <!-- En-tête du site -->
                  <header class="mb-8">
                    <div
                      class="flex items-center justify-between mb-6"
                      :style="{
                        borderBottom: '1px solid ' + siteData.colors.primary + '30',
                        paddingBottom: '1rem',
                      }"
                    >
                      <div class="flex items-center">
                        <div v-if="siteData.logoUrl" class="h-16 w-16 mr-4">
                          <img
                            :src="siteData.logoUrl"
                            alt="Logo"
                            class="h-full w-full object-contain"
                          />
                        </div>
                        <div>
                          <h1
                            class="text-2xl font-bold"
                            :style="{ color: siteData.colors.primary }"
                          >
                            {{ siteData.name }}
                          </h1>
                          <p v-if="siteData.tagline" class="text-sm">{{ siteData.tagline }}</p>
                        </div>
                      </div>
                      <nav class="hidden sm:block">
                        <ul class="flex space-x-4">
                          <li>
                            <a
                              href="#"
                              class="hover:underline"
                              :style="{ color: siteData.colors.primary }"
                              >Accueil</a
                            >
                          </li>
                          <li>
                            <a
                              href="#services"
                              class="hover:underline"
                              :style="{ color: siteData.colors.secondary }"
                              >Services</a
                            >
                          </li>
                          <li>
                            <a
                              href="#team"
                              class="hover:underline"
                              :style="{ color: siteData.colors.secondary }"
                              >Équipe</a
                            >
                          </li>
                          <li>
                            <a
                              href="#contact"
                              class="hover:underline"
                              :style="{ color: siteData.colors.secondary }"
                              >Contact</a
                            >
                          </li>
                          <li>
                            <a
                              href="#"
                              class="px-3 py-1 rounded-md text-white"
                              :style="{ backgroundColor: siteData.colors.primary }"
                              >Réservation</a
                            >
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </header>

                  <!-- Contenu principal -->
                  <main class="mx-auto max-w-4xl">
                    <!-- Introduction -->
                    <section class="mb-12 text-center">
                      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <h2
                          class="text-3xl font-bold mb-4"
                          :style="{ color: siteData.colors.primary }"
                        >
                          Bienvenue chez {{ siteData.name }}
                        </h2>
                        <p class="text-lg mb-6">
                          {{ siteData.description || 'Description de votre institut de beauté...' }}
                        </p>
                        <a
                          href="#contact"
                          class="inline-block px-6 py-3 rounded-md text-white"
                          :style="{ backgroundColor: siteData.colors.primary }"
                          >Nous contacter</a
                        >
                      </div>
                    </section>

                    <!-- Services -->
                    <section id="services" class="mb-12">
                      <h2
                        class="text-2xl font-bold mb-6 text-center"
                        :style="{ color: siteData.colors.primary }"
                      >
                        Nos Services
                      </h2>

                      <div
                        v-if="siteData.services.length === 0"
                        class="text-center py-8 bg-gray-50 rounded-lg"
                      >
                        <p class="text-gray-500">Aucun service n'a été ajouté</p>
                      </div>

                      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                          v-for="(service, index) in siteData.services"
                          :key="index"
                          class="p-6 rounded-lg"
                          :style="{ backgroundColor: siteData.colors.primary + '10' }"
                        >
                          <h3
                            class="text-xl font-bold mb-2"
                            :style="{ color: siteData.colors.primary }"
                          >
                            {{ service.name }}
                          </h3>
                          <div class="flex justify-between mb-2">
                            <span
                              class="font-medium"
                              :style="{ color: siteData.colors.secondary }"
                              >{{ service.price }}</span
                            >
                            <span class="text-sm text-gray-500">{{ service.duration }}</span>
                          </div>
                          <p class="text-sm text-gray-600">{{ service.description }}</p>
                        </div>
                      </div>
                    </section>

                    <!-- Équipe -->
                    <section id="team" class="mb-12">
                      <h2
                        class="text-2xl font-bold mb-6 text-center"
                        :style="{ color: siteData.colors.primary }"
                      >
                        Notre Équipe
                      </h2>

                      <div
                        v-if="siteData.team.length === 0"
                        class="text-center py-8 bg-gray-50 rounded-lg"
                      >
                        <p class="text-gray-500">Aucun membre d'équipe ajouté</p>
                      </div>

                      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div
                          v-for="(member, index) in siteData.team"
                          :key="index"
                          class="text-center"
                        >
                          <div class="h-40 w-40 rounded-full overflow-hidden mx-auto mb-4">
                            <img
                              v-if="member.photoUrl"
                              :src="member.photoUrl"
                              :alt="member.name"
                              class="w-full h-full object-cover"
                            />
                          </div>
                          <h3 class="text-lg font-bold" :style="{ color: siteData.colors.primary }">
                            {{ member.name }}
                          </h3>
                          <p
                            class="text-sm font-medium mb-2"
                            :style="{ color: siteData.colors.secondary }"
                          >
                            {{ member.position }}
                          </p>
                          <p class="text-sm text-gray-600">{{ member.bio }}</p>
                        </div>
                      </div>
                    </section>

                    <!-- Galerie -->
                    <section class="mb-12" v-if="siteData.gallery.length > 0">
                      <h2
                        class="text-2xl font-bold mb-6 text-center"
                        :style="{ color: siteData.colors.primary }"
                      >
                        Galerie
                      </h2>

                      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div
                          v-for="(image, index) in siteData.gallery"
                          :key="index"
                          class="relative rounded-lg overflow-hidden aspect-square"
                        >
                          <img
                            :src="image.url"
                            :alt="image.description || 'Image de galerie'"
                            class="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </section>

                    <!-- Contact -->
                    <section id="contact" class="mb-12">
                      <h2
                        class="text-2xl font-bold mb-6 text-center"
                        :style="{ color: siteData.colors.primary }"
                      >
                        Contact & Horaires
                      </h2>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div
                          class="p-6 rounded-lg"
                          :style="{ backgroundColor: siteData.colors.primary + '10' }"
                        >
                          <h3
                            class="text-xl font-bold mb-4"
                            :style="{ color: siteData.colors.primary }"
                          >
                            Coordonnées
                          </h3>

                          <div class="space-y-3">
                            <div class="flex items-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 mr-2 mt-0.5"
                                :style="{ color: siteData.colors.secondary }"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <div>
                                <p>{{ siteData.address.street }}</p>
                                <p>{{ siteData.address.postalCode }} {{ siteData.address.city }}</p>
                              </div>
                            </div>

                            <div class="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 mr-2"
                                :style="{ color: siteData.colors.secondary }"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              <p>{{ siteData.phone }}</p>
                            </div>

                            <div class="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 mr-2"
                                :style="{ color: siteData.colors.secondary }"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              <p>{{ siteData.email }}</p>
                            </div>
                          </div>
                        </div>

                        <div
                          class="p-6 rounded-lg"
                          :style="{ backgroundColor: siteData.colors.primary + '10' }"
                        >
                          <h3
                            class="text-xl font-bold mb-4"
                            :style="{ color: siteData.colors.primary }"
                          >
                            Horaires d'ouverture
                          </h3>

                          <div class="space-y-2">
                            <div v-for="(day, index) in days" :key="index" class="grid grid-cols-3">
                              <div class="font-medium">{{ day }}</div>
                              <div
                                class="col-span-2"
                                v-if="siteData.hours[index].open && siteData.hours[index].close"
                              >
                                {{ siteData.hours[index].open }} - {{ siteData.hours[index].close }}
                              </div>
                              <div class="col-span-2" v-else>Fermé</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </main>

                  <!-- Pied de page -->
                  <footer
                    class="mt-12 pt-6 text-center text-sm text-gray-500"
                    :style="{ borderTop: '1px solid ' + siteData.colors.primary + '30' }"
                  >
                    <p>
                      &copy; {{ new Date().getFullYear() }} {{ siteData.name }} - Tous droits
                      réservés
                    </p>
                    <p class="mt-2">Créé avec BeautyCMS</p>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/services'
import DashboardNav from '@/components/dashboard/DashboardNav.vue'
import { convertToBase64, validateImageFile, getPlaceholderImage } from '@/utils/imageUtils'

const route = useRoute()
const router = useRouter()
const user = useCurrentUser()
const logoFileInput = ref(null)
const teamPhotoInput = ref(null)
const galleryImageInput = ref(null)

// États
const isLoading = ref(true)
const isSaving = ref(false)
const activeTab = ref('general')
const showAddServiceModal = ref(false)
const showAddTeamModal = ref(false)
const showAddGalleryModal = ref(false)
const showPreviewModal = ref(false)
const previewDevice = ref('desktop') // 'desktop', 'tablet', 'mobile'
const editingServiceIndex = ref(null)
const editingTeamMemberIndex = ref(null)
const editingGalleryImageIndex = ref(null)

// Données du site (avec une structure vide par défaut)
const siteData = reactive({
  name: '',
  tagline: '',
  description: '',
  phone: '',
  email: '',
  address: {
    street: '',
    postalCode: '',
    city: '',
  },
  hours: Array(7)
    .fill()
    .map(() => ({ open: '09:00', close: '18:00' })),
  theme: 'elegant',
  colors: {
    primary: '#5D5CDE',
    secondary: '#FF6B9A',
  },
  logoUrl: '',
  services: [],
  team: [],
  gallery: [],
  bookingType: 'integrated',
  bookingSettings: {
    slotDuration: '30',
    breakTime: '15',
    externalUrl: '',
    newTab: true,
  },
  published: false,
  createdAt: null,
  updatedAt: null,
})

// Formulaire pour les services
const serviceForm = reactive({
  name: '',
  description: '',
  price: '',
  duration: '',
  category: 'hair',
})

// Formulaire pour les membres d'équipe
const teamForm = reactive({
  name: '',
  position: '',
  bio: '',
  photoUrl: '',
})

// Formulaire pour les images de galerie
const galleryForm = reactive({
  file: null,
  previewUrl: '',
  url: '',
  description: '',
})

// Liste d'onglets
const tabs = [
  { id: 'general', name: 'Informations générales' },
  { id: 'services', name: 'Services' },
  { id: 'team', name: 'Équipe' },
  { id: 'gallery', name: 'Galerie' },
  { id: 'booking', name: 'Réservations' },
  { id: 'appearance', name: 'Apparence' },
]

// Jours de la semaine
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

// Thèmes disponibles
const themes = [
  {
    id: 'elegant',
    name: 'Élégant',
    description: 'Un design minimaliste et raffiné',
    preview: 'https://picsum.photos/id/1056/300/200',
  },
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Un look contemporain et dynamique',
    preview: 'https://picsum.photos/id/1047/300/200',
  },
  {
    id: 'cozy',
    name: 'Chaleureux',
    description: 'Une ambiance chaleureuse et accueillante',
    preview: 'https://picsum.photos/id/1062/300/200',
  },
]

// Chargement des données du site au montage du composant
onMounted(async () => {
  await loadSiteData()
})

// Charger les données du site
const loadSiteData = async () => {
  try {
    isLoading.value = true

    const siteId = route.params.id

    if (!siteId) {
      router.push('/dashboard')
      return
    }

    const siteRef = doc(db, 'sites', siteId)
    const siteSnapshot = await getDoc(siteRef)

    if (!siteSnapshot.exists()) {
      alert("Ce site n'existe pas.")
      router.push('/dashboard')
      return
    }

    const siteDataFromDb = siteSnapshot.data()

    // Vérifier que l'utilisateur actuel est bien le propriétaire du site
    if (siteDataFromDb.ownerId !== user.value?.uid) {
      alert("Vous n'êtes pas autorisé à modifier ce site.")
      router.push('/dashboard')
      return
    }

    // Mettre à jour les données du site
    Object.keys(siteDataFromDb).forEach((key) => {
      if (key in siteData) {
        siteData[key] = siteDataFromDb[key]
      }
    })

    // Assurer que les structures sont complètes
    if (!siteData.bookingSettings) {
      siteData.bookingSettings = {
        slotDuration: '30',
        breakTime: '15',
        externalUrl: '',
        newTab: true,
      }
    }

    if (!siteData.bookingType) {
      siteData.bookingType = 'integrated'
    }

    // S'assurer que hours contient 7 jours
    if (!siteData.hours || siteData.hours.length < 7) {
      siteData.hours = Array(7)
        .fill()
        .map(() => ({ open: '09:00', close: '18:00' }))
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données du site:', error)
    alert('Une erreur est survenue lors du chargement des données du site.')
  } finally {
    isLoading.value = false
  }
}

// Sauvegarder les changements
const saveChanges = async () => {
  try {
    isSaving.value = true

    const siteId = route.params.id
    const siteRef = doc(db, 'sites', siteId)

    // Mettre à jour la date de modification
    siteData.updatedAt = new Date()

    await updateDoc(siteRef, siteData)

    alert('Les modifications ont été enregistrées avec succès.')
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des modifications:", error)
    alert("Une erreur est survenue lors de l'enregistrement des modifications.")
  } finally {
    isSaving.value = false
  }
}

// Prévisualiser le site
const previewSite = () => {
  showPreviewModal.value = true
}

// Publier/dépublier le site
const publishSite = async () => {
  try {
    const siteId = route.params.id
    const siteRef = doc(db, 'sites', siteId)

    // Inverser l'état de publication
    siteData.published = !siteData.published
    siteData.updatedAt = new Date()

    // Si on publie, générer une URL
    if (siteData.published && !siteData.url) {
      // Dans une vraie implémentation, on génèrerait une URL unique
      // Ici, c'est juste un exemple
      siteData.url = `https://beautycms.com/view/${siteId}`
    }

    await updateDoc(siteRef, {
      published: siteData.published,
      updatedAt: siteData.updatedAt,
      url: siteData.url,
    })

    alert(siteData.published ? 'Site publié avec succès!' : 'Site dépublié avec succès!')
  } catch (error) {
    console.error('Erreur lors de la publication/dépublication:', error)
    alert('Une erreur est survenue lors de la publication/dépublication du site.')
  }
}

// Gestion du logo
const handleLogoUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Valider le fichier
  if (!validateImageFile(file, 1024)) {
    logoFileInput.value.value = ''
    return
  }

  try {
    // Convertir en base64
    const logoBase64 = await convertToBase64(file)

    // Mettre à jour le logo
    siteData.logoUrl = logoBase64
  } catch (error) {
    console.error('Erreur lors du téléchargement du logo:', error)
    alert('Une erreur est survenue lors du téléchargement du logo.')
  }
}

// Sélection du thème
const selectTheme = (themeId) => {
  siteData.theme = themeId
}

// Obtenir le libellé d'une catégorie
const getCategoryLabel = (categoryId) => {
  const categories = {
    hair: 'Coiffure',
    facial: 'Soins du visage',
    body: 'Soins du corps',
    nails: 'Manucure/Pédicure',
    other: 'Autre',
  }

  return categories[categoryId] || categoryId
}

// Formater une date
const formatDate = (timestamp) => {
  if (!timestamp) return 'Jamais'

  const date = timestamp instanceof Date ? timestamp : timestamp.toDate()
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ---- Gestion des services ----

// Ajouter/modifier un service
const saveService = () => {
  // Vérifier que les champs obligatoires sont remplis
  if (!serviceForm.name || !serviceForm.price || !serviceForm.duration) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }

  // Créer l'objet service
  const service = {
    name: serviceForm.name,
    description: serviceForm.description,
    price: serviceForm.price,
    duration: serviceForm.duration,
    category: serviceForm.category,
  }

  if (editingServiceIndex.value !== null) {
    // Modification d'un service existant
    siteData.services[editingServiceIndex.value] = service
  } else {
    // Ajout d'un nouveau service
    siteData.services.push(service)
  }

  // Réinitialiser le formulaire et fermer la modale
  resetServiceForm()
  showAddServiceModal.value = false
}

// Éditer un service
const editService = (index) => {
  const service = siteData.services[index]

  // Remplir le formulaire avec les données du service
  serviceForm.name = service.name
  serviceForm.description = service.description || ''
  serviceForm.price = service.price
  serviceForm.duration = service.duration
  serviceForm.category = service.category || 'other'

  // Définir l'index du service en cours d'édition
  editingServiceIndex.value = index

  // Ouvrir la modale
  showAddServiceModal.value = true
}

// Supprimer un service
const removeService = (index) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
    siteData.services.splice(index, 1)
  }
}

// Réinitialiser le formulaire de service
const resetServiceForm = () => {
  serviceForm.name = ''
  serviceForm.description = ''
  serviceForm.price = ''
  serviceForm.duration = ''
  serviceForm.category = 'hair'
  editingServiceIndex.value = null
}

// ---- Gestion des membres d'équipe ----

// Ouvrir la modale d'ajout d'un membre d'équipe
const addTeamMember = () => {
  resetTeamMemberForm()
  showAddTeamModal.value = true
}

// Éditer un membre d'équipe
const editTeamMember = (index) => {
  const member = siteData.team[index]

  // Remplir le formulaire avec les données du membre
  teamForm.name = member.name
  teamForm.position = member.position || ''
  teamForm.bio = member.bio || ''
  teamForm.photoUrl = member.photoUrl || ''

  // Définir l'index du membre en cours d'édition
  editingTeamMemberIndex.value = index

  // Ouvrir la modale
  showAddTeamModal.value = true
}

// Sauvegarder un membre d'équipe
const saveTeamMember = () => {
  // Vérifier que les champs obligatoires sont remplis
  if (!teamForm.name || !teamForm.position) {
    alert('Veuillez remplir les champs obligatoires.')
    return
  }

  // Créer l'objet membre
  const member = {
    name: teamForm.name,
    position: teamForm.position,
    bio: teamForm.bio,
    photoUrl: teamForm.photoUrl || getPlaceholderImage(300, 300),
  }

  if (editingTeamMemberIndex.value !== null) {
    // Modification d'un membre existant
    siteData.team[editingTeamMemberIndex.value] = member
  } else {
    // Ajout d'un nouveau membre
    siteData.team.push(member)
  }

  // Fermer la modale
  closeTeamMemberModal()
}

// Fermer la modale de membre d'équipe
const closeTeamMemberModal = () => {
  showAddTeamModal.value = false
  resetTeamMemberForm()
}

// Réinitialiser le formulaire de membre d'équipe
const resetTeamMemberForm = () => {
  teamForm.name = ''
  teamForm.position = ''
  teamForm.bio = ''
  teamForm.photoUrl = ''
  editingTeamMemberIndex.value = null
}

// Gérer l'upload de photo d'équipe
const handleTeamPhotoUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Valider le fichier (taille max 500KB pour les photos d'équipe)
  if (!validateImageFile(file, 500)) {
    teamPhotoInput.value.value = ''
    return
  }

  try {
    // Convertir en base64
    const photoBase64 = await convertToBase64(file)

    // Mettre à jour la photo
    teamForm.photoUrl = photoBase64
  } catch (error) {
    console.error('Erreur lors du téléchargement de la photo:', error)
    alert('Une erreur est survenue lors du téléchargement de la photo.')
  }
}

// Supprimer un membre d'équipe
const removeTeamMember = (index) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce membre d'équipe ?")) {
    siteData.team.splice(index, 1)
  }
}

// ---- Gestion des images de galerie ----

// Ouvrir la modale d'ajout d'une image de galerie
const addGalleryImage = () => {
  resetGalleryImageForm()
  showAddGalleryModal.value = true
}

// Éditer une image de la galerie
const editGalleryImage = (index) => {
  const image = siteData.gallery[index]

  // Remplir le formulaire avec les données de l'image
  galleryForm.url = image.url
  galleryForm.description = image.description || ''

  // Définir l'index de l'image en cours d'édition
  editingGalleryImageIndex.value = index

  // Ouvrir la modale
  showAddGalleryModal.value = true
}

// Sauvegarder une image de galerie
const saveGalleryImage = () => {
  let imageUrl = ''

  if (editingGalleryImageIndex.value !== null) {
    // En mode édition, on garde l'URL existante
    imageUrl = galleryForm.url
  } else {
    // En mode ajout, on génère une URL aléatoire pour le plan gratuit
    // En version payante, on utiliserait l'image téléchargée
    imageUrl = getPlaceholderImage(800, 600)
  }

  // Créer l'objet image
  const image = {
    url: imageUrl,
    description: galleryForm.description,
  }

  if (editingGalleryImageIndex.value !== null) {
    // Modification d'une image existante
    siteData.gallery[editingGalleryImageIndex.value] = image
  } else {
    // Ajout d'une nouvelle image
    siteData.gallery.push(image)
  }

  // Fermer la modale
  closeGalleryImageModal()
}

// Fermer la modale d'image de galerie
const closeGalleryImageModal = () => {
  showAddGalleryModal.value = false
  resetGalleryImageForm()
}

// Réinitialiser le formulaire d'image de galerie
const resetGalleryImageForm = () => {
  galleryForm.file = null
  galleryForm.previewUrl = ''
  galleryForm.url = ''
  galleryForm.description = ''
  editingGalleryImageIndex.value = null
}

// Gérer l'upload d'image de galerie
const handleGalleryImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Valider le fichier
  if (!validateImageFile(file, 1024)) {
    galleryImageInput.value.value = ''
    return
  }

  try {
    // Pour le plan gratuit, on crée juste une prévisualisation
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      galleryForm.previewUrl = e.target.result
      galleryForm.file = file
    }
    fileReader.readAsDataURL(file)
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image:", error)
    alert("Une erreur est survenue lors du téléchargement de l'image.")
  }
}

// Supprimer une image de la galerie
const removeGalleryImage = (index) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
    siteData.gallery.splice(index, 1)
  }
}
</script>
