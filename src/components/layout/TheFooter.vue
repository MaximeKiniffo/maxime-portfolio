<script setup lang="ts">
import { computed, type Component } from 'vue'
import { Github, Linkedin, Mail } from 'lucide-vue-next'
import { socialLinks } from '@/data/socialLinks'
import { isExternalHref, safeHref } from '@/utils/safeUrl'

const iconMap: Record<(typeof socialLinks)[number]['icon'], Component> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

const currentYear = new Date().getFullYear()
const safeSocialLinks = computed(() =>
  socialLinks.flatMap((link) => {
    const safeUrl = safeHref(link.url)
    return safeUrl ? [{ ...link, safeUrl }] : []
  }),
)
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
            v-for="link in safeSocialLinks"
            :key="link.id"
            :href="link.safeUrl"
            :aria-label="link.name"
            :target="isExternalHref(link.safeUrl) ? '_blank' : undefined"
            :rel="isExternalHref(link.safeUrl) ? 'noopener noreferrer' : undefined"
            class="flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <component :is="iconMap[link.icon]" :size="18" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
