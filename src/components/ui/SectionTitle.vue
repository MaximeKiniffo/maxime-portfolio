<script setup lang="ts">
  interface Props {
    tag?: 'h1' | 'h2' | 'h3'
    align?: 'left' | 'center'
    subtitle?: string
  }

  withDefaults(defineProps<Props>(), {
    tag: 'h2',
    align: 'center',
  })
</script>

<template>
  <div :class="['mb-12', align === 'center' ? 'text-center' : 'text-left']">
    <component
      :is="tag"
      class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight"
    >
      <slot />
    </component>
    <div
      :class="[
        'mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-primary-400',
        align === 'center' ? 'mx-auto' : '',
      ]"
    />
    <p
      v-if="subtitle"
      class="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl"
      :class="align === 'center' ? 'mx-auto' : ''"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
