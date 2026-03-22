<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

interface Skill {
  name: string
  level: number // 1-5
  years: number
  color: string
  category: string
}

interface Props {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera | null
  zoneCenter: THREE.Vector3
  theme: 'dark' | 'light'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'skillHover', skill: Skill | null): void
}>()

const skills: Skill[] = [
  // Primary Languages
  { name: 'Python', level: 5, years: 5, color: '#3776ab', category: 'Language' },
  { name: 'Vue/TypeScript', level: 5, years: 4, color: '#42b883', category: 'Frontend' },

  // AI/ML
  { name: 'TensorFlow', level: 4, years: 3, color: '#ff6f00', category: 'AI/ML' },
  { name: 'PyTorch', level: 4, years: 3, color: '#ee4c2c', category: 'AI/ML' },
  { name: 'OpenCV', level: 4, years: 3, color: '#5c3ee8', category: 'AI/ML' },

  // Backend & Cloud
  { name: 'FastAPI', level: 4, years: 2, color: '#009688', category: 'Backend' },
  { name: 'Node.js', level: 4, years: 4, color: '#339933', category: 'Backend' },
  { name: 'Docker', level: 4, years: 3, color: '#2496ed', category: 'DevOps' },
  { name: 'AWS', level: 4, years: 3, color: '#ff9900', category: 'Cloud' },

  // Creative
  { name: 'Three.js', level: 3, years: 2, color: '#00d4ff', category: 'Creative' },
]

let skillCrystals: Map<string, THREE.Group> = new Map()
let crystalMeshCache: THREE.Object3D[] = []
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()
let animationId: number | null = null
let hoveredSkill: Skill | null = null

const _hoverScale = new THREE.Vector3(1.3, 1.3, 1.3)
const _defaultScale = new THREE.Vector3(1, 1, 1)

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
      group.scale.lerp(_hoverScale, 0.1)
    } else {
      crystal.material.emissiveIntensity = 0.5
      group.scale.lerp(_defaultScale, 0.1)
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

  // Use camera from props
  if (!props.camera) return

  raycaster.setFromCamera(mouse, props.camera)

  const intersects = raycaster.intersectObjects(crystalMeshCache)

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

  // Cache crystal meshes for raycasting
  crystalMeshCache = []
  skillCrystals.forEach(group => {
    const crystal = group.userData.crystal
    if (crystal) crystalMeshCache.push(crystal)
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
  crystalMeshCache = []

  document.body.style.cursor = 'default'
})
</script>

<template>
  <!-- Skill crystals are purely visual, rendered via Three.js -->
</template>
