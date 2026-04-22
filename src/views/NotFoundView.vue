<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import BaseButton from '@/components/ui/BaseButton.vue'

  const router = useRouter()
</script>

<template>
  <main class="min-h-screen flex items-center justify-center px-4 text-center">
    <div class="space-y-6">
      <p class="text-8xl font-bold text-primary-200 dark:text-primary-900 select-none" aria-hidden="true">
        404
      </p>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
        Page introuvable
      </h1>
      <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <BaseButton @click="router.push('/')">
        Retour à l'accueil
      </BaseButton>
    </div>
  </main>
</template>
