import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useCountAnimation(
  target: number,
  el: Ref<HTMLElement | null>,
  duration = 2000,
): Ref<number> {
  const count = ref(0)
  let observer: IntersectionObserver | null = null
  let rafId: number | null = null

  const animate = () => {
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      count.value = Math.round(eased * target)
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      }
    }
    rafId = requestAnimationFrame(step)
  }

  onMounted(() => {
    if (!el.value) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      count.value = target
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate()
          observer?.unobserve(entries[0].target)
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    if (rafId !== null) cancelAnimationFrame(rafId)
  })

  return count
}
