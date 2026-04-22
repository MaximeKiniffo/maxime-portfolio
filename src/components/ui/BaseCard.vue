<script setup lang="ts">
  interface Props {
    hover?: boolean
    padding?: 'sm' | 'md' | 'lg'
  }

  const props = withDefaults(defineProps<Props>(), {
    hover: true,
    padding: 'md',
  })

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
</script>

<template>
  <div
    :class="[
      'rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 transition-all duration-200',
      paddingClasses[padding],
      hover ? 'hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-0.5' : '',
    ]"
  >
    <slot />
  </div>
</template>
