<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, markRaw, type Component } from 'vue'
import { Icon } from '@iconify/vue'
import type { Skill } from '@/data/skills'
import IconWindsurf from '@/components/icons/IconWindsurf.vue'

const props = defineProps<{ skill: Skill }>()

const cardEl = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const isCustom = computed(() => props.skill.icon === 'custom')

const levelLabel = computed(() => {
  if (props.skill.level === 0) return 'Notions'
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
    class="skill-card flex flex-col gap-3 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-800/50 hover:shadow-lg transition-[border-color,box-shadow,transform] duration-300"
  >
    <!-- Icon + Name row -->
    <div class="flex items-center gap-3">
      <div
        class="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-700/60 shrink-0"
      >
        <IconWindsurf v-if="isCustom" class="w-6 h-6" />
        <Icon v-else :icon="skill.icon" width="24" height="24" />
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
  transform: translateY(-6px) rotate(0.5deg);
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
