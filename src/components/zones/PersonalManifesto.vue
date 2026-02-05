<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { Text } from 'troika-three-text'

interface Props {
  scene: THREE.Scene
  zoneCenter: THREE.Vector3
  theme: 'dark' | 'light'
}

const props = defineProps<Props>()

let manifestoGroup: THREE.Group | null = null
let textMeshes: Text[] = []
let valuePillars: THREE.Group[] = []
let animationId: number | null = null

const manifesto = {
  title: 'MY PHILOSOPHY',
  statement: 'Build with purpose.\nCode with empathy.\nLearn relentlessly.',
  values: [
    { name: 'Excellence', description: 'Pursue mastery in craft', color: '#00ff88' },
    { name: 'Impact', description: 'Create meaningful change', color: '#00d4aa' },
    { name: 'Growth', description: 'Never stop learning', color: '#00a87c' },
    { name: 'Integrity', description: 'Do the right thing', color: '#008c66' },
  ],
}

/**
 * Create central manifesto display
 */
function createManifestoCenter(): THREE.Group {
  const group = new THREE.Group()
  group.position.copy(props.zoneCenter)

  // Central platform
  const platformGeometry = new THREE.CylinderGeometry(3, 3, 0.3, 32)
  const platformMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff88,
    metalness: 0.6,
    roughness: 0.3,
    emissive: 0x00ff88,
    emissiveIntensity: 0.2,
  })
  const platform = new THREE.Mesh(platformGeometry, platformMaterial)
  platform.position.y = 0.15
  platform.castShadow = true
  platform.receiveShadow = true
  group.add(platform)

  // Title text
  const titleMesh = new Text() as any
  titleMesh.text = manifesto.title
  titleMesh.fontSize = 0.5
  titleMesh.font = '/fonts/Roboto-Bold.ttf'
  titleMesh.color = 0x00ff88
  titleMesh.anchorX = 'center'
  titleMesh.anchorY = 'middle'
  titleMesh.position.y = 3
  titleMesh.textAlign = 'center'
  titleMesh.sync()
  textMeshes.push(titleMesh)
  group.add(titleMesh)

  // Manifesto statement
  const statementMesh = new Text() as any
  statementMesh.text = manifesto.statement
  statementMesh.fontSize = 0.3
  statementMesh.font = '/fonts/Roboto-Regular.ttf'
  statementMesh.color = 0xffffff
  statementMesh.anchorX = 'center'
  statementMesh.anchorY = 'middle'
  statementMesh.position.y = 2
  statementMesh.textAlign = 'center'
  statementMesh.maxWidth = 8
  statementMesh.sync()
  textMeshes.push(statementMesh)
  group.add(statementMesh)

  // Energy field (sphere)
  const fieldGeometry = new THREE.SphereGeometry(4, 32, 32)
  const fieldMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide,
    wireframe: true,
  })
  const field = new THREE.Mesh(fieldGeometry, fieldMaterial)
  field.position.y = 2
  group.add(field)
  group.userData.field = field

  return group
}

/**
 * Create value pillars around manifesto
 */
