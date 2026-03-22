<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import rawProjects from '../../data/projects'

interface Project {
  name: string
  description: string
  tech: string[]
  color: string
  link?: string
}

interface Props {
  scene: THREE.Scene
  zoneCenter: THREE.Vector3
  theme: 'dark' | 'light'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'projectClick', project: Project): void
}>()

const orbColors = [
  '#ff6b6b',
  '#4ecdc4',
  '#ffd93d',
  '#6c5ce7',
  '#a8e6cf',
  '#ff8a5c',
  '#3dc1d3',
  '#e77f67',
]

// Map real project data to the component's Project interface
const projects: Project[] = rawProjects.map((p, i) => ({
  name: p.description,
  description: p.overview,
  tech: p.tags,
  color: orbColors[i % orbColors.length],
  link: p.link,
}))

let projectOrbs: Map<string, THREE.Group> = new Map()
let animationId: number | null = null

/**
 * Create a project orb (floating sphere)
 */
function createProjectOrb(project: Project, index: number): THREE.Group {
  const group = new THREE.Group()

  // Position in a circular pattern
  const angle = (index / projects.length) * Math.PI * 2
  const radius = 12

  group.position.set(
    props.zoneCenter.x + Math.cos(angle) * radius,
    3 + index * 0.3,
    props.zoneCenter.z + Math.sin(angle) * radius
  )

  // Orb sphere
  const geometry = new THREE.SphereGeometry(1.2, 32, 32)
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(project.color),
    emissive: new THREE.Color(project.color),
    emissiveIntensity: 0.3,
    metalness: 0.5,
    roughness: 0.3,
    transparent: true,
    opacity: 0.8,
  })

  const orb = new THREE.Mesh(geometry, material)
  orb.castShadow = true
  group.add(orb)

  // Inner core
  const coreGeometry = new THREE.SphereGeometry(0.8, 16, 16)
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: project.color,
    transparent: true,
    opacity: 0.5,
  })
  const core = new THREE.Mesh(coreGeometry, coreMaterial)
  group.add(core)

  // Outer glow
  const glowGeometry = new THREE.SphereGeometry(1.5, 32, 32)
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: project.color,
    transparent: true,
    opacity: 0.2,
    side: THREE.BackSide,
  })
  const glow = new THREE.Mesh(glowGeometry, glowMaterial)
  group.add(glow)

  // Orbiting particles
  const particleCount = 20
  const particlesGeometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    const r = 2

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    color: project.color,
    size: 0.1,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  })

  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  group.add(particles)

  // Store references
  group.userData = {
    project,
    orb,
    core,
    glow,
    particles,
    baseY: group.position.y,
    angle: angle,
  }

  return group
}

/**
 * Animate all orbs
 */
function animateOrbs() {
  const time = performance.now() * 0.001

  projectOrbs.forEach((group) => {
    const { orb, core, glow, particles, baseY, angle } = group.userData

    // Rotate orb
    orb.rotation.y += 0.01
    core.rotation.y -= 0.015
    core.rotation.x += 0.005

    // Float up and down
    group.position.y = baseY + Math.sin(time * 0.5 + angle) * 0.5

    // Pulse glow
    const glowScale = 1 + Math.sin(time * 2 + angle) * 0.1
    glow.scale.set(glowScale, glowScale, glowScale)
    glow.material.opacity = 0.15 + Math.sin(time * 2 + angle) * 0.05

    // Rotate particles
    particles.rotation.y += 0.005
    particles.rotation.x += 0.003

    // Pulse emission
    orb.material.emissiveIntensity = 0.3 + Math.sin(time * 3 + angle) * 0.2
  })

  animationId = requestAnimationFrame(animateOrbs)
}

onMounted(() => {
  if (!props.scene) return

  // Create all project orbs
  projects.forEach((project, index) => {
    const orb = createProjectOrb(project, index)
    props.scene.add(orb)
    projectOrbs.set(project.name, orb)
  })

  // Start animation
  animateOrbs()
})

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  // Cleanup orbs
  projectOrbs.forEach((group) => {
    props.scene.remove(group)
    group.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        obj.geometry.dispose()
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose())
        } else {
          obj.material.dispose()
        }
      }
    })
  })
  projectOrbs.clear()
})
</script>

<template>
  <!-- Project orbs are purely visual, rendered via Three.js -->
</template>
