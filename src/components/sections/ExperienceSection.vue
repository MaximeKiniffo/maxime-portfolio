<template>
  <section id="experience" class="section-padding bg-slate-50 dark:bg-slate-800/30">
    <div ref="sectionEl" class="container-max">
      <SectionTitle subtitle="Mes expériences professionnelles et projets réalisés en formation">
        Parcours
      </SectionTitle>

      <!-- Filtres -->
      <div
        class="flex flex-wrap gap-2 mb-10 justify-center"
        role="tablist"
        aria-label="Filtrer par type d'expérience"
      >
        <button
          v-for="f in filters"
          :key="f.key"
          role="tab"
          :aria-selected="activeFilter === f.key"
          :class="[
            'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
            activeFilter === f.key
              ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-400',
          ]"
          @click="activeFilter = f.key"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Cartes -->
      <TransitionGroup name="exp" tag="div" class="grid md:grid-cols-2 gap-6">
        <article
          v-for="(exp, index) in filtered"
          :key="exp.id"
          :style="{ '--stagger': index }"
          :class="[
            'group relative flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900',
            hasExperienceTarget(exp)
              ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700'
              : 'hover:shadow-md',
          ]"
        >
          <a
            v-if="safeExperienceHref(exp)"
            :href="safeExperienceHref(exp)"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute inset-0 z-10 rounded-2xl"
            :aria-label="`Visiter le site de ${exp.company}`"
          >
            <span class="sr-only">Visiter le site de {{ exp.company }}</span>
          </a>
          <RouterLink
            v-else-if="exp.projectPage"
            :to="projectRoute(exp)"
            class="absolute inset-0 z-10 rounded-2xl"
            :aria-label="`Voir la présentation du projet ${exp.company}`"
          >
            <span class="sr-only">Voir la présentation du projet {{ exp.company }}</span>
          </RouterLink>

          <!-- En-tête -->
          <div class="flex items-center justify-between gap-3 mb-3 flex-wrap">
            <span :class="['text-xs font-semibold px-3 py-1 rounded-full', badgeClass[exp.type]]">
              {{ typeLabel[exp.type] }}
            </span>
            <span class="text-sm font-bold text-slate-700 dark:text-slate-200">
              {{ exp.company }}
            </span>
          </div>

          <h3 class="text-base font-semibold text-slate-900 dark:text-white mb-3">
            {{ exp.title }}
          </h3>

          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">
            {{ exp.description }}
          </p>

          <!-- Stack -->
          <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <span
              v-for="tech in exp.stack"
              :key="tech"
              :class="['text-xs px-2.5 py-1 rounded-md font-medium', techClass(tech)]"
            >
              {{ tech }}
            </span>
          </div>

          <div
            v-if="hasExperienceTarget(exp)"
            class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <span>{{ safeExperienceHref(exp) ? 'Visiter le site' : 'Voir le projet' }}</span>
            <ExternalLink v-if="safeExperienceHref(exp)" :size="16" />
            <ArrowRight v-else :size="16" />
          </div>
        </article>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import { ArrowRight, ExternalLink } from 'lucide-vue-next'
  import SectionTitle from '@/components/ui/SectionTitle.vue'
  import { useSingleScrollAnimation } from '@/composables/useScrollAnimation'
  import { experiences, type Experience } from '@/data/experiences'
  import { techClass } from '@/data/techStyles'
  import { safeExternalHref } from '@/utils/safeUrl'

  type Filter = 'all' | 'pro' | 'study'

  const sectionEl = ref<HTMLElement | null>(null)
  useSingleScrollAnimation(sectionEl)

  const activeFilter = ref<Filter>('all')

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Tout' },
    { key: 'pro', label: 'Expériences pro' },
    { key: 'study', label: "Projets d'étude" },
  ]

  const filtered = computed(() => {
    if (activeFilter.value === 'pro')
      return experiences.filter((experience) => experience.type !== 'study')
    if (activeFilter.value === 'study')
      return experiences.filter((experience) => experience.type === 'study')
    return experiences
  })

  const badgeClass: Record<Experience['type'], string> = {
    alternance: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    stage: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
    study: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  }

  const typeLabel: Record<Experience['type'], string> = {
    alternance: 'Alternance',
    stage: 'Stage',
    study: "Projet d'étude",
  }

  function hasExperienceTarget(experience: Experience): boolean {
    return Boolean(safeExperienceHref(experience) || experience.projectPage)
  }

  function safeExperienceHref(experience: Experience): string | undefined {
    return safeExternalHref(experience.websiteUrl)
  }

  function projectRoute(experience: Experience) {
    return { name: 'project-detail', params: { id: experience.id } }
  }
</script>

<style scoped>
  .exp-enter-active {
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
    transition-delay: calc(var(--stagger, 0) * 60ms);
  }

  .exp-leave-active {
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
    position: absolute;
  }

  .exp-enter-from {
    opacity: 0;
    transform: scale(0.95) translateY(12px);
  }

  .exp-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }

  .exp-move {
    transition: transform 0.4s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    .exp-enter-active,
    .exp-leave-active,
    .exp-move {
      transition: none;
      transition-delay: 0ms;
    }

    .exp-enter-from,
    .exp-leave-to {
      opacity: 1;
      transform: none;
    }
  }
</style>
