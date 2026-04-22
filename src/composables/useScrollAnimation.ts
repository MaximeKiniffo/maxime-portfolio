import { onMounted, onUnmounted, type Ref } from 'vue'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  animationClass?: string
}

export function useScrollAnimation(
  elements: Ref<HTMLElement[]>,
  options: ScrollAnimationOptions = {}
) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    animationClass = 'animate-fade-in-up',
  } = options

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass)
            entry.target.classList.remove('opacity-0')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    elements.value.forEach((el) => {
      el.classList.add('opacity-0')
      observer?.observe(el)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}

export function useSingleScrollAnimation(
  el: Ref<HTMLElement | null>,
  options: ScrollAnimationOptions = {}
) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    animationClass = 'animate-fade-in-up',
  } = options

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!el.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass)
            entry.target.classList.remove('opacity-0')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    el.value.classList.add('opacity-0')
    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
