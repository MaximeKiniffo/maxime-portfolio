<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowDown, Sparkles, Download } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useScrollTo } from '@/composables/useScrollTo'

const cvPath = import.meta.env.BASE_URL + 'cv.pdf'
const { scrollTo } = useScrollTo()

const FULL_TITLE = 'Développeur Web Full-Stack'
const typedTitle = ref('')
const isTypingDone = ref(false)
let typingTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    typedTitle.value = FULL_TITLE
    isTypingDone.value = true
    return
  }

  let i = 0
  function typeNext() {
    if (i < FULL_TITLE.length) {
      typedTitle.value += FULL_TITLE[i]
      i++
      typingTimer = setTimeout(typeNext, 55)
    } else {
      typingTimer = setTimeout(() => {
        isTypingDone.value = true
      }, 1200)
    }
  }
  typingTimer = setTimeout(typeNext, 700)
})

onUnmounted(() => {
  if (typingTimer !== null) clearTimeout(typingTimer)
})
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
  >
    <!-- Background gradient blobs -->
    <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
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

      <!-- Name avec shimmer gradient -->
      <h1
        class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white animate-fade-in-up"
        style="animation-delay: 100ms; animation-fill-mode: both"
      >
        Bonjour, je suis
        <span class="shimmer-name">Maxime Kiniffo</span>
      </h1>

      <!-- Titre avec effet typing -->
      <p
        class="text-xl sm:text-2xl font-medium text-slate-600 dark:text-slate-300 animate-fade-in-up min-h-[2rem]"
        style="animation-delay: 200ms; animation-fill-mode: both"
        aria-label="Développeur Web Full-Stack"
      >
        {{ typedTitle
        }}<span v-if="!isTypingDone" class="typing-cursor" aria-hidden="true" />
      </p>

      <!-- Description -->
      <p
        class="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed animate-fade-in-up"
        style="animation-delay: 300ms; animation-fill-mode: both"
      >
        Alternant passionné par la création d'applications web modernes avec Vue.js, Node.js et
        TypeScript. J'aime transformer des idées en expériences digitales propres et performantes.
      </p>

      <!-- CTA Buttons -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 animate-fade-in-up"
        style="animation-delay: 400ms; animation-fill-mode: both"
      >
        <BaseButton size="lg" @click="scrollTo('skills')">Voir mes compétences</BaseButton>
        <BaseButton variant="outline" size="lg" @click="scrollTo('contact')">
          Me contacter
        </BaseButton>
        <a
          :href="cvPath"
          download="CV-Maxime-Kiniffo.pdf"
          class="inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white px-7 py-3.5 text-base"
        >
          <Download :size="18" />
          Mon CV
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <button
      @click="scrollTo('about')"
      class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors animate-bounce focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full p-2"
      aria-label="Défiler vers le bas"
    >
      <span class="text-xs font-medium tracking-widest uppercase">Découvrir</span>
      <ArrowDown :size="16" />
    </button>
  </section>
</template>

<style scoped>
/* Typing cursor blink */
.typing-cursor::after {
  content: '|';
  animation: blink 1s step-end infinite;
  font-weight: 300;
  color: currentColor;
  margin-left: 1px;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* Gradient shimmer sweep on name — plays once */
.shimmer-name {
  display: inline-block;
  background: linear-gradient(
    110deg,
    #4f46e5 10%,
    #7c3aed 30%,
    #c084fc 50%,
    #7c3aed 70%,
    #4f46e5 90%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer-sweep 2s ease-in-out 0.8s both;
}

@keyframes shimmer-sweep {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 100% center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shimmer-name {
    animation: none;
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
    background-clip: text;
    -webkit-background-clip: text;
  }
  .typing-cursor::after {
    animation: none;
    content: '';
  }
}
</style>
