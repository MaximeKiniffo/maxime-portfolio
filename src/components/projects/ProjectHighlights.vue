<template>
  <div
    v-if="highlights.length"
    class="rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/60"
  >
    <h2 class="mb-4 text-xl font-bold text-slate-900 dark:text-white">Points clés</h2>
    <ul class="space-y-3">
      <li
        v-for="highlight in highlights"
        :key="highlight"
        class="flex gap-3 text-slate-600 dark:text-slate-300"
      >
        <span class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
        <span>{{ highlight }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    highlights: string[]
  }>()
</script>
