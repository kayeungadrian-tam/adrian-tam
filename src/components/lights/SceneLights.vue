<!-- SceneLights.vue - World-scale lighting with zone-specific colored lights -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import * as THREE from 'three'
import { zones } from '../../config/expandedWorld'

const props = defineProps<{
  scene: THREE.Scene | null
  theme: 'dark' | 'light'
  playerPosition?: THREE.Vector3 | null
}>()

let lights: THREE.Light[] = []
let ambientLight: THREE.AmbientLight | null = null
let hemiLight: THREE.HemisphereLight | null = null
let keyLight: THREE.DirectionalLight | null = null
let fillLight: THREE.DirectionalLight | null = null

// Zone-specific colored point lights
interface ZoneLight {
  light: THREE.PointLight
  center: THREE.Vector3
  activationRadius: number
}
let zoneLights: ZoneLight[] = []

const applyTheme = (value: 'dark' | 'light') => {
  if (!ambientLight || !hemiLight || !keyLight || !fillLight) return

  if (value === 'dark') {
    ambientLight.color.set(0x4a3a6e)
    ambientLight.intensity = 0.35
    hemiLight.color.set(0x3a3a6b)
    hemiLight.groundColor.set(0x0a0a1a)
    hemiLight.intensity = 0.5
    keyLight.color.set(0x8877bb)
    keyLight.intensity = 0.6
    fillLight.color.set(0x5544aa)
    fillLight.intensity = 0.3
  } else {
    ambientLight.color.set(0xcccccc)
    ambientLight.intensity = 0.7
    hemiLight.color.set(0xfff8f0)
    hemiLight.groundColor.set(0xe8f0ff)
    hemiLight.intensity = 1.0
    keyLight.color.set(0xcccccc)
    keyLight.intensity = 0.8
    fillLight.color.set(0xbdd5ff)
    fillLight.intensity = 0.6
  }

  for (const zl of zoneLights) {
    zl.light.intensity = value === 'dark' ? 0.15 : 0.08
  }
}

const updateZoneLights = (playerPos: THREE.Vector3 | null | undefined) => {
  if (!playerPos) return
  for (const zl of zoneLights) {
    const dist = playerPos.distanceTo(zl.center)
    const inZone = dist < zl.activationRadius
    const target = inZone ? 2.0 : 0.15
    zl.light.intensity += (target - zl.light.intensity) * 0.08
  }
}

onMounted(() => {
  if (!props.scene) return

  ambientLight = new THREE.AmbientLight(0xcccccc, 0.7)
  hemiLight = new THREE.HemisphereLight(0xfff8f0, 0xe8f0ff, 1.0)
  hemiLight.position.set(0, 20, 0)

  keyLight = new THREE.DirectionalLight(0xcccccc, 0.8)
  keyLight.position.set(40, 80, 40)
  keyLight.castShadow = true
  keyLight.shadow.mapSize.width = 1024
  keyLight.shadow.mapSize.height = 1024

  fillLight = new THREE.DirectionalLight(0xbdd5ff, 0.6)
  fillLight.position.set(-40, 50, -20)

  lights = [ambientLight, hemiLight, keyLight, fillLight]
  lights.forEach((light) => props.scene?.add(light))

  // Zone-specific colored point lights
  for (const zone of zones) {
    const lightPos = new THREE.Vector3(zone.center.x, 6, zone.center.z)
    const radius = zone.id === 'hub' ? 20 : Math.max(zone.size.width, zone.size.depth) * 0.75
    const pl = new THREE.PointLight(new THREE.Color(zone.color).getHex(), 0.15, 80, 1.5)
    pl.position.copy(lightPos)
    props.scene.add(pl)
    zoneLights.push({
      light: pl,
      center: lightPos,
      activationRadius: radius,
    })
  }

  applyTheme(props.theme)
})

onBeforeUnmount(() => {
  if (!props.scene) return
  lights.forEach((light) => props.scene?.remove(light))
  lights = []
  for (const zl of zoneLights) {
    props.scene.remove(zl.light)
    zl.light.dispose()
  }
  zoneLights = []
})

watch(() => props.theme, (value) => { applyTheme(value) })
watch(() => props.playerPosition, (pos) => { updateZoneLights(pos) })
</script>

<template></template>
