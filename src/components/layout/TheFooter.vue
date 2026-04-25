<script setup lang="ts">
import { Github, Linkedin, Mail } from 'lucide-vue-next'
import { socialLinks } from '@/data/socialLinks'

const iconMap: Record<string, object> = { github: Github, linkedin: Linkedin, mail: Mail }

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
    <div class="container-max px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-center sm:text-left">
          <p class="text-xs text-slate-400 dark:text-slate-500">
            © {{ currentYear }} — Maxime Kiniffo. Tous droits réservés.
          </p>
        </div>

        <!-- Social icons -->
        <div class="flex items-center gap-2">
          <a
            v-for="link in socialLinks"
            :key="link.id"
            :href="link.url"
            :aria-label="link.name"
            :target="link.url.startsWith('mailto:') ? undefined : '_blank'"
            :rel="link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
            class="flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <component :is="iconMap[link.icon]" :size="18" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
