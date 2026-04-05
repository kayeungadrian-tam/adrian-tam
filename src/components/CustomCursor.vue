<template>
  <div ref="dotRef" class="cursor-dot" />
  <div ref="ringRef" class="cursor-ring" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const dotRef = ref<HTMLElement | null>(null)
const ringRef = ref<HTMLElement | null>(null)

let mouseX = -100
let mouseY = -100
let ringX = -100
let ringY = -100
let scale = 1
let rafId = 0
let visible = false

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
  if (!visible && dotRef.value) {
    dotRef.value.style.opacity = '1'
    ringRef.value!.style.opacity = '1'
    visible = true
  }
  const target = e.target as HTMLElement
  scale = target.closest('a, button, [role="button"], .magnetic, .interactive') ? 2 : 1
}

function onMouseLeave() {
  if (dotRef.value) {
    dotRef.value.style.opacity = '0'
    ringRef.value!.style.opacity = '0'
    visible = false
  }
}

function animate() {
  ringX += (mouseX - ringX) * 0.12
  ringY += (mouseY - ringY) * 0.12

  if (dotRef.value) {
    dotRef.value.style.transform = `translate(${mouseX}px, ${mouseY}px)`
  }
  if (ringRef.value) {
    ringRef.value.style.transform = `translate(${ringX}px, ${ringY}px) scale(${scale})`
  }

  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.classList.add('has-custom-cursor')
    rafId = requestAnimationFrame(animate)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
  document.documentElement.classList.remove('has-custom-cursor')
  cancelAnimationFrame(rafId)
})
</script>

<style>
/* Global — unscoped so it overrides everything */
.has-custom-cursor,
.has-custom-cursor * {
  cursor: none !important;
}

.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99999;
  will-change: transform;
  opacity: 0;
  transition: opacity 0.3s;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  margin-left: -4px;
  margin-top: -4px;
  border-radius: 50%;
  background: var(--color-accent);
  mix-blend-mode: difference;
}

.cursor-ring {
  width: 40px;
  height: 40px;
  margin-left: -20px;
  margin-top: -20px;
  border-radius: 50%;
  border: 1.5px solid var(--color-accent);
  opacity: 0;
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              opacity 0.3s;
}
</style>
