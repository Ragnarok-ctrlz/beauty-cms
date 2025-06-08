<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Créer un compte
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Ou
          <router-link to="/login" class="font-medium text-primary hover:text-opacity-80">
            connectez-vous à votre compte existant
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>

        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Nom complet</label>
            <input id="name" name="name" type="text" autocomplete="name" required
                   v-model="name"
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-base"
                   placeholder="Nom complet">
          </div>
          <div>
            <label for="email-address" class="sr-only">Adresse email</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required
                   v-model="email"
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-base"
                   placeholder="Adresse email">
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input id="password" name="password" type="password" autocomplete="new-password" required
                   v-model="password"
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 text-base"
                   placeholder="Mot de passe (minimum 6 caractères)">
          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading"
                 class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Création en cours...' : 'Créer mon compte' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const handleRegister = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    // Vérifier la longueur du mot de passe
    if (password.value.length < 6) {
      errorMessage.value = 'Le mot de passe doit contenir au moins 6 caractères.'
      return
    }

    // Création du compte avec Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    // Mise à jour du profil avec le nom
    await updateProfile(user, {
      displayName: name.value
    })

    // Création d'un document utilisateur dans Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: name.value,
      email: email.value,
      createdAt: new Date(),
      role: 'owner', // Propriétaire d'institut par défaut
      sites: [] // Liste de sites vide au départ
    })

    // Redirection vers le tableau de bord
    router.push('/dashboard')
  } catch (error) {
    console.error('Erreur d\'inscription:', error)

    // Messages d'erreur adaptés
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage.value = 'Cette adresse email est déjà utilisée par un autre compte.'
        break
      case 'auth/invalid-email':
        errorMessage.value = 'Adresse email invalide.'
        break
      case 'auth/weak-password':
        errorMessage.value = 'Le mot de passe est trop faible. Utilisez au moins 6 caractères.'
        break
      default:
        errorMessage.value = 'Une erreur est survenue lors de la création du compte. Veuillez réessayer.'
    }
  } finally {
    loading.value = false
  }
}
</script>
