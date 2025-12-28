<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const container = ref<HTMLDivElement | null>(null)
let renderer: THREE.WebGLRenderer | null = null
let animationId = 0
let resizeHandler: (() => void) | null = null

onMounted(() => {
  if (!container.value) {
    return
  }

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0c0f1a)

  const camera = new THREE.PerspectiveCamera(
    60,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0.8, 2.2)

  const nextRenderer = new THREE.WebGLRenderer({ antialias: true })
  nextRenderer.setSize(container.value.clientWidth, container.value.clientHeight)
  nextRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(nextRenderer.domElement)
  renderer = nextRenderer

  const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)
  const material = new THREE.MeshStandardMaterial({
    color: 0x4ad3d8,
    metalness: 0.2,
    roughness: 0.2,
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  const keyLight = new THREE.DirectionalLight(0xffffff, 1)
  keyLight.position.set(2, 2, 2)
  scene.add(keyLight)

  const fillLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(fillLight)

  const animate = () => {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.012
    nextRenderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }

  animate()

  resizeHandler = () => {
    if (!container.value || !renderer) {
      return
    }
    const width = container.value.clientWidth
    const height = container.value.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer && container.value) {
    container.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
})
</script>

<template>
  <section class="three-wrapper">
    <div class="three-panel">
      <div class="three-header">
        <h1>Three.js Playground</h1>
        <p>Use this tab to test ideas before wiring them into the main site.</p>
      </div>
      <div
        ref="container"
        class="three-canvas"
      ></div>
    </div>
  </section>
</template>

<style scoped>
.three-wrapper {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
}

.three-panel {
  width: min(1100px, 100%);
  background: rgba(15, 18, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 20px 60px rgba(7, 9, 24, 0.45);
  backdrop-filter: blur(6px);
}

.three-header h1 {
  margin: 0 0 8px;
  font-size: 32px;
  letter-spacing: 0.5px;
  color: #f4f7ff;
}

.three-header p {
  margin: 0 0 20px;
  color: #b7c3ff;
}

.three-canvas {
  height: 520px;
  border-radius: 18px;
  overflow: hidden;
}

@media (max-width: 720px) {
  .three-panel {
    padding: 20px;
  }

  .three-canvas {
    height: 360px;
  }
}
</style>
