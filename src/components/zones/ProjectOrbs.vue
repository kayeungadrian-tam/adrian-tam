<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

interface Project {
  name: string
  description: string
  tech: string[]
  impact: string
  color: string
  metrics?: {
    label: string
    value: string
  }[]
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

const projects: Project[] = [
  {
    name: 'AI Content Generator',
    description: 'ML-powered content creation platform',
    tech: ['Python', 'GPT-4', 'FastAPI', 'React'],
    impact: 'Served 100K+ users with 95% satisfaction',
    color: '#ff6b6b',
    metrics: [
      { label: 'Generations', value: '100K+' },
      { label: 'Satisfaction', value: '95%' },
      { label: 'Response Time', value: '<2s' },
    ],
  },
  {
    name: 'Real-time Analytics',
    description: 'Distributed event processing system',
    tech: ['Node.js', 'Kafka', 'Redis', 'TimescaleDB'],
    impact: '50M events/day, <100ms latency',
    color: '#4ecdc4',
    metrics: [
      { label: 'Events/Day', value: '50M' },
      { label: 'Latency', value: '<100ms' },
      { label: 'Uptime', value: '99.9%' },
    ],
  },
  {
    name: 'E-commerce Optimizer',
    description: 'ML recommendation engine',
    tech: ['Python', 'TensorFlow', 'PostgreSQL'],
    impact: '35% increase in conversion rate',
    color: '#95e1d3',
    metrics: [
      { label: 'Conv. Increase', value: '+35%' },
      { label: 'Revenue Impact', value: '+$2M' },
      { label: 'Users', value: '500K' },
    ],
  },
  {
    name: 'Cloud Migration Tool',
    description: 'Automated AWS infrastructure deployment',
    tech: ['Python', 'AWS', 'Terraform', 'Docker'],
    impact: 'Reduced deployment time by 80%',
    color: '#f38181',
    metrics: [
      { label: 'Time Saved', value: '80%' },
      { label: 'Services', value: '50+' },
      { label: 'Deployments', value: '1K+' },
    ],
  },
  {
    name: 'API Gateway',
    description: 'High-performance microservices gateway',
    tech: ['Node.js', 'Redis', 'Kubernetes'],
    impact: 'Handles 10M+ requests/day',
    color: '#aa96da',
    metrics: [
      { label: 'Requests/Day', value: '10M+' },
      { label: 'Services', value: '30' },
      { label: 'Latency p99', value: '50ms' },
    ],
  },
]

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
    const radius = 2

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
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
