<template>
  <main id="main-content">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ContactSection />
  </main>
</template>

<script setup lang="ts">
  import HeroSection from '@/components/sections/HeroSection.vue'
  import AboutSection from '@/components/sections/AboutSection.vue'
  import SkillsSection from '@/components/sections/SkillsSection.vue'
  import ExperienceSection from '@/components/sections/ExperienceSection.vue'
  import ContactSection from '@/components/sections/ContactSection.vue'
</script>
