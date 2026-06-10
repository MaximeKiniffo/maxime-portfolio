<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
    <SkipToContent />
    <CustomCursor />
    <TheNavbar />
    <ScrollProgress />
    <RouterView />
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
  import TheNavbar from '@/components/layout/TheNavbar.vue'
  import TheFooter from '@/components/layout/TheFooter.vue'
  import ScrollProgress from '@/components/ui/ScrollProgress.vue'
  import SkipToContent from '@/components/ui/SkipToContent.vue'
  import CustomCursor from '@/components/ui/CustomCursor.vue'
</script>
