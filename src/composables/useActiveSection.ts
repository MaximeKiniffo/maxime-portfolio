import { ref, onMounted, onUnmounted } from 'vue'

const SECTION_IDS = ['hero', 'about', 'skills', 'experience', 'contact']

export function useActiveSection() {
  const activeSection = ref<string>('hero')
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )

    const visible = new Set<string>()

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id)
          } else {
            visible.delete(entry.target.id)
          }
        }
        for (const id of SECTION_IDS) {
          if (visible.has(id)) {
            activeSection.value = id
            break
          }
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-80px 0px -40% 0px',
      },
    )

    sections.forEach((s) => observer!.observe(s))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { activeSection }
}
