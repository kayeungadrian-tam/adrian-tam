<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import * as THREE from 'three'

const props = defineProps<{ scene: THREE.Scene | null }>()

let lights: THREE.Light[] = []
let morningSunTarget: THREE.Object3D | null = null
let centerSpotTarget: THREE.Object3D | null = null

onMounted(() => {
  if (!props.scene) {
    return
  }

  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.7)
  const hemiLight = new THREE.HemisphereLight(0xfff8f0, 0xe8f0ff, 1.2)
  hemiLight.position.set(0, 2, 0)
  const keyLight = new THREE.DirectionalLight(0xcccccc, 1.8)
  keyLight.position.set(2, 3, 2)
  const fillLight = new THREE.DirectionalLight(0xbdd5ff, 0.9)
  fillLight.position.set(-2, 2, 1)
  const morningSun = new THREE.SpotLight(0xfff4e0, 3.2, 30, Math.PI / 7, 0.3, 1.0)
  morningSun.position.set(4.6, 4.4, 6.2)
  morningSunTarget = morningSun.target
  morningSunTarget.position.set(0, 1.2, 0)
  const centerSpot = new THREE.SpotLight(0xe6ddbc, 4.5, 9, THREE.MathUtils.degToRad(70), 0.21, 1.15)
  centerSpot.position.set(0, 3.8, 0)
  centerSpotTarget = centerSpot.target
  centerSpotTarget.position.set(0, 0.9, 0)
  centerSpot.castShadow = true
  centerSpot.shadow.mapSize.width = 1024
  centerSpot.shadow.mapSize.height = 1024
  centerSpot.shadow.bias = -0.00035
  const accentLight = new THREE.PointLight(0xffa366, 1.4, 8)
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
</script>

<template></template>
