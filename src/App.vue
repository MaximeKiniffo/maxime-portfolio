<script setup lang="ts">
  import TheNavbar from '@/components/layout/TheNavbar.vue'
  import TheFooter from '@/components/layout/TheFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
    <TheNavbar />
    <RouterView />
    <TheFooter />
  </div>
</template>
