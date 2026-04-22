<script setup lang="ts">
  import { ArrowDown, Sparkles, Download } from 'lucide-vue-next'
  import BaseButton from '@/components/ui/BaseButton.vue'

  const cvPath = import.meta.env.BASE_URL + 'cv.pdf'

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
  >
    <!-- Background gradient blobs -->
    <div
      class="absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div
        class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-300/20 dark:bg-primary-900/30 blur-3xl"
      />
      <div
        class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary-200/20 dark:bg-primary-950/40 blur-3xl"
      />
    </div>

    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Badge -->
      <div
        class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-950 dark:text-primary-300 dark:border-primary-800 animate-fade-in"
        style="animation-delay: 0ms; animation-fill-mode: both"
      >
        <Sparkles :size="14" />
        Disponible pour une alternance
      </div>

      <!-- Name -->
      <h1
        class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white animate-fade-in-up"
        style="animation-delay: 100ms; animation-fill-mode: both"
      >
        Bonjour, je suis
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
          Maxime
        </span>
      </h1>

      <!-- Title -->
      <p
        class="text-xl sm:text-2xl font-medium text-slate-600 dark:text-slate-300 animate-fade-in-up"
        style="animation-delay: 200ms; animation-fill-mode: both"
      >
        Développeur Web Full-Stack
      </p>

      <!-- Description -->
      <p
        class="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed animate-fade-in-up"
        style="animation-delay: 300ms; animation-fill-mode: both"
      >
        Alternant passionné par la création d'applications web modernes avec Vue.js, Node.js et TypeScript.
        J'aime transformer des idées en expériences digitales propres et performantes.
      </p>

      <!-- CTA Buttons -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 animate-fade-in-up"
        style="animation-delay: 400ms; animation-fill-mode: both"
      >
        <BaseButton size="lg" @click="scrollTo('skills')">
          Voir mes compétences
        </BaseButton>
        <BaseButton variant="outline" size="lg" @click="scrollTo('contact')">
          Me contacter
        </BaseButton>
        <!-- Rappel : placez public/cv.pdf avant de déployer -->
        <a
          :href="cvPath"
          download="CV-Maxime.pdf"
          class="inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white px-7 py-3.5 text-base"
        >
          <Download :size="18" />
          Mon CV
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <button
      @click="scrollTo('about')"
      class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors animate-bounce"
      aria-label="Défiler vers le bas"
    >
      <span class="text-xs font-medium tracking-widest uppercase">Découvrir</span>
      <ArrowDown :size="16" />
    </button>
  </section>
</template>
