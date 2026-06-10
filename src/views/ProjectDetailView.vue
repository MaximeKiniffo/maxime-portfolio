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
              :class="[
                'inline-flex mb-4 text-xs font-semibold px-3 py-1 rounded-full',
                projectTypeBadgeClass,
              ]"
            >
              {{ projectTypeLabel }}
            </span>
            <h1
              class="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              {{ project.company }}
            </h1>
            <p class="mt-4 text-xl text-primary-600 dark:text-primary-400 font-semibold">
              {{ project.title }}
            </p>
            <p class="mt-6 text-base sm:text-lg leading-8 text-slate-600 dark:text-slate-300">
              {{ project.description }}
            </p>
          </div>

          <ProjectGallery :images="projectImages" />
          <ProjectHighlights :highlights="project.projectHighlights ?? []" />
        </div>

        <ProjectInfoAside :project="project" />
      </section>

      <section v-else class="max-w-xl mx-auto text-center py-20">
        <p
          class="text-6xl font-bold text-primary-200 dark:text-primary-900 select-none"
          aria-hidden="true"
        >
          404
        </p>
        <h1 class="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Projet introuvable</h1>
        <p class="mt-3 text-slate-500 dark:text-slate-400">
          Le projet demandé n'existe pas ou n'est pas encore publié dans le portfolio.
        </p>
        <BaseButton class="mt-6" @click="goToExperienceSection"> Retour au parcours </BaseButton>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { RouterLink, useRoute, useRouter } from 'vue-router'
  import { ArrowLeft } from 'lucide-vue-next'
  import ProjectGallery from '@/components/projects/ProjectGallery.vue'
  import ProjectHighlights from '@/components/projects/ProjectHighlights.vue'
  import ProjectInfoAside from '@/components/projects/ProjectInfoAside.vue'
  import BaseButton from '@/components/ui/BaseButton.vue'
  import { experiences, type Experience } from '@/data/experiences'

  const route = useRoute()
  const router = useRouter()

  const projectId = computed(() => {
    const id = route.params.id
    return Array.isArray(id) ? id[0] : id
  })

  const project = computed(() =>
    experiences.find((experience) => experience.id === projectId.value && experience.projectPage)
  )

  const projectImages = computed(() => project.value?.projectImages ?? [])

  const projectTypeMeta: Record<Experience['type'], { label: string; className: string }> = {
    alternance: {
      label: 'Alternance',
      className: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    },
    stage: {
      label: 'Stage',
      className: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
    },
    study: {
      label: "Projet d'étude",
      className: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    },
    personal: {
      label: 'Projet perso',
      className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    },
  }

  const projectTypeLabel = computed(() => {
    if (!project.value) return ''
    return projectTypeMeta[project.value.type].label
  })

  const projectTypeBadgeClass = computed(() => {
    if (!project.value) return ''
    return projectTypeMeta[project.value.type].className
  })

  function goToExperienceSection() {
    router.push({ name: 'home', hash: '#experience' })
  }
</script>
