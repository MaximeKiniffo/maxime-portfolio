<template>
  <aside
    class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
  >
    <h2 class="text-lg font-bold text-slate-900 dark:text-white">Infos projet</h2>

    <div class="mt-6 space-y-5">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Rôle
        </p>
        <p class="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          {{ project.title }}
        </p>
      </div>

      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Stack
        </p>
        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="tech in project.stack"
            :key="tech"
            :class="['rounded-md px-2.5 py-1 text-xs font-medium', techClass(tech)]"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <a
        v-if="safeProjectUrl"
        :href="safeProjectUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-offset-slate-900"
      >
        Voir le projet hébergé
        <ExternalLink :size="16" />
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { ExternalLink } from 'lucide-vue-next'
  import type { Experience } from '@/data/experiences'
  import { techClass } from '@/data/techStyles'
  import { safeExternalHref } from '@/utils/safeUrl'

  const props = defineProps<{
    project: Experience
  }>()

  const safeProjectUrl = computed(() => safeExternalHref(props.project.projectUrl))
</script>
