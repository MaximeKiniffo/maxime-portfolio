<script setup lang="ts">
  type Color = 'primary' | 'slate' | 'emerald' | 'amber' | 'rose'
  type Size = 'sm' | 'md'

  interface Props {
    color?: Color
    size?: Size
  }

  withDefaults(defineProps<Props>(), {
    color: 'primary',
    size: 'md',
  })

  const colorClasses: Record<Color, string> = {
    primary:
      'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-950 dark:text-primary-300 dark:border-primary-800',
    slate:
      'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    emerald:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
    amber:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
    rose: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
  }

  const sizeClasses: Record<Size, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 font-medium rounded-full border transition-all duration-200 hover:scale-105',
      colorClasses[color],
      sizeClasses[size],
    ]"
  >
    <slot />
  </span>
</template>
