<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { zones } from '../config/expandedWorld'

interface Props {
  scene: THREE.Scene
  theme: 'dark' | 'light'
}

const props = defineProps<Props>()

let floorMeshes: THREE.Mesh[] = []

/**
 * Create floor for a zone
 */
function createZoneFloor(zone: typeof zones[0]): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(zone.size.width, zone.size.depth)

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(zone.color).multiplyScalar(0.3),
    roughness: 0.8,
    metalness: 0.2,
  })

  const floor = new THREE.Mesh(geometry, material)
  floor.rotation.x = -Math.PI / 2
  floor.position.copy(zone.center)
  floor.receiveShadow = true
  floor.userData.zoneId = zone.id

  return floor
}

/**
 * Create grid overlay for zone
 */
function createGridOverlay(zone: typeof zones[0]): THREE.LineSegments {
  const size = Math.max(zone.size.width, zone.size.depth)
  const divisions = Math.floor(size / 2)

  const gridHelper = new THREE.GridHelper(size, divisions, zone.color, zone.color)
  gridHelper.position.copy(zone.center)
  gridHelper.position.y = 0.01 // Slightly above floor
  gridHelper.material.opacity = 0.2
  gridHelper.material.transparent = true

  return gridHelper
}

onMounted(() => {
  if (!props.scene) return

  // Create floors for all zones
  zones.forEach((zone) => {
    // Floor mesh
    const floor = createZoneFloor(zone)
    props.scene.add(floor)
    floorMeshes.push(floor)

    // Grid overlay
    const grid = createGridOverlay(zone)
    props.scene.add(grid)
    floorMeshes.push(grid as any)
  })
})

onBeforeUnmount(() => {
  // Cleanup
  floorMeshes.forEach((mesh) => {
    props.scene.remove(mesh)
    mesh.geometry.dispose()
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(m => m.dispose())
      } else {
        mesh.material.dispose()
      }
    }
  })
  floorMeshes = []
})
</script>

<template>
  <!-- Zone floors are purely visual, rendered via Three.js -->
</template>
