<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import { experiences } from '@/data/experiences'
import { techClass } from '@/data/techStyles'

const route = useRoute()
const activeImageIndex = ref(0)

const project = computed(() =>
  experiences.find((experience) => experience.id === route.params.id && experience.projectPage),
)

const projectImages = computed(() => project.value?.projectImages ?? [])

const activeImage = computed(() => projectImages.value[activeImageIndex.value])
const hasManyImages = computed(() => projectImages.value.length > 1)

const projectTypeLabel = computed(() => {
  if (!project.value) return ''
  if (project.value.type === 'study') return "Projet d'étude"
  return 'Projet'
})

function resolveImageSrc(src: string): string {
  if (/^(https?:|data:|blob:)/.test(src)) return src
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`
}

function showPreviousImage() {
  if (!hasManyImages.value) return
  activeImageIndex.value =
    (activeImageIndex.value - 1 + projectImages.value.length) % projectImages.value.length
}

function showNextImage() {
  if (!hasManyImages.value) return
  activeImageIndex.value = (activeImageIndex.value + 1) % projectImages.value.length
}

function selectImage(index: number) {
  activeImageIndex.value = index
}

watch(
  () => route.params.id,
  () => {
    activeImageIndex.value = 0
  },
)

watch(projectImages, (images) => {
  if (activeImageIndex.value >= images.length) {
    activeImageIndex.value = 0
  }
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

          <section
            v-if="activeImage"
            class="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
            aria-label="Aperçus du projet"
          >
            <div
              class="relative aspect-[16/10] bg-slate-100 dark:bg-slate-950"
              tabindex="0"
              @keydown.left.prevent="showPreviousImage"
              @keydown.right.prevent="showNextImage"
            >
              <img
                :src="resolveImageSrc(activeImage.src)"
                :alt="activeImage.alt"
                class="h-full w-full object-cover"
              />

              <button
                v-if="hasManyImages"
                type="button"
                class="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/85 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-primary-400"
                aria-label="Image précédente"
                @click="showPreviousImage"
              >
                <ChevronLeft :size="22" />
              </button>

              <button
                v-if="hasManyImages"
                type="button"
                class="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/85 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-primary-400"
                aria-label="Image suivante"
                @click="showNextImage"
              >
                <ChevronRight :size="22" />
              </button>
            </div>

            <div class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="min-w-0">
                <p
                  v-if="activeImage.caption"
                  class="text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  {{ activeImage.caption }}
                </p>
                <p
                  v-if="hasManyImages"
                  class="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500"
                >
                  {{ activeImageIndex + 1 }} / {{ projectImages.length }}
                </p>
              </div>

              <div v-if="hasManyImages" class="flex flex-wrap gap-2">
                <button
                  v-for="(image, index) in projectImages"
                  :key="image.src"
                  type="button"
                  :aria-label="`Afficher l'image ${index + 1}`"
                  :aria-current="activeImageIndex === index ? 'true' : undefined"
                  :class="[
                    'h-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500',
                    activeImageIndex === index
                      ? 'w-8 bg-primary-500'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500',
                  ]"
                  @click="selectImage(index)"
                >
                  <span class="sr-only">Image {{ index + 1 }}</span>
                </button>
              </div>
            </div>
          </section>

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
