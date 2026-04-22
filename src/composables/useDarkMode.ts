import { ref, watch, onMounted } from 'vue'

type Theme = 'light' | 'dark'

const isDark = ref(false)

function applyTheme(dark: boolean) {
  if (dark) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

export function useDarkMode() {
  onMounted(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    isDark.value = stored === 'dark' || (!stored && prefersDark)
  })

  watch(isDark, (value) => {
    applyTheme(value)
  })

  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
