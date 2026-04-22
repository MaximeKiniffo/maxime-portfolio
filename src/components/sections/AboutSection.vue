<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useSingleScrollAnimation } from '@/composables/useScrollAnimation'

const sectionEl = ref<HTMLElement | null>(null)
useSingleScrollAnimation(sectionEl)

const statsEl = ref<HTMLElement | null>(null)

const stats = [
  { label: 'Projets réalisés', value: 12, suffix: '+' },
  { label: 'Technologies maîtrisées', value: 15, suffix: '+' },
  { label: 'Année de formation', value: 3, suffix: 'ème' },
]

const counts = ref([0, 0, 0])

function animateCount(index: number, target: number, duration = 1600) {
  const startTime = performance.now()
  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    counts.value[index] = Math.round(eased * target)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

let statsObserver: IntersectionObserver | null = null

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    stats.forEach((s, i) => {
      counts.value[i] = s.value
    })
    return
  }

  statsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        stats.forEach((s, i) => animateCount(i, s.value))
        statsObserver?.unobserve(entries[0].target)
      }
    },
    { threshold: 0.6 },
  )
  if (statsEl.value) statsObserver.observe(statsEl.value)
})

onUnmounted(() => {
  statsObserver?.disconnect()
})
</script>

<template>
  <section id="about" class="section-padding bg-slate-50 dark:bg-slate-800/30">
    <div ref="sectionEl" class="container-max">
      <SectionTitle subtitle="Quelques mots sur mon parcours et ma vision du métier">
        À propos de moi
      </SectionTitle>

      <div class="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Photo avec anneau gradient animé -->
        <div class="flex justify-center md:justify-start">
          <div class="photo-wrapper">
            <div class="photo-ring" aria-hidden="true" />
            <div class="photo-inner bg-white dark:bg-slate-900">
              <img
                src="https://api.dicebear.com/7.x/initials/svg?seed=MK&backgroundColor=6366f1&textColor=ffffff&fontSize=38"
                alt="Photo de profil de Maxime"
                class="w-full h-full object-cover"
                width="200"
                height="200"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <!-- Contenu texte -->
        <div class="space-y-5">
          <p class="text-lg font-semibold text-slate-800 dark:text-white leading-relaxed">
            Développeur web fullstack en alternance, je conçois et déploie des applications de A à
            Z — avec une attention particulière portée à la qualité du code, la performance et
            l'expérience utilisateur.
          </p>

          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
            Mon quotidien tourne autour de
            <span class="keyword">Vue.js</span>,
            <span class="keyword">TypeScript</span> et
            <span class="keyword">Node.js</span>. J'aime construire des interfaces fluides et des
            APIs robustes, en gardant toujours le cap sur le besoin métier réel derrière chaque
            fonctionnalité.
          </p>

          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
            Formé en alternance, j'ai eu la chance de travailler sur des projets concrets dès le
            début de ma formation — ce qui m'a appris à collaborer avec des équipes techniques
            comme non-techniques, à itérer rapidement et à livrer du code fiable. Je m'appuie sur
            <span class="keyword">NestJS</span> pour les backends structurés et j'explore
            activement les bonnes pratiques autour de l'architecture et de la scalabilité.
          </p>

          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
            Curieux par nature, je m'intéresse à l'architecture logicielle, aux design systems et à
            la performance web. Je suis activement à la recherche d'une alternance ou
            d'opportunités où je pourrai progresser sur des projets stimulants et impactants.
          </p>

          <!-- Stats animées -->
          <div ref="statsEl" class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <div
              v-for="(stat, index) in stats"
              :key="stat.label"
              class="flex flex-row sm:flex-col items-center text-left sm:text-center gap-3 sm:gap-0 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <span
                class="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 tabular-nums leading-none"
              >
                {{ counts[index] }}{{ stat.suffix }}
              </span>
              <span class="text-xs text-slate-500 dark:text-slate-400 sm:mt-1.5 leading-tight">
                {{ stat.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.photo-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .photo-wrapper {
    width: 200px;
    height: 200px;
  }
}

.photo-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #6366f1,
    #8b5cf6,
    #ec4899,
    #f59e0b,
    #10b981,
    #6366f1
  );
  animation: ring-spin 10s linear infinite;
}

.photo-inner {
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  overflow: hidden;
}

@keyframes ring-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .photo-ring {
    animation: none;
    background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  }
}

.keyword {
  font-weight: 600;
  color: #4f46e5;
  background-color: #eef2ff;
  padding: 0.05em 0.35em;
  border-radius: 0.3rem;
}

:global(html.dark) .keyword {
  color: #a5b4fc;
  background-color: rgba(99, 102, 241, 0.15);
}
</style>
