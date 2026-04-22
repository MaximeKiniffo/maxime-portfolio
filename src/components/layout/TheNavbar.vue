<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { Menu, X } from 'lucide-vue-next'
  import ThemeToggle from './ThemeToggle.vue'
  import { navItems } from '@/data/navigation'

  const isMenuOpen = ref(false)
  const isScrolled = ref(false)

  function handleScroll() {
    isScrolled.value = window.scrollY > 20
  }

  function scrollTo(href: string) {
    isMenuOpen.value = false
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  onMounted(() => window.addEventListener('scroll', handleScroll))
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    :class="[
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      isScrolled
        ? 'glass-nav shadow-sm'
        : 'bg-transparent',
    ]"
  >
    <nav class="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
      <!-- Logo -->
      <a
        href="#hero"
        @click.prevent="scrollTo('#hero')"
        class="text-lg font-bold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        Maxime<span class="text-primary-500">.</span>
      </a>

      <!-- Navigation desktop -->
      <ul class="hidden md:flex items-center gap-1">
        <li v-for="item in navItems" :key="item.href">
          <a
            :href="item.href"
            @click.prevent="scrollTo(item.href)"
            class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- Right side -->
      <div class="flex items-center gap-2">
        <ThemeToggle />

        <!-- Hamburger -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          :aria-label="isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          :aria-expanded="isMenuOpen"
        >
          <Transition name="burger" mode="out-in">
            <X v-if="isMenuOpen" :key="'close'" :size="20" />
            <Menu v-else :key="'open'" :size="20" />
          </Transition>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        class="md:hidden glass-nav border-t border-slate-200/50 dark:border-slate-700/50"
      >
        <ul class="container-max px-4 py-3 flex flex-col gap-1">
          <li v-for="item in navItems" :key="item.href">
            <a
              :href="item.href"
              @click.prevent="scrollTo(item.href)"
              class="block px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
  .burger-enter-active,
  .burger-leave-active {
    transition: all 0.15s ease;
  }
  .burger-enter-from,
  .burger-leave-to {
    opacity: 0;
    transform: scale(0.8) rotate(15deg);
  }

  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: all 0.25s ease;
    overflow: hidden;
  }
  .mobile-menu-enter-from,
  .mobile-menu-leave-to {
    opacity: 0;
    max-height: 0;
  }
  .mobile-menu-enter-to,
  .mobile-menu-leave-from {
    opacity: 1;
    max-height: 300px;
  }
</style>
