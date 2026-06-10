<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import ThemeToggle from './ThemeToggle.vue'
import { navItems } from '@/data/navigation'
import { useScrollTo } from '@/composables/useScrollTo'
import { useActiveSection } from '@/composables/useActiveSection'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const route = useRoute()
const router = useRouter()
const { scrollTo } = useScrollTo()
const { activeSection } = useActiveSection()

function handleScroll() {
  isScrolled.value = window.scrollY > 20
  if (isMenuOpen.value && window.scrollY > 80) {
    isMenuOpen.value = false
  }
}

async function navigateTo(href: string) {
  isMenuOpen.value = false
  if (route.name !== 'home') {
    await router.push({ name: 'home', hash: href })
    return
  }

  scrollTo(href.replace('#', ''))
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    :class="[
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      isScrolled ? 'glass-nav shadow-sm' : 'bg-transparent',
    ]"
  >
    <nav
      class="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"
      aria-label="Navigation principale"
    >
      <!-- Logo -->
      <a
        href="#hero"
        @click.prevent="navigateTo('#hero')"
        class="text-lg font-bold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
      >
        Maxime Kiniffo<span class="text-primary-500">.</span>
      </a>

      <!-- Desktop navigation -->
      <ul class="hidden md:flex items-center gap-1" role="list">
        <li v-for="item in navItems" :key="item.href">
          <a
            :href="item.href"
            @click.prevent="navigateTo(item.href)"
            :aria-current="activeSection === item.href.replace('#', '') ? 'page' : undefined"
            :class="[
              'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 inline-block',
              activeSection === item.href.replace('#', '')
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50'
                : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800',
            ]"
          >
            <span class="relative">
              {{ item.label }}
              <span
                :class="[
                  'absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-primary-500 transition-all duration-300 origin-left',
                  activeSection === item.href.replace('#', '')
                    ? 'scale-x-100 opacity-100'
                    : 'scale-x-0 opacity-0',
                ]"
              />
            </span>
          </a>
        </li>
      </ul>

      <!-- Right side -->
      <div class="flex items-center gap-2">
        <ThemeToggle />
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 relative z-50"
          :aria-label="isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
        >
          <Transition name="burger" mode="out-in">
            <X v-if="isMenuOpen" :key="'close'" :size="20" />
            <Menu v-else :key="'open'" :size="20" />
          </Transition>
        </button>
      </div>
    </nav>
  </header>

  <!-- Mobile menu overlay (Teleport keeps z-index stacking correct) -->
  <Teleport to="body">
    <Transition name="mobile-overlay">
      <div
        v-if="isMenuOpen"
        id="mobile-menu"
        class="fixed inset-0 z-40 md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          @click="isMenuOpen = false"
        />
        <!-- Panel -->
        <div class="relative bg-white dark:bg-slate-900 shadow-xl">
          <div class="h-16" aria-hidden="true" />
          <ul class="px-4 py-3 flex flex-col gap-1" role="list">
            <li v-for="item in navItems" :key="item.href">
              <a
                :href="item.href"
                @click.prevent="navigateTo(item.href)"
                :aria-current="activeSection === item.href.replace('#', '') ? 'page' : undefined"
                :class="[
                  'flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  activeSection === item.href.replace('#', '')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50'
                    : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800',
                ]"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
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

.mobile-overlay-enter-active,
.mobile-overlay-leave-active {
  transition: opacity 0.25s ease;
}
.mobile-overlay-enter-from,
.mobile-overlay-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .mobile-overlay-enter-active,
  .mobile-overlay-leave-active {
    transition: none;
  }
}
</style>
