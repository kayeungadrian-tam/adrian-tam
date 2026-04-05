export function useMagnetic(strength = 0.3) {
  function onMove(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  function onLeave(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement
    el.style.transform = ''
  }

  return { onMove, onLeave }
}
