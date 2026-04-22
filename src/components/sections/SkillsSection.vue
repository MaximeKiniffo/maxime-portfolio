<script setup lang="ts">
  import { ref, computed } from 'vue'
  import SectionTitle from '@/components/ui/SectionTitle.vue'
  import BaseBadge from '@/components/ui/BaseBadge.vue'
  import { useSingleScrollAnimation } from '@/composables/useScrollAnimation'
  import { skills, categories, type SkillCategory } from '@/data/skills'

  const sectionEl = ref<HTMLElement | null>(null)
  useSingleScrollAnimation(sectionEl)

  const categoryColors: Record<SkillCategory, 'primary' | 'emerald' | 'amber' | 'rose'> = {
    Frontend: 'primary',
    Backend: 'emerald',
    Outils: 'amber',
    'Base de données': 'rose',
  }

  const levelDots: Record<string, number> = {
    débutant: 1,
    intermédiaire: 2,
    avancé: 3,
  }

  const skillsByCategory = computed(() =>
    categories.map((cat) => ({
      category: cat,
      color: categoryColors[cat],
      skills: skills.filter((s) => s.category === cat),
    }))
  )
</script>

<template>
  <section id="skills" class="section-padding">
    <div ref="sectionEl" class="container-max">
      <SectionTitle subtitle="Les technologies que j'utilise au quotidien dans mes projets">
        Compétences
      </SectionTitle>

      <div class="grid sm:grid-cols-2 gap-8">
        <div
          v-for="group in skillsByCategory"
          :key="group.category"
          class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200"
        >
          <!-- Category header -->
          <div class="flex items-center gap-2 mb-5">
            <BaseBadge :color="group.color" size="sm">
              {{ group.category }}
            </BaseBadge>
            <div class="flex-1 h-px bg-slate-100 dark:bg-slate-700" />
          </div>

          <!-- Skills list -->
          <ul class="space-y-3">
            <li
              v-for="skill in group.skills"
              :key="skill.name"
              class="flex items-center justify-between"
            >
              <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
                {{ skill.name }}
              </span>
              <!-- Level indicator dots -->
              <div class="flex items-center gap-1" :aria-label="`Niveau : ${skill.level}`">
                <span
                  v-for="n in 3"
                  :key="n"
                  :class="[
                    'w-2 h-2 rounded-full transition-colors',
                    n <= levelDots[skill.level]
                      ? group.color === 'primary'
                        ? 'bg-primary-500'
                        : group.color === 'emerald'
                          ? 'bg-emerald-500'
                          : group.color === 'amber'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                      : 'bg-slate-200 dark:bg-slate-700',
                  ]"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Legend -->
      <div class="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400 dark:text-slate-500">
        <div class="flex items-center gap-1.5">
          <span class="flex gap-0.5">
            <span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span class="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
            <span class="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
          </span>
          Débutant
        </div>
        <div class="flex items-center gap-1.5">
          <span class="flex gap-0.5">
            <span class="w-2 h-2 rounded-full bg-primary-400" />
            <span class="w-2 h-2 rounded-full bg-primary-400" />
            <span class="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
          </span>
          Intermédiaire
        </div>
        <div class="flex items-center gap-1.5">
          <span class="flex gap-0.5">
            <span class="w-2 h-2 rounded-full bg-primary-500" />
            <span class="w-2 h-2 rounded-full bg-primary-500" />
            <span class="w-2 h-2 rounded-full bg-primary-500" />
          </span>
          Avancé
        </div>
      </div>
    </div>
  </section>
</template>
