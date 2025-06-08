<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-500 transition-colors duration-200">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Mode sombre
onMounted(() => {
  // Détection initiale du mode sombre
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches) {
    document.documentElement.classList.add('dark')
  }

  // Écoute des changements de préférence
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })
})
</script>
