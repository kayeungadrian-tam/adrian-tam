<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps<{
  container: HTMLDivElement | null
  introFrom: THREE.Vector3
  lookAt: THREE.Vector3
  fov?: number
  near?: number
  far?: number
}>()

const emit = defineEmits<{
  (event: 'ready', camera: THREE.PerspectiveCamera | null): void
}>()

let camera: THREE.PerspectiveCamera | null = null
let resizeHandler: (() => void) | null = null

const createCamera = () => {
  if (!props.container || camera) {
    return
  }
  camera = new THREE.PerspectiveCamera(
    props.fov ?? 55,
    props.container.clientWidth / props.container.clientHeight,
    props.near ?? 0.001,
    props.far ?? 5000
  )
  camera.position.copy(props.introFrom)
  camera.lookAt(props.lookAt)
  emit('ready', camera)

  resizeHandler = () => {
    if (!props.container || !camera) {
      return
    }
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', resizeHandler)
}

watch(
  () => props.container,
  () => {
    createCamera()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
  emit('ready', null)
  camera = null
})
</script>

<template></template>
