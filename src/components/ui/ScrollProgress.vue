<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

function update() {
  const scrolled = window.scrollY
  const total = document.documentElement.scrollHeight - window.innerHeight
  progress.value = total > 0 ? Math.min((scrolled / total) * 100, 100) : 0
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  update()
})

onUnmounted(() => window.removeEventListener('scroll', update))
</script>

<template>
  <div
    class="fixed top-16 inset-x-0 z-40 h-0.5 bg-slate-200/40 dark:bg-slate-700/40"
    aria-hidden="true"
  >
    <div
      class="h-full w-full bg-gradient-to-r from-primary-500 to-primary-400"
      :style="{ transform: `scaleX(${progress / 100})`, transformOrigin: 'left' }"
    />
  </div>
</template>
