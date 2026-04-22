<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggle } = useDarkMode()
</script>

<template>
  <button
    @click="toggle"
    class="relative flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
    :aria-label="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
  >
    <Transition name="theme-icon" mode="out-in">
      <Sun v-if="isDark" :key="'sun'" :size="18" />
      <Moon v-else :key="'moon'" :size="18" />
    </Transition>
  </button>
</template>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.35s ease;
}
.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}

@media (prefers-reduced-motion: reduce) {
  .theme-icon-enter-active,
  .theme-icon-leave-active {
    transition: opacity 0.15s ease;
  }
  .theme-icon-enter-from,
  .theme-icon-leave-to {
    transform: none;
  }
}
</style>
