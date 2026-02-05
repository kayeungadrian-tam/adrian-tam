<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { portals, type Portal } from '../config/expandedWorld'

interface Props {
  scene: THREE.Scene
  theme: 'dark' | 'light'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'portalEnter', portal: Portal): void
}>()

let portalMeshes: Map<string, THREE.Group> = new Map()
let animationId: number | null = null

/**
 * Creates a glowing portal with particle effects
 */
function createPortalVisual(portal: Portal): THREE.Group {
  const group = new THREE.Group()
  group.position.copy(portal.position)
  group.rotation.y = portal.rotation

  // Portal ring (glowing torus)
  const ringGeometry = new THREE.TorusGeometry(portal.radius, 0.2, 16, 32)
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(portal.color),
    emissive: new THREE.Color(portal.color),
    emissiveIntensity: 2.0,
    metalness: 0.8,
    roughness: 0.2,
  })
  const ring = new THREE.Mesh(ringGeometry, ringMaterial)
  ring.rotation.x = Math.PI / 2
  group.add(ring)

  // Portal surface (shimmering disc)
  const discGeometry = new THREE.CircleGeometry(portal.radius * 0.9, 32)
  const discMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(portal.color),
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  })
  const disc = new THREE.Mesh(discGeometry, discMaterial)
  disc.rotation.x = Math.PI / 2
  group.add(disc)

  // Particle system around portal
  const particleCount = 50
  const particlesGeometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2
    const radius = portal.radius + Math.random() * 0.5
    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2
    positions[i * 3 + 2] = Math.sin(angle) * radius
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(portal.color),
    size: 0.15,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  })

  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  particles.rotation.x = Math.PI / 2
  group.add(particles)

  // Store references for animation
  group.userData = {
    ring,
    disc,
    particles,
    portal,
  }

  return group
}

/**
 * Animates portal effects
 */
function animatePortals() {
  const time = performance.now() * 0.001

  portalMeshes.forEach((group) => {
    const { ring, disc, particles } = group.userData

    // Pulse ring emission
    if (ring && ring.material) {
      ring.material.emissiveIntensity = 1.5 + Math.sin(time * 2) * 0.5
    }

    // Shimmer disc
    if (disc && disc.material) {
      disc.material.opacity = 0.3 + Math.sin(time * 3) * 0.1
    }

    // Rotate particles
    if (particles) {
      particles.rotation.z += 0.01
    }
  })

  animationId = requestAnimationFrame(animatePortals)
}

/**
 * Updates portal theme
 */
function updatePortalTheme(theme: 'dark' | 'light') {
  const intensityMultiplier = theme === 'dark' ? 1.0 : 0.6

  portalMeshes.forEach((group) => {
    const { ring } = group.userData
    if (ring && ring.material) {
      ring.material.emissiveIntensity *= intensityMultiplier
    }
  })
}

onMounted(() => {
  if (!props.scene) return

  // Create all portals
  portals.forEach((portal) => {
    const portalGroup = createPortalVisual(portal)
    props.scene.add(portalGroup)
    portalMeshes.set(portal.id, portalGroup)
  })

  // Start animation
  animatePortals()
})

watch(() => props.theme, (newTheme) => {
  updatePortalTheme(newTheme)
})

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  // Cleanup portals
  portalMeshes.forEach((group) => {
    props.scene.remove(group)
    group.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose()
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose())
        } else {
          obj.material.dispose()
        }
      }
    })
  })
  portalMeshes.clear()
})

/**
 * Check if player is near a portal
 */
export function checkPortalProximity(playerPosition: THREE.Vector3): Portal | null {
  for (const [id, group] of portalMeshes) {
    const portal = group.userData.portal as Portal
    const distance = playerPosition.distanceTo(portal.position)

    if (distance < portal.radius * 1.5) {
      return portal
    }
  }
  return null
}

// Expose check function
defineExpose({
  checkPortalProximity,
})
</script>

<template>
  <!-- Portal system is purely visual, rendered via Three.js -->
</template>
