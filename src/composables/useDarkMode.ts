import { ref, watch, onMounted } from 'vue'

type Theme = 'light' | 'dark'

const isDark = ref(false)

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem('theme')
    return stored === 'dark' || stored === 'light' ? stored : null
  } catch {
    return null
  }
}

function setStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

function applyTheme(dark: boolean) {
  if (dark) {
    document.documentElement.classList.add('dark')
    setStoredTheme('dark')
  } else {
    document.documentElement.classList.remove('dark')
    setStoredTheme('light')
  }
}

export function useDarkMode() {
  onMounted(() => {
    const stored = getStoredTheme()
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
