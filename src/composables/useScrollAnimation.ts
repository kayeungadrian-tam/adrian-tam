import { ref, reactive, onMounted, onBeforeUnmount, type Ref } from 'vue'

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

/**
 * Observe multiple elements with a single IntersectionObserver.
 * Returns a ref-setter function and a reactive visibility array.
 */
export function useStaggeredScrollAnimation(count: number, threshold = 0.15): {
  setRef: (el: HTMLElement | null, index: number) => void
  visible: boolean[]
} {
  const elements: (HTMLElement | null)[] = []
  const visible = reactive<boolean[]>(Array.from({ length: count }, () => false))
  let observer: IntersectionObserver | null = null

  function setRef(el: HTMLElement | null, index: number) {
    elements[index] = el
  }

  onMounted(() => {
    const indexMap = new WeakMap<Element, number>()

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = indexMap.get(entry.target)
            if (i !== undefined) {
              visible[i] = true
              observer?.unobserve(entry.target)
            }
          }
        })
      },
      { threshold }
    )

    elements.forEach((el, i) => {
      if (!el) return
      indexMap.set(el, i)
      observer!.observe(el)
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { setRef, visible }
}
