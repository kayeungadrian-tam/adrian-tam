<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import * as THREE from 'three'
import { expandedWorld, zones } from '../config/expandedWorld'

const props = defineProps<{ scene: THREE.Scene | null; theme: 'dark' | 'light' }>()

const worldBounds = expandedWorld.worldBounds
const worldWidth = worldBounds.max.x - worldBounds.min.x
const worldDepth = worldBounds.max.z - worldBounds.min.z

let group: THREE.Group | null = null
let particles: THREE.Points | null = null
let particlesGeometry: THREE.BufferGeometry | null = null
let particlesMaterial: THREE.PointsMaterial | null = null
let particleVelocities: Float32Array | null = null
let mistTexture: THREE.CanvasTexture | null = null
let mistMaterial: THREE.MeshBasicMaterial | null = null
let mistMeshes: THREE.Mesh[] = []
let animationId: number | null = null

const zoneInfluences = zones
  .filter((z) => z.id !== 'hub')
  .map((z) => ({ x: z.center.x, z: z.center.z, color: new THREE.Color(z.color) }))
const ZONE_INFLUENCE_RADIUS = 35
const ZONE_INFLUENCE_RADIUS_SQ = ZONE_INFLUENCE_RADIUS * ZONE_INFLUENCE_RADIUS

const getBaseParticleColor = (theme: 'dark' | 'light') =>
  theme === 'dark' ? new THREE.Color('#9fb6ff') : new THREE.Color('#a88b6d')

const getMistColor = (theme: 'dark' | 'light') =>
  theme === 'dark' ? new THREE.Color('#1b203a') : new THREE.Color('#f2e7d4')

const getMistOpacity = (theme: 'dark' | 'light') =>
  theme === 'dark' ? 0.12 : 0.08

const _tintTemp = new THREE.Color()

const getZoneTintedColor = (px: number, pz: number, baseColor: THREE.Color): THREE.Color => {
  _tintTemp.copy(baseColor)

  for (const zone of zoneInfluences) {
    const dx = px - zone.x
    const dz = pz - zone.z
    const distSq = dx * dx + dz * dz
    if (distSq < ZONE_INFLUENCE_RADIUS_SQ) {
      const dist = Math.sqrt(distSq)
      const weight = 1 - dist / ZONE_INFLUENCE_RADIUS
      const influence = weight * weight * 0.35
      _tintTemp.lerp(zone.color, influence)
    }
  }

  return _tintTemp
}

const createMistTexture = () => {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  ctx.clearRect(0, 0, size, size)
  const gradient = ctx.createRadialGradient(size * 0.5, size * 0.5, 20, size * 0.5, size * 0.5, size * 0.5)
  gradient.addColorStop(0, 'rgba(255,255,255,0.25)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 1200; i += 1) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = Math.random() * 2.2
    const a = 0.03 + Math.random() * 0.08
    ctx.fillStyle = `rgba(255,255,255,${a})`
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 3)
  return texture
}

const buildParticles = () => {
  const count = 500
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)
  const baseColor = getBaseParticleColor(props.theme)

  for (let i = 0; i < count; i += 1) {
    const x = worldBounds.min.x + Math.random() * worldWidth
    const y = 0.8 + Math.random() * 6.5
    const z = worldBounds.min.z + Math.random() * worldDepth

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    const tinted = getZoneTintedColor(x, z, baseColor)
    colors[i * 3] = tinted.r
    colors[i * 3 + 1] = tinted.g
    colors[i * 3 + 2] = tinted.b

    velocities[i * 3] = (Math.random() - 0.5) * 0.015
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015
  }

  particlesGeometry = new THREE.BufferGeometry()
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  particlesMaterial = new THREE.PointsMaterial({
    size: 0.35,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    vertexColors: true,
  })

  particleVelocities = velocities
  particles = new THREE.Points(particlesGeometry, particlesMaterial)
  particles.frustumCulled = false
  return particles
}

