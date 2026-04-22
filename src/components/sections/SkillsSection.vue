<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SkillCard from '@/components/sections/SkillCard.vue'
import { useSingleScrollAnimation } from '@/composables/useScrollAnimation'
import { skills } from '@/data/skills'

const sectionEl = ref<HTMLElement | null>(null)
useSingleScrollAnimation(sectionEl)

const activeCategory = ref<string>('all')

const filters = [
  { id: 'all', label: 'Tous' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Outils' },
  { id: 'database', label: 'Base de données' },
]

const filteredSkills = computed(() =>
  activeCategory.value === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory.value),
)
</script>

<template>
  <section id="skills" class="section-padding">
    <div ref="sectionEl" class="container-max">
      <SectionTitle subtitle="Les technologies que j'utilise au quotidien dans mes projets">
        Compétences
      </SectionTitle>

      <!-- Filtres par catégorie — tablist pour l'accessibilité -->
      <div
        class="flex overflow-x-auto gap-2 mb-10 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center"
        role="tablist"
        aria-label="Filtrer les compétences par catégorie"
        id="skills-filter"
      >
        <button
          v-for="filter in filters"
          :key="filter.id"
          role="tab"
          :id="`tab-${filter.id}`"
          :aria-selected="activeCategory === filter.id"
          :aria-controls="activeCategory === filter.id ? 'skills-grid' : undefined"
          :class="[
            'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
            activeCategory === filter.id
              ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-400',
          ]"
          @click="activeCategory = filter.id"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Grille de skills avec animation de transition -->
      <TransitionGroup
        name="skill"
        tag="div"
        id="skills-grid"
        role="tabpanel"
        :aria-labelledby="`tab-${activeCategory}`"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          v-for="(skill, index) in filteredSkills"
          :key="skill.id"
          :style="{ '--stagger': index } as Record<string, unknown>"
        >
          <SkillCard :skill="skill" />
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.skill-enter-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
  transition-delay: calc(var(--stagger, 0) * 40ms);
}

.skill-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  position: absolute;
}

.skill-enter-from {
  opacity: 0;
  transform: scale(0.92) translateY(12px);
}

.skill-leave-to {
  opacity: 0;
  transform: scale(0.92);
}

.skill-move {
  transition: transform 0.4s ease;
}

@media (prefers-reduced-motion: reduce) {
  .skill-enter-active,
  .skill-leave-active,
  .skill-move {
    transition: none;
    transition-delay: 0ms;
  }

  .skill-enter-from,
  .skill-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