function createValuePillar(value: typeof manifesto.values[0], index: number): THREE.Group {
  const group = new THREE.Group()

  // Position in a circle around center
  const angle = (index / manifesto.values.length) * Math.PI * 2
  const radius = 8

  group.position.set(
    props.zoneCenter.x + Math.cos(angle) * radius,
    0,
    props.zoneCenter.z + Math.sin(angle) * radius
  )

  // Pillar base
  const baseGeometry = new THREE.CylinderGeometry(0.8, 1, 0.3, 6)
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(value.color),
    metalness: 0.5,
    roughness: 0.5,
  })
  const base = new THREE.Mesh(baseGeometry, baseMaterial)
  base.position.y = 0.15
  base.castShadow = true
  group.add(base)

  // Pillar column
  const columnGeometry = new THREE.CylinderGeometry(0.6, 0.6, 3, 6)
  const columnMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(value.color),
    metalness: 0.7,
    roughness: 0.3,
    emissive: new THREE.Color(value.color),
    emissiveIntensity: 0.3,
  })
  const column = new THREE.Mesh(columnGeometry, columnMaterial)
  column.position.y = 1.8
  column.castShadow = true
  group.add(column)

  // Pillar top
  const topGeometry = new THREE.CylinderGeometry(1, 0.6, 0.5, 6)
  const topMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(value.color),
    metalness: 0.8,
    roughness: 0.2,
  })
  const top = new THREE.Mesh(topGeometry, topMaterial)
  top.position.y = 3.55
  top.castShadow = true
  group.add(top)

  // Value name text
  const nameMesh = new Text() as any
  nameMesh.text = value.name.toUpperCase()
  nameMesh.fontSize = 0.3
  nameMesh.font = '/fonts/Roboto-Bold.ttf'
  nameMesh.color = value.color
  nameMesh.anchorX = 'center'
  nameMesh.anchorY = 'middle'
  nameMesh.position.y = 4.2
  nameMesh.textAlign = 'center'
  nameMesh.sync()
  textMeshes.push(nameMesh)
  group.add(nameMesh)

  // Description text
  const descMesh = new Text() as any
  descMesh.text = value.description
  descMesh.fontSize = 0.15
  descMesh.font = '/fonts/Roboto-Regular.ttf'
  descMesh.color = 0xcccccc
  descMesh.anchorX = 'center'
  descMesh.anchorY = 'middle'
  descMesh.position.y = 3.8
  descMesh.textAlign = 'center'
  descMesh.maxWidth = 3
  descMesh.sync()
  textMeshes.push(descMesh)
  group.add(descMesh)

  // Glow ring at base
  const ringGeometry = new THREE.TorusGeometry(1.2, 0.05, 8, 32)
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: value.color,
    transparent: true,
    opacity: 0.5,
  })
  const ring = new THREE.Mesh(ringGeometry, ringMaterial)
  ring.rotation.x = Math.PI / 2
  ring.position.y = 0.05
  group.add(ring)

  group.userData = {
    value,
    column,
    ring,
    angle,
  }

  return group
}

/**
 * Animate manifesto and pillars
 */
function animateManifesto() {
  const time = performance.now() * 0.001

  // Rotate manifesto text
  textMeshes.slice(0, 2).forEach((textMesh, i) => {
    textMesh.rotation.y = Math.sin(time * 0.5) * 0.1
  })

  // Pulse energy field
  if (manifestoGroup) {
    const field = manifestoGroup.userData.field
    if (field) {
      field.rotation.y += 0.005
      field.rotation.x += 0.002
      const scale = 1 + Math.sin(time * 0.8) * 0.05
      field.scale.set(scale, scale, scale)
      field.material.opacity = 0.1 + Math.sin(time * 2) * 0.05
    }
  }

  // Animate value pillars
  valuePillars.forEach((group) => {
    const { column, ring, angle } = group.userData

    // Pulse emission
    column.material.emissiveIntensity = 0.3 + Math.sin(time * 2 + angle) * 0.2

    // Rotate ring
    ring.rotation.z += 0.01
    ring.material.opacity = 0.5 + Math.sin(time * 3 + angle) * 0.2

    // Pillar texts rotate to face camera
    group.children.forEach((child) => {
      if (child instanceof Text) {
        child.rotation.y = Math.sin(time * 0.5) * 0.1
      }
    })
  })

  animationId = requestAnimationFrame(animateManifesto)
}

onMounted(() => {
  if (!props.scene) return

  // Create central manifesto
  manifestoGroup = createManifestoCenter()
  props.scene.add(manifestoGroup)

  // Create value pillars
  manifesto.values.forEach((value, index) => {
    const pillar = createValuePillar(value, index)
    props.scene.add(pillar)
    valuePillars.push(pillar)
  })

  // Start animation
  animateManifesto()
})

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  // Cleanup manifesto
  if (manifestoGroup) {
    props.scene.remove(manifestoGroup)
    manifestoGroup.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
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
    manifestoGroup = null
  }

  // Cleanup pillars
  valuePillars.forEach((group) => {
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
      if (obj instanceof Text) {
        (obj as any).dispose()
      }
    })
  })
  valuePillars = []

  textMeshes = []
})
</script>

<template>
  <!-- Personal manifesto is purely visual, rendered via Three.js -->
</template>