const buildMistPlanes = () => {
  mistTexture = createMistTexture()
  if (!mistTexture) return

  mistMaterial = new THREE.MeshBasicMaterial({
    map: mistTexture,
    color: getMistColor(props.theme),
    transparent: true,
    opacity: getMistOpacity(props.theme),
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const planeGeometry = new THREE.PlaneGeometry(worldWidth * 1.2, worldDepth * 1.2)
  const heights = [1.2, 2.4, 3.8]
  heights.forEach((height, index) => {
    const plane = new THREE.Mesh(planeGeometry, mistMaterial!)
    plane.rotation.x = -Math.PI / 2
    plane.position.set(
      (worldBounds.min.x + worldBounds.max.x) / 2,
      height,
      (worldBounds.min.z + worldBounds.max.z) / 2
    )
    plane.renderOrder = 1 + index
    mistMeshes.push(plane)
  })
}

const animate = () => {
  if (!particlesGeometry || !particleVelocities) return
  const positions = particlesGeometry.getAttribute('position') as THREE.BufferAttribute

  for (let i = 0; i < positions.count; i += 1) {
    const x = positions.getX(i) + particleVelocities[i * 3]
    const y = positions.getY(i) + particleVelocities[i * 3 + 1]
    const z = positions.getZ(i) + particleVelocities[i * 3 + 2]

    let nextX = x
    let nextZ = z
    if (x < worldBounds.min.x) nextX = worldBounds.max.x
    if (x > worldBounds.max.x) nextX = worldBounds.min.x
    if (z < worldBounds.min.z) nextZ = worldBounds.max.z
    if (z > worldBounds.max.z) nextZ = worldBounds.min.z

    positions.setXYZ(i, nextX, y, nextZ)
  }
  positions.needsUpdate = true

  if (mistTexture) {
    mistTexture.offset.x += 0.0002
    mistTexture.offset.y += 0.00012
  }

  animationId = requestAnimationFrame(animate)
}

const updateParticleColors = () => {
  if (!particlesGeometry) return
  const positions = particlesGeometry.getAttribute('position') as THREE.BufferAttribute
  const colorAttr = particlesGeometry.getAttribute('color') as THREE.BufferAttribute
  const baseColor = getBaseParticleColor(props.theme)

  for (let i = 0; i < positions.count; i += 1) {
    const x = positions.getX(i)
    const z = positions.getZ(i)
    const tinted = getZoneTintedColor(x, z, baseColor)
    colorAttr.setXYZ(i, tinted.r, tinted.g, tinted.b)
  }
  colorAttr.needsUpdate = true
}

onMounted(() => {
  if (!props.scene) return
  group = new THREE.Group()

  const particleField = buildParticles()
  if (particleField) {
    group.add(particleField)
  }

  buildMistPlanes()
  mistMeshes.forEach((mesh) => group?.add(mesh))

  props.scene.add(group)
  animate()
})

watch(
  () => props.theme,
  (theme) => {
    updateParticleColors()
    if (mistMaterial) {
      mistMaterial.color.copy(getMistColor(theme))
      mistMaterial.opacity = getMistOpacity(theme)
      mistMaterial.needsUpdate = true
    }
  }
)

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (group && props.scene) {
    props.scene.remove(group)
  }
  if (particlesGeometry) particlesGeometry.dispose()
  if (particlesMaterial) particlesMaterial.dispose()
  if (mistMaterial) mistMaterial.dispose()
  if (mistTexture) mistTexture.dispose()
  mistMeshes.forEach((mesh) => mesh.geometry.dispose())
  mistMeshes = []
  group = null
  particles = null
  particlesGeometry = null
  particlesMaterial = null
  particleVelocities = null
  mistTexture = null
  mistMaterial = null
})
</script>

<template>
  <!-- Atmosphere is rendered via Three.js -->
</template>
