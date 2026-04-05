import { ref, watchEffect } from 'vue'

const isDark = ref(false)
let initialized = false

export function useDarkMode() {
  if (!initialized && typeof window !== 'undefined') {
    initialized = true
    const stored = localStorage.getItem('theme')
    if (stored) {
      isDark.value = stored === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    watchEffect(() => {
      document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    })
  }

  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
