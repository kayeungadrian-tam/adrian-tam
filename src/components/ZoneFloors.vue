<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { zones } from '../config/expandedWorld'

interface Props {
  scene: THREE.Scene
  theme: 'dark' | 'light'
}

const props = defineProps<Props>()

let floorMeshes: THREE.Object3D[] = []

function createZoneFloor(zone: typeof zones[0]): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(zone.size.width, zone.size.depth)

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(zone.color).multiplyScalar(0.3),
    roughness: 0.8,
    metalness: 0.2,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  })

  const floor = new THREE.Mesh(geometry, material)
  floor.rotation.x = -Math.PI / 2
  floor.position.copy(zone.center)
  floor.receiveShadow = true
  floor.userData.zoneId = zone.id

  return floor
}

function createGridOverlay(zone: typeof zones[0]): THREE.GridHelper {
  const size = Math.max(zone.size.width, zone.size.depth)
  const divisions = Math.floor(size / 4)

  const gridHelper = new THREE.GridHelper(size, divisions, zone.color, zone.color)
  gridHelper.position.copy(zone.center)
  gridHelper.position.y = 0.02
  const gridMat = gridHelper.material as THREE.Material
  gridMat.opacity = 0.15
  gridMat.transparent = true

  return gridHelper
}

function createBoundaryRing(zone: typeof zones[0]): THREE.Line {
  const hw = zone.size.width / 2
  const hd = zone.size.depth / 2
  const points = [
    new THREE.Vector3(-hw, 0, -hd),
    new THREE.Vector3( hw, 0, -hd),
    new THREE.Vector3( hw, 0,  hd),
    new THREE.Vector3(-hw, 0,  hd),
    new THREE.Vector3(-hw, 0, -hd),
  ]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({
    color: new THREE.Color(zone.color),
    transparent: true,
    opacity: 0.5,
  })

  const ring = new THREE.Line(geometry, material)
  ring.position.copy(zone.center)
  ring.position.y = 0.05

  return ring
}

onMounted(() => {
  if (!props.scene) return

  zones.forEach((zone) => {
    // Floor mesh
    const floor = createZoneFloor(zone)
    props.scene.add(floor)
    floorMeshes.push(floor)

    // Grid overlay
    const grid = createGridOverlay(zone)
    props.scene.add(grid)
    floorMeshes.push(grid)

    // Boundary ring
    const ring = createBoundaryRing(zone)
    props.scene.add(ring)
    floorMeshes.push(ring)
  })
})

onBeforeUnmount(() => {
  floorMeshes.forEach((obj) => {
    props.scene.remove(obj)
    if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
      obj.geometry.dispose()
      if (Array.isArray(obj.material)) {
        obj.material.forEach(m => m.dispose())
      } else if (obj.material) {
        obj.material.dispose()
      }
    }
    if (obj instanceof THREE.GridHelper) {
      obj.dispose()
    }
  })
  floorMeshes = []
})
</script>

<template>
  <!-- Zone floors are purely visual, rendered via Three.js -->
</template>
