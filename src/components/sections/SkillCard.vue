<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, markRaw, type Component } from 'vue'
import { Code, Palette, Globe, GitBranch, Code2, Database } from 'lucide-vue-next'
import type { Skill } from '@/data/skills'
import IconVue from '@/components/icons/IconVue.vue'
import IconTypeScript from '@/components/icons/IconTypeScript.vue'
import IconNodejs from '@/components/icons/IconNodejs.vue'
import IconNestjs from '@/components/icons/IconNestjs.vue'
import IconJavaScript from '@/components/icons/IconJavaScript.vue'
import IconSymfony from '@/components/icons/IconSymfony.vue'

const props = defineProps<{ skill: Skill }>()

const cardEl = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const lucideMap: Record<string, Component> = {
  code: markRaw(Code),
  palette: markRaw(Palette),
  globe: markRaw(Globe),
  'git-branch': markRaw(GitBranch),
  'code-2': markRaw(Code2),
  database: markRaw(Database),
  container: markRaw(Database), // fallback to Database if Container isn't available
}

const customMap: Record<string, Component> = {
  vue: markRaw(IconVue),
  typescript: markRaw(IconTypeScript),
  nodejs: markRaw(IconNodejs),
  nestjs: markRaw(IconNestjs),
  javascript: markRaw(IconJavaScript),
  symfony: markRaw(IconSymfony),
}

const iconComponent = computed((): Component => {
  if (props.skill.icon === 'custom') {
    return customMap[props.skill.id] ?? markRaw(Code)
  }
  return lucideMap[props.skill.icon] ?? markRaw(Code)
})

const levelLabel = computed(() => {
  if (props.skill.level >= 80) return 'Expert'
  if (props.skill.level >= 60) return 'Avancé'
  if (props.skill.level >= 35) return 'Intermédiaire'
  return 'Débutant'
})

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!cardEl.value) return
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true
        observer?.unobserve(entries[0].target)
      }
    },
    { threshold: 0.25 },
  )
  observer.observe(cardEl.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="cardEl"
    class="skill-card flex flex-col gap-3 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-[border-color,box-shadow] duration-300"
  >
    <!-- Icon + Name row -->
    <div class="flex items-center gap-3">
      <div
        class="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0"
      >
        <component :is="iconComponent" :size="20" width="20" height="20" />
      </div>
      <div class="min-w-0">
        <h3 class="font-semibold text-slate-800 dark:text-white text-sm leading-tight truncate">
          {{ skill.name }}
        </h3>
        <span class="text-xs text-slate-400 dark:text-slate-500">{{ levelLabel }}</span>
      </div>
      <span class="ml-auto text-sm font-bold text-slate-400 dark:text-slate-500 tabular-nums shrink-0">
        {{ skill.level }}%
      </span>
    </div>

    <!-- Animated progress bar -->
    <div
      class="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"
      :aria-label="`Niveau : ${skill.level}%`"
      role="progressbar"
      :aria-valuenow="skill.level"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        :class="['h-full rounded-full', skill.color]"
        :style="{
          width: isVisible ? `${skill.level}%` : '0%',
          transition: isVisible ? 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.skill-card {
  will-change: transform;
}

.skill-card:hover {
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .skill-card:hover {
    transform: none;
  }

  .skill-card :deep([style*='transition']) {
    transition: none !important;
  }
}
</style>
