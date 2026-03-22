<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { Text } from 'troika-three-text'

interface Props {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera | null
  hubCenter: THREE.Vector3
  theme: 'dark' | 'light'
}

const props = defineProps<Props>()

let welcomeGroup: THREE.Group | null = null
let textMeshes: Text[] = []
let animationId: number | null = null

// Reusable vectors to avoid per-frame allocations
const _cameraWorldPos = new THREE.Vector3()
const _textWorldPos = new THREE.Vector3()
const _lookTarget = new THREE.Vector3()

/**
 * Create welcome pedestal in hub center
 */
function createWelcomePedestal(): THREE.Group {
  const group = new THREE.Group()
  group.position.copy(props.hubCenter)

  // Pedestal base (cylinder)
  const baseGeometry = new THREE.CylinderGeometry(2, 2.5, 0.5, 32)
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0xa78bfa, // Purple
    metalness: 0.7,
    roughness: 0.3,
  })
  const base = new THREE.Mesh(baseGeometry, baseMaterial)
  base.position.y = 0.25
  base.castShadow = true
  base.receiveShadow = true
  group.add(base)

  // Pedestal column
  const columnGeometry = new THREE.CylinderGeometry(1.5, 1.8, 2, 32)
  const columnMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    metalness: 0.6,
    roughness: 0.4,
  })
  const column = new THREE.Mesh(columnGeometry, columnMaterial)
  column.position.y = 1.5
  column.castShadow = true
  group.add(column)

  // Top platform
  const topGeometry = new THREE.CylinderGeometry(2, 1.5, 0.3, 32)
  const topMaterial = new THREE.MeshStandardMaterial({
    color: 0xa78bfa,
    metalness: 0.8,
    roughness: 0.2,
  })
  const top = new THREE.Mesh(topGeometry, topMaterial)
  top.position.y = 2.65
  top.castShadow = true
  group.add(top)

  // Holographic text above pedestal
  const textMesh = new Text() as any
  textMesh.text = 'WELCOME TO\nADRIAN\'S MIND'
  textMesh.fontSize = 0.4
  textMesh.font = '/fonts/Roboto-Bold.ttf'
  textMesh.color = 0xffffff
  textMesh.anchorX = 'center'
  textMesh.anchorY = 'middle'
  textMesh.position.y = 4
  textMesh.textAlign = 'center'
  textMesh.sync()
  textMeshes.push(textMesh)
  group.add(textMesh)

  // Subtitle text
  const subtitleMesh = new Text() as any
  subtitleMesh.text = 'Choose a path to explore'
  subtitleMesh.fontSize = 0.2
  subtitleMesh.font = '/fonts/Roboto-Regular.ttf'
  subtitleMesh.color = 0xcccccc
  subtitleMesh.anchorX = 'center'
  subtitleMesh.anchorY = 'middle'
  subtitleMesh.position.y = 3.2
  subtitleMesh.textAlign = 'center'
  subtitleMesh.sync()
  textMeshes.push(subtitleMesh)
  group.add(subtitleMesh)

  // Energy rings around pedestal
  for (let i = 0; i < 3; i++) {
    const ringGeometry = new THREE.TorusGeometry(2.5 + i * 0.5, 0.05, 8, 32)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.3 - i * 0.05,
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI / 2
    ring.position.y = 0.1 + i * 0.1
    group.add(ring)

    // Store for animation
    group.userData[`ring${i}`] = ring
  }

  // Particle system
  const particleCount = 100
  const particlesGeometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2
    const radius = 3 + Math.random() * 2
    const height = Math.random() * 5

    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = height
    positions[i * 3 + 2] = Math.sin(angle) * radius
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xa78bfa,
    size: 0.1,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  })

  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  group.add(particles)
  group.userData.particles = particles

  return group
}

/**
 * Animate welcome pedestal
 */
function animateWelcome() {
  if (!welcomeGroup) return

  const time = performance.now() * 0.001

  if (props.camera) {
    props.camera.getWorldPosition(_cameraWorldPos)

    textMeshes.forEach((textMesh) => {
      textMesh.getWorldPosition(_textWorldPos)
      // Keep Y from text position so text stays upright (Y-axis billboard only)
      _lookTarget.set(_cameraWorldPos.x, _textWorldPos.y, _cameraWorldPos.z)
      textMesh.lookAt(textMesh.parent!.worldToLocal(_lookTarget))
    })
  }

  // Animate rings
  for (let i = 0; i < 3; i++) {
    const ring = welcomeGroup.userData[`ring${i}`]
    if (ring) {
      ring.rotation.z += 0.005 * (i + 1)
      ring.position.y = 0.1 + i * 0.1 + Math.sin(time * 2 + i) * 0.05
    }
  }

  // Rotate particles
  const particles = welcomeGroup.userData.particles
  if (particles) {
    particles.rotation.y += 0.002
  }

  animationId = requestAnimationFrame(animateWelcome)
}

onMounted(() => {
  if (!props.scene) return

  // Create welcome pedestal
  welcomeGroup = createWelcomePedestal()
  props.scene.add(welcomeGroup)

  // Start animation
  animateWelcome()
})

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (welcomeGroup) {
    props.scene.remove(welcomeGroup)
    welcomeGroup.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        obj.geometry.dispose()
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose())
        } else {
          obj.material.dispose()
        }
      }
      if (obj instanceof Text) {
        (obj as any).dispose()
      }
    })
    welcomeGroup = null
  }

  textMeshes = []
})
</script>

<template>
  <!-- Hub welcome is purely visual, rendered via Three.js -->
</template>
