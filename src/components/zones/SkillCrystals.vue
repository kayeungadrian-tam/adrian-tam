<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

interface Skill {
  name: string
  level: number // 1-5
  years: number
  color: string
  category: string
  projects?: number
}

interface Props {
  scene: THREE.Scene
  zoneCenter: THREE.Vector3
  theme: 'dark' | 'light'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'skillHover', skill: Skill | null): void
}>()

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 5, years: 4, color: '#61dafb', category: 'Frontend', projects: 12 },
  { name: 'Vue', level: 5, years: 4, color: '#42b883', category: 'Frontend', projects: 8 },
  { name: 'TypeScript', level: 5, years: 4, color: '#3178c6', category: 'Frontend', projects: 15 },

  // Backend
  { name: 'Node.js', level: 5, years: 4, color: '#339933', category: 'Backend', projects: 20 },
  { name: 'Python', level: 5, years: 5, color: '#3776ab', category: 'Backend', projects: 25 },
  { name: 'FastAPI', level: 4, years: 2, color: '#009688', category: 'Backend', projects: 8 },

  // AI/ML
  { name: 'TensorFlow', level: 4, years: 3, color: '#ff6f00', category: 'AI/ML', projects: 6 },
  { name: 'PyTorch', level: 4, years: 3, color: '#ee4c2c', category: 'AI/ML', projects: 5 },
  { name: 'LangChain', level: 4, years: 1, color: '#1c3c3c', category: 'AI/ML', projects: 4 },

  // Cloud & DevOps
  { name: 'AWS', level: 4, years: 3, color: '#ff9900', category: 'Cloud', projects: 15 },
  { name: 'Docker', level: 4, years: 3, color: '#2496ed', category: 'DevOps', projects: 18 },
  { name: 'Kubernetes', level: 3, years: 2, color: '#326ce5', category: 'DevOps', projects: 6 },

  // Database
  { name: 'PostgreSQL', level: 4, years: 4, color: '#336791', category: 'Database', projects: 12 },
  { name: 'MongoDB', level: 4, years: 3, color: '#47a248', category: 'Database', projects: 10 },
  { name: 'Redis', level: 4, years: 3, color: '#dc382d', category: 'Database', projects: 8 },
]

let skillCrystals: Map<string, THREE.Group> = new Map()
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()
let animationId: number | null = null
let hoveredSkill: Skill | null = null

/**
 * Create a skill crystal (floating geometric shape)
 */
function createSkillCrystal(skill: Skill, index: number): THREE.Group {
  const group = new THREE.Group()

  // Position in a 3D spiral/grid pattern
  const angle = (index / skills.length) * Math.PI * 2
  const radius = 15
  const height = Math.sin(angle * 3) * 3

  group.position.set(
    props.zoneCenter.x + Math.cos(angle) * radius,
    2 + height + (skill.level * 0.5),
    props.zoneCenter.z + Math.sin(angle) * radius
  )

  // Crystal geometry based on skill level
  const size = 0.4 + (skill.level * 0.2)
  const geometry = new THREE.OctahedronGeometry(size, 0)

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(skill.color),
    emissive: new THREE.Color(skill.color),
    emissiveIntensity: 0.5,
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.9,
  })

  const crystal = new THREE.Mesh(geometry, material)
  crystal.castShadow = true
  group.add(crystal)

  // Wireframe overlay
  const wireframeGeometry = new THREE.EdgesGeometry(geometry)
  const wireframeMaterial = new THREE.LineBasicMaterial({
    color: skill.color,
    transparent: true,
    opacity: 0.5,
  })
  const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial)
  group.add(wireframe)

  // Glow ring
  const ringGeometry = new THREE.TorusGeometry(size * 1.5, 0.05, 8, 32)
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: skill.color,
    transparent: true,
    opacity: 0.4,
  })
  const ring = new THREE.Mesh(ringGeometry, ringMaterial)
  ring.rotation.x = Math.PI / 2
  group.add(ring)

  // Store references
  group.userData = {
    skill,
    crystal,
    wireframe,
    ring,
    baseY: group.position.y,
    rotationSpeed: 0.5 + Math.random() * 0.5,
  }

  return group
}

/**
 * Animate all crystals
 */
function animateCrystals() {
  const time = performance.now() * 0.001

  skillCrystals.forEach((group) => {
    const { crystal, ring, baseY, rotationSpeed, skill } = group.userData

    // Rotate crystal
    crystal.rotation.y += 0.01 * rotationSpeed
    crystal.rotation.x += 0.005 * rotationSpeed

    // Float up and down
    group.position.y = baseY + Math.sin(time + group.position.x) * 0.3

    // Rotate ring
    ring.rotation.z += 0.02

    // Pulse emission on hover
    if (hoveredSkill === skill) {
      crystal.material.emissiveIntensity = 1.0 + Math.sin(time * 5) * 0.3
      group.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1)
    } else {
      crystal.material.emissiveIntensity = 0.5
      group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  animationId = requestAnimationFrame(animateCrystals)
}

/**
 * Handle mouse interaction for hover effects
 */
function handleMouseMove(event: MouseEvent) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  // Update raycaster
  const camera = props.scene.children.find(child => child.type === 'PerspectiveCamera') as THREE.PerspectiveCamera
  if (!camera) return

  raycaster.setFromCamera(mouse, camera)

  // Check for intersections
  const crystalMeshes: THREE.Object3D[] = []
  skillCrystals.forEach(group => {
    const crystal = group.userData.crystal
    if (crystal) crystalMeshes.push(crystal)
  })

  const intersects = raycaster.intersectObjects(crystalMeshes)

  if (intersects.length > 0) {
    const intersectedCrystal = intersects[0].object
    const group = intersectedCrystal.parent as THREE.Group
    const skill = group.userData.skill as Skill

    if (hoveredSkill !== skill) {
      hoveredSkill = skill
      emit('skillHover', skill)
      document.body.style.cursor = 'pointer'
    }
  } else {
    if (hoveredSkill) {
      hoveredSkill = null
      emit('skillHover', null)
      document.body.style.cursor = 'default'
    }
  }
}

onMounted(() => {
  if (!props.scene) return

  // Create all skill crystals
  skills.forEach((skill, index) => {
    const crystal = createSkillCrystal(skill, index)
    props.scene.add(crystal)
    skillCrystals.set(skill.name, crystal)
  })

  // Start animation
  animateCrystals()

  // Add mouse listener
  window.addEventListener('mousemove', handleMouseMove)
})

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  window.removeEventListener('mousemove', handleMouseMove)

  // Cleanup crystals
  skillCrystals.forEach((group) => {
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
  skillCrystals.clear()

  document.body.style.cursor = 'default'
})
</script>

<template>
  <!-- Skill crystals are purely visual, rendered via Three.js -->
</template>
