<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  email: '',
  password: ''
});

const isLoading = ref(false);
const error = ref('');

const handleLogin = async () => {
  if (!form.value.email || !form.value.password) {
    error.value = 'Veuillez remplir tous les champs';
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    const response = await authStore.login(form.value.email, form.value.password);
    
    if (response.success) {
      router.push('/dashboard');
    } else {
      error.value = response.message || 'Erreur de connexion';
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur de connexion';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Se connecter
        </h2>
      </div>
      
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>
        
        <div>
          <label for="email" class="sr-only">Email</label>
          <input
            id="email"
            v-model="form.email"
            name="email"
            type="email"
            required
            class="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Adresse email"
          />
        </div>
        
        <div>
          <label for="password" class="sr-only">Mot de passe</label>
          <input
            id="password"
            v-model="form.password"
            name="password"
            type="password"
            required
            class="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Mot de passe"
          />
        </div>
        
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {{ isLoading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>