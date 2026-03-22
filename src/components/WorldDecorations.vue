<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import * as THREE from 'three'
import { neuralPathways, portals, zones, type Zone } from '../config/expandedWorld'

const props = defineProps<{ scene: THREE.Scene | null; theme: 'dark' | 'light' }>()

let rootGroup: THREE.Group | null = null
let animationId: number | null = null

const glowMaterials: THREE.MeshStandardMaterial[] = []
const ornamentGroups: THREE.Group[] = []
const lanternOrbs: THREE.Mesh[] = []

const rand = (seed: number) => {
  const x = Math.sin(seed * 128.21) * 43758.5453
  return x - Math.floor(x)
}

const isNearPortal = (position: THREE.Vector3, zoneId: string) => {
  return portals.some((portal) => {
    const inZone = portal.fromZone === zoneId || portal.toZone === zoneId
    return inZone && position.distanceTo(portal.position) < 6.2
  })
}

const createLantern = (position: THREE.Vector3, color: string) => {
  const group = new THREE.Group()
  group.position.copy(position)

  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 1.9, 8),
    new THREE.MeshStandardMaterial({
      color: props.theme === 'dark' ? 0x252f45 : 0x705a3c,
      roughness: 0.65,
      metalness: 0.3,
    })
  )
  post.position.y = 0.95
  post.castShadow = true
  post.receiveShadow = true
  group.add(post)

  const orbBaseEmissive = props.theme === 'dark' ? 2.0 : 0.9
  const orbMaterial = new THREE.MeshStandardMaterial({
    color,
    emissive: new THREE.Color(color),
    emissiveIntensity: orbBaseEmissive,
    roughness: 0.2,
    metalness: 0.5,
    transparent: true,
    opacity: 0.95,
  })
  orbMaterial.userData.baseEmissiveIntensity = orbBaseEmissive
  glowMaterials.push(orbMaterial)

  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 14), orbMaterial)
  orb.position.y = 1.95
  orb.userData.phase = Math.random() * Math.PI * 2
  lanternOrbs.push(orb)
  group.add(orb)

  const cap = new THREE.Mesh(
    new THREE.ConeGeometry(0.24, 0.36, 8),
    new THREE.MeshStandardMaterial({
      color: props.theme === 'dark' ? 0xaec2ff : 0xa48150,
      roughness: 0.35,
      metalness: 0.65,
    })
  )
  cap.position.y = 2.2
  cap.castShadow = true
  group.add(cap)

  return group
}

const createCrystalGarden = (zone: Zone, index: number) => {
  const group = new THREE.Group()
  const accent = zone.color
  const baseColor = props.theme === 'dark' ? '#1f2637' : '#d9cdb6'

  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(0.65, 0.85, 0.24, 10),
    new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness: 0.8,
      metalness: 0.1,
    })
  )
  plinth.position.y = 0.12
  plinth.receiveShadow = true
  group.add(plinth)

  for (let i = 0; i < 3; i += 1) {
    const shardBaseEmissive = props.theme === 'dark' ? 0.6 : 0.16
    const shardMaterial = new THREE.MeshStandardMaterial({
      color: accent,
      emissive: new THREE.Color(accent),
      emissiveIntensity: shardBaseEmissive,
      roughness: 0.3,
      metalness: 0.75,
    })
    shardMaterial.userData.baseEmissiveIntensity = shardBaseEmissive
    glowMaterials.push(shardMaterial)

    const shardRadius = 0.28 + i * 0.07
    const shardHeight = 1.1 + i * 0.35
    const shard = new THREE.Mesh(new THREE.ConeGeometry(shardRadius, shardHeight, 6), shardMaterial)
    shard.position.set((i - 1) * 0.3, 0.7 + i * 0.22, (i % 2 === 0 ? 1 : -1) * 0.18)
    shard.rotation.y = (Math.PI / 3) * i
    shard.castShadow = true
    group.add(shard)
  }

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.95, 0.05, 8, 36),
    new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: props.theme === 'dark' ? 0.55 : 0.3,
    })
  )
  ring.rotation.x = Math.PI / 2
  ring.position.y = 0.08
  group.add(ring)

  group.userData.phase = index * 0.43
  group.userData.ring = ring
  ornamentGroups.push(group)
  return group
}

const createZoneDecor = (zone: Zone, zoneIndex: number) => {
  if (!rootGroup) return

  const decorations = zone.id === 'hub' ? 8 : 12
  const marginX = zone.size.width * 0.42
  const marginZ = zone.size.depth * 0.42

  for (let i = 0; i < decorations; i += 1) {
    const seed = (zoneIndex + 1) * 100 + i
    const side = Math.floor(rand(seed) * 4)
    const xSign = side === 0 ? -1 : side === 1 ? 1 : rand(seed + 2) > 0.5 ? 1 : -1
    const zSign = side === 2 ? -1 : side === 3 ? 1 : rand(seed + 3) > 0.5 ? 1 : -1

    const xOffset = xSign * (marginX + rand(seed + 4) * (zone.size.width * 0.1))
    const zOffset = zSign * (marginZ + rand(seed + 5) * (zone.size.depth * 0.1))
    const position = new THREE.Vector3(zone.center.x + xOffset, 0, zone.center.z + zOffset)

    if (isNearPortal(position, zone.id)) {
      continue
    }

    const cluster = createCrystalGarden(zone, seed)
    cluster.position.copy(position)
    cluster.rotation.y = rand(seed + 6) * Math.PI * 2
    rootGroup.add(cluster)
  }
}

const createPathLanterns = () => {
  if (!rootGroup) return
  const group = rootGroup
  neuralPathways.forEach((path, pathIndex) => {
    const color = new THREE.Color(path.color).lerp(new THREE.Color('#ffffff'), 0.15).getStyle()
    for (let i = 1; i <= 4; i += 1) {
      const t = i / 5
      const position = path.from.clone().lerp(path.to, t)
      const lateral = path.to
        .clone()
        .sub(path.from)
        .cross(new THREE.Vector3(0, 1, 0))
        .normalize()
        .multiplyScalar((i % 2 === 0 ? 1 : -1) * 0.8)

      const lantern = createLantern(position.add(lateral), color)
      lantern.userData.phase = pathIndex * 0.4 + i * 0.7
      group.add(lantern)
    }
  })
}

const applyTheme = (theme: 'dark' | 'light') => {
  const scalar = theme === 'dark' ? 1.0 : 0.45
  glowMaterials.forEach((material) => {
    const base = (material.userData.baseEmissiveIntensity as number | undefined) ?? 0.4
    material.emissiveIntensity = base * scalar
    material.needsUpdate = true
  })
}

const animateDecor = () => {
  const time = performance.now() * 0.001

  ornamentGroups.forEach((group) => {
    const ring = group.userData.ring as THREE.Mesh | undefined
    const phase = (group.userData.phase as number) ?? 0
    group.position.y = Math.sin(time * 0.9 + phase) * 0.05
    if (ring) {
      ring.rotation.z += 0.012
    }
  })

  lanternOrbs.forEach((orb, index) => {
    const material = orb.material as THREE.MeshStandardMaterial
    const phase = (orb.userData.phase as number) ?? index * 0.2
    material.emissiveIntensity =
      (props.theme === 'dark' ? 1.4 : 0.6) + (Math.sin(time * 2.4 + phase) + 1) * 0.4
  })

  animationId = requestAnimationFrame(animateDecor)
}

onMounted(() => {
  if (!props.scene) return
  rootGroup = new THREE.Group()

  zones.forEach((zone, index) => createZoneDecor(zone, index))
  createPathLanterns()

  props.scene.add(rootGroup)
  animateDecor()
})

watch(
  () => props.theme,
  (theme) => {
    applyTheme(theme)
  }
)

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (rootGroup && props.scene) {
    props.scene.remove(rootGroup)
    rootGroup.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose()
        const objectMaterial = object.material
        if (Array.isArray(objectMaterial)) {
          objectMaterial.forEach((material) => material.dispose())
        } else {
          objectMaterial.dispose()
        }
      }
    })
  }

  glowMaterials.length = 0
  ornamentGroups.length = 0
  lanternOrbs.length = 0
  rootGroup = null
  animationId = null
})
</script>

<template>
  <!-- World decorations are rendered directly in Three.js -->
</template>
