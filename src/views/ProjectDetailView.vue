<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ArrowLeft, ExternalLink } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import { experiences } from '@/data/experiences'
import { techClass } from '@/data/techStyles'

const route = useRoute()

const project = computed(() =>
  experiences.find((experience) => experience.id === route.params.id && experience.projectPage),
)

const projectTypeLabel = computed(() => {
  if (!project.value) return ''
  if (project.value.type === 'study') return "Projet d'étude"
  return 'Projet'
})
</script>

<template>
  <main class="min-h-screen bg-white dark:bg-slate-900 section-padding pt-28">
    <div class="container-max">
      <RouterLink
        :to="{ name: 'home', hash: '#experience' }"
        class="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <ArrowLeft :size="18" />
        Retour au parcours
      </RouterLink>

      <section v-if="project" class="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
        <div class="space-y-8">
          <div>
            <span
              class="inline-flex mb-4 text-xs font-semibold px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
            >
              {{ projectTypeLabel }}
            </span>
            <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {{ project.company }}
            </h1>
            <p class="mt-4 text-xl text-primary-600 dark:text-primary-400 font-semibold">
              {{ project.title }}
            </p>
            <p class="mt-6 text-base sm:text-lg leading-8 text-slate-600 dark:text-slate-300">
              {{ project.description }}
            </p>
          </div>

          <div
            v-if="project.projectHighlights?.length"
            class="rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-6"
          >
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Points clés
            </h2>
            <ul class="space-y-3">
              <li
                v-for="highlight in project.projectHighlights"
                :key="highlight"
                class="flex gap-3 text-slate-600 dark:text-slate-300"
              >
                <span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
                <span>{{ highlight }}</span>
              </li>
            </ul>
          </div>
        </div>

        <aside
          class="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
        >
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">
            Infos projet
          </h2>

          <div class="mt-6 space-y-5">
            <div>
              <p class="text-xs uppercase tracking-wide font-semibold text-slate-400 dark:text-slate-500">
                Rôle
              </p>
              <p class="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                {{ project.title }}
              </p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wide font-semibold text-slate-400 dark:text-slate-500">
                Stack
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="tech in project.stack"
                  :key="tech"
                  :class="['text-xs px-2.5 py-1 rounded-md font-medium', techClass(tech)]"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <a
              v-if="project.projectUrl"
              :href="project.projectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-offset-slate-900"
            >
              Voir le projet hébergé
              <ExternalLink :size="16" />
            </a>
          </div>
        </aside>
      </section>

      <section v-else class="max-w-xl mx-auto text-center py-20">
        <p class="text-6xl font-bold text-primary-200 dark:text-primary-900 select-none" aria-hidden="true">
          404
        </p>
        <h1 class="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
          Projet introuvable
        </h1>
        <p class="mt-3 text-slate-500 dark:text-slate-400">
          Le projet demandé n'existe pas ou n'est pas encore publié dans le portfolio.
        </p>
        <BaseButton class="mt-6" @click="$router.push({ name: 'home', hash: '#experience' })">
          Retour au parcours
        </BaseButton>
      </section>
    </div>
  </main>
</template>
