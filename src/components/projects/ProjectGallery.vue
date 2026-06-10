<template>
  <section
    v-if="activeImage"
    class="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
    aria-label="Aperçus du projet"
  >
    <div
      class="relative aspect-[16/10] bg-slate-100 dark:bg-slate-950"
      tabindex="0"
      @keydown.left.prevent="showPreviousImage"
      @keydown.right.prevent="showNextImage"
    >
      <img
        :src="resolveImageSrc(activeImage.src)"
        :alt="activeImage.alt"
        class="h-full w-full object-cover"
      />

      <button
        v-if="hasManyImages"
        type="button"
        class="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/85 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-primary-400"
        aria-label="Image précédente"
        @click="showPreviousImage"
      >
        <ChevronLeft :size="22" />
      </button>

      <button
        v-if="hasManyImages"
        type="button"
        class="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-slate-900/85 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-primary-400"
        aria-label="Image suivante"
        @click="showNextImage"
      >
        <ChevronRight :size="22" />
      </button>
    </div>

    <div class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="min-w-0">
        <p
          v-if="activeImage.caption"
          class="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          {{ activeImage.caption }}
        </p>
        <p
          v-if="hasManyImages"
          class="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500"
        >
          {{ activeImageIndex + 1 }} / {{ images.length }}
        </p>
      </div>

      <div v-if="hasManyImages" class="flex flex-wrap gap-2">
        <button
          v-for="(image, index) in images"
          :key="image.src"
          type="button"
          :aria-label="`Afficher l'image ${index + 1}`"
          :aria-current="activeImageIndex === index ? 'true' : undefined"
          :class="[
            'h-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500',
            activeImageIndex === index
              ? 'w-8 bg-primary-500'
              : 'w-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500',
          ]"
          @click="selectImage(index)"
        >
          <span class="sr-only">Image {{ index + 1 }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
  import type { ProjectImage } from '@/data/experiences'

  const props = defineProps<{
    images: ProjectImage[]
  }>()

  const activeImageIndex = ref(0)

  const activeImage = computed(() => props.images[activeImageIndex.value])
  const hasManyImages = computed(() => props.images.length > 1)

  function resolveImageSrc(src: string): string {
    if (/^(https?:|data:|blob:)/.test(src)) return src
    return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`
  }

  function showPreviousImage() {
    if (!hasManyImages.value) return
    activeImageIndex.value =
      (activeImageIndex.value - 1 + props.images.length) % props.images.length
  }

  function showNextImage() {
    if (!hasManyImages.value) return
    activeImageIndex.value = (activeImageIndex.value + 1) % props.images.length
  }

  function selectImage(index: number) {
    if (index < 0 || index >= props.images.length) return
    activeImageIndex.value = index
  }

  watch(
    () => props.images,
    (images) => {
      if (activeImageIndex.value >= images.length) {
        activeImageIndex.value = 0
      }
    }
  )
</script>
