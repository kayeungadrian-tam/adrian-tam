import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useParallax() {
  const scrollY = ref(0)
  let ticking = false

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        scrollY.value = window.scrollY
        ticking = false
      })
      ticking = true
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    scrollY.value = window.scrollY
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { scrollY }
}
