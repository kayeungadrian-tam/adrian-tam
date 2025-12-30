<!-- SceneLights.vue - Add volumetric spotlight cone -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps<{ scene: THREE.Scene | null; theme: 'dark' | 'light' }>()

let lights: THREE.Light[] = []
let morningSunTarget: THREE.Object3D | null = null
let centerSpotTarget: THREE.Object3D | null = null
let ambientLight: THREE.AmbientLight | null = null
let hemiLight: THREE.HemisphereLight | null = null
let keyLight: THREE.DirectionalLight | null = null
let fillLight: THREE.DirectionalLight | null = null
let morningSun: THREE.SpotLight | null = null
let centerSpot: THREE.SpotLight | null = null
let accentLight: THREE.PointLight | null = null

// ADD THESE: Volumetric light cone mesh
const applyTheme = (value: 'dark' | 'light') => {
  if (!ambientLight || !hemiLight || !keyLight || !fillLight || !morningSun || !centerSpot || !accentLight) {
    return
  }
  if (value === 'dark') {
    ambientLight.color.set(0x2a3552)
    ambientLight.intensity = 0.35
    hemiLight.color.set(0x1b2b54)
    hemiLight.groundColor.set(0x0b0f1f)
    hemiLight.intensity = 0.6
    keyLight.color.set(0x9fb6ff)
    keyLight.intensity = 0.85
    fillLight.color.set(0x2a3f66)
    fillLight.intensity = 0.4
    morningSun.color.set(0xb3c9ff)
    morningSun.intensity = 1.6
    morningSun.distance = 28
    morningSun.angle = Math.PI / 8
    centerSpot.color.set(0xd6e4ff)
    centerSpot.intensity = 3.2
    centerSpot.angle = THREE.MathUtils.degToRad(60)
    centerSpot.distance = 10.5
    accentLight.color.set(0x3b6dd6)
    accentLight.intensity = 0.7

  } else {
    ambientLight.color.set(0xcccccc)
    ambientLight.intensity = 0.7
    hemiLight.color.set(0xfff8f0)
    hemiLight.groundColor.set(0xe8f0ff)
    hemiLight.intensity = 1.2
    keyLight.color.set(0xcccccc)
    keyLight.intensity = 0.8
    fillLight.color.set(0xbdd5ff)
    fillLight.intensity = 0.9
    morningSun.color.set(0xfff4e0)
    morningSun.intensity = 1.2
    morningSun.distance = 30
    morningSun.angle = Math.PI / 7
    centerSpot.color.set(0xe6ddbc)
    centerSpot.intensity = 8.5
    centerSpot.angle = THREE.MathUtils.degToRad(70)
    centerSpot.distance = 9
    accentLight.color.set(0xffa366)
    accentLight.intensity = 1.4

  }
}

onMounted(() => {
  if (!props.scene) {
    return
  }

  ambientLight = new THREE.AmbientLight(0xcccccc, 0.7)
  hemiLight = new THREE.HemisphereLight(0xfff8f0, 0xe8f0ff, 1.2)
  hemiLight.position.set(0, 2, 0)
  keyLight = new THREE.DirectionalLight(0xcccccc, 1.8)
  keyLight.position.set(2, 3, 2)
  fillLight = new THREE.DirectionalLight(0xbdd5ff, 0.9)
  fillLight.position.set(-2, 2, 1)
  morningSun = new THREE.SpotLight(0xfff4e0, 3.2, 30, Math.PI / 7, 0.3, 1.0)
  morningSun.position.set(4.6, 4.4, 6.2)
  morningSunTarget = morningSun.target
  morningSunTarget.position.set(0, 1.2, 0)
  centerSpot = new THREE.SpotLight(0xe6ddbc, 4.5, 9, THREE.MathUtils.degToRad(70), 0.21, 1.15)
  centerSpot.position.set(0, 3.8, 0)
  centerSpotTarget = centerSpot.target
  centerSpotTarget.position.set(0, 0.9, 0)
  centerSpot.castShadow = true
  centerSpot.shadow.mapSize.width = 1024
  centerSpot.shadow.mapSize.height = 1024
  centerSpot.shadow.bias = -0.00035
  accentLight = new THREE.PointLight(0xffa366, 1.4, 8)
  accentLight.position.set(-3, 2.2, -3)

  lights = [
    ambientLight,
    hemiLight,
    keyLight,
    fillLight,
    morningSun,
    centerSpot,
    accentLight,
  ]

  lights.forEach((light) => props.scene?.add(light))
  if (morningSunTarget) {
    props.scene.add(morningSunTarget)
  }
  if (centerSpotTarget) {
    props.scene.add(centerSpotTarget)
  }

  applyTheme(props.theme)
})

onBeforeUnmount(() => {
  if (!props.scene) {
    return
  }
  lights.forEach((light) => props.scene?.remove(light))
  lights = []
  if (morningSunTarget) {
    props.scene.remove(morningSunTarget)
    morningSunTarget = null
  }
  if (centerSpotTarget) {
    props.scene.remove(centerSpotTarget)
    centerSpotTarget = null
  }

})

watch(
  () => props.theme,
  (value) => {
    applyTheme(value)
  }
)
</script>

<template></template>
