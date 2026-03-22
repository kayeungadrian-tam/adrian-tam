<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import * as THREE from 'three'
import { expandedWorld, zones } from '../config/expandedWorld'

const props = defineProps<{ scene: THREE.Scene | null; theme: 'dark' | 'light' }>()

const worldBounds = expandedWorld.worldBounds
const worldWidth = worldBounds.max.x - worldBounds.min.x
const worldDepth = worldBounds.max.z - worldBounds.min.z

let group: THREE.Group | null = null
let monoliths: THREE.InstancedMesh | null = null
let monolithMaterial: THREE.MeshStandardMaterial | null = null
let beaconMaterial: THREE.MeshStandardMaterial | null = null
let beaconMeshes: THREE.Mesh[] = []
let beaconLights: THREE.PointLight[] = []
let animationId: number | null = null

const getMonolithColor = (theme: 'dark' | 'light') =>
  theme === 'dark' ? new THREE.Color('#1b1f3a') : new THREE.Color('#c9b8a4')

const getBeaconColor = (theme: 'dark' | 'light') =>
  theme === 'dark' ? new THREE.Color('#6ee7ff') : new THREE.Color('#ffb86b')

const buildMonoliths = () => {
  const count = 20
  const geometry = new THREE.BoxGeometry(2.2, 12, 2.2)
  monolithMaterial = new THREE.MeshStandardMaterial({
    color: getMonolithColor(props.theme),
    roughness: 0.75,
    metalness: 0.2,
    emissive: new THREE.Color('#0b1020'),
    emissiveIntensity: 0.2,
  })
  const instanced = new THREE.InstancedMesh(geometry, monolithMaterial, count)

  const dummy = new THREE.Object3D()
  for (let i = 0; i < count; i += 1) {
    const edge = i % 4
    const offset = Math.random() * (edge % 2 === 0 ? worldDepth : worldWidth)
    const x = edge === 0 ? worldBounds.min.x + 6 : edge === 1 ? worldBounds.max.x - 6 : worldBounds.min.x + offset
    const z = edge === 2 ? worldBounds.min.z + 6 : edge === 3 ? worldBounds.max.z - 6 : worldBounds.min.z + offset
    const height = 6 + Math.random() * 18

    dummy.position.set(x, height / 2 - 0.2, z)
    dummy.scale.set(1, height / 12, 1)
    dummy.rotation.y = Math.random() * Math.PI
    dummy.updateMatrix()
    instanced.setMatrixAt(i, dummy.matrix)
  }
  instanced.instanceMatrix.needsUpdate = true
  monoliths = instanced
  return instanced
}

const buildBeacons = () => {
  const geometry = new THREE.CylinderGeometry(0.8, 1.2, 8, 18, 1, true)
  beaconMaterial = new THREE.MeshStandardMaterial({
    color: getBeaconColor(props.theme),
    emissive: getBeaconColor(props.theme),
    emissiveIntensity: 0.6,
    roughness: 0.3,
    metalness: 0.6,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
  })

  zones.forEach((zone) => {
    const beacon = new THREE.Mesh(geometry, beaconMaterial!)
    beacon.position.copy(zone.center)
    beacon.position.y = 4
    beacon.userData = { baseY: 4, phase: Math.random() * Math.PI * 2 }
    beaconMeshes.push(beacon)

    const lightColor = new THREE.Color(zone.color)
    const light = new THREE.PointLight(lightColor, props.theme === 'dark' ? 1.2 : 0.5, 25, 1.5)
    light.position.copy(zone.center)
    light.position.y = 5
    beaconLights.push(light)
  })
}

const animate = () => {
  const time = performance.now() * 0.001
  beaconMeshes.forEach((beacon) => {
    const baseY = beacon.userData.baseY ?? 4
    const phase = beacon.userData.phase ?? 0
    beacon.position.y = baseY + Math.sin(time * 0.8 + phase) * 0.4
    beacon.rotation.y += 0.002
  })

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (!props.scene) return
  group = new THREE.Group()
  const instanced = buildMonoliths()
  group.add(instanced)
  buildBeacons()
  beaconMeshes.forEach((mesh) => group?.add(mesh))
  beaconLights.forEach((light) => group?.add(light))

  props.scene.add(group)
  animate()
})

watch(
  () => props.theme,
  (theme) => {
    if (monolithMaterial) {
      monolithMaterial.color.copy(getMonolithColor(theme))
      monolithMaterial.needsUpdate = true
    }
    if (beaconMaterial) {
      const color = getBeaconColor(theme)
      beaconMaterial.color.copy(color)
      beaconMaterial.emissive.copy(color)
      beaconMaterial.needsUpdate = true
    }
    beaconLights.forEach((light) => {
      light.intensity = theme === 'dark' ? 1.2 : 0.5
    })
  }
)

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (group && props.scene) props.scene.remove(group)
  if (monoliths) monoliths.geometry.dispose()
  if (monolithMaterial) monolithMaterial.dispose()
  if (beaconMaterial) beaconMaterial.dispose()
  beaconMeshes.forEach((mesh) => mesh.geometry.dispose())
  beaconLights.forEach((light) => light.dispose())
  beaconMeshes = []
  beaconLights = []
  group = null
  monoliths = null
  monolithMaterial = null
  beaconMaterial = null
})
</script>

<template>
  <!-- World landmarks rendered via Three.js -->
</template>
