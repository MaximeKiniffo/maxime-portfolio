<script setup lang="ts">
  import { Github, Linkedin, Mail } from 'lucide-vue-next'
  import { socialLinks } from '@/data/socialLinks'

  const iconMap = { github: Github, linkedin: Linkedin, mail: Mail }

  const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
    <div class="container-max px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-sm text-slate-500 dark:text-slate-400">
        © {{ currentYear }} — Maxime. Conçu et développé avec
        <span class="text-primary-500">♥</span>
      </p>

      <div class="flex items-center gap-3">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.href"
          :aria-label="link.label"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
        >
          <component :is="iconMap[link.icon]" :size="16" />
        </a>
      </div>
    </div>
  </footer>
</template>
