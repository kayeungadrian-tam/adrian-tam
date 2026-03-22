import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useScrollAnimation(threshold = 0.15): {
  elRef: Ref<HTMLElement | null>
  isVisible: Ref<boolean>
} {
  const elRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!elRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    observer.observe(elRef.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { elRef, isVisible }
}
