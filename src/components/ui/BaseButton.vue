<script setup lang="ts">
  import { computed } from 'vue'
  import { safeHref } from '@/utils/safeUrl'

  type Variant = 'primary' | 'outline' | 'ghost'
  type Size = 'sm' | 'md' | 'lg'

  interface Props {
    variant?: Variant
    size?: Size
    href?: string
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    disabled: false,
    type: 'button',
  })

  const safeButtonHref = computed(() => safeHref(props.href))

  const variantClasses: Record<Variant, string> = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.99]',
    outline:
      'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950 hover:scale-[1.02] active:scale-[0.99]',
    ghost:
      'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
  }

  const sizeClasses: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }
</script>

<template>
  <a
    v-if="safeButtonHref"
    :href="safeButtonHref"
    :class="[
      'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900',
      variantClasses[variant ?? 'primary'],
      sizeClasses[size ?? 'md'],
    ]"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses[variant ?? 'primary'],
      sizeClasses[size ?? 'md'],
    ]"
  >
    <slot />
  </button>
</template>
