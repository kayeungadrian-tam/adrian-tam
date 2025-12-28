<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps<{
  scene: THREE.Scene | null
  position: THREE.Vector3
  radius: number
}>()

const emit = defineEmits<{
  (event: 'ready', payload: { mesh: THREE.Mesh; cubeCamera: THREE.CubeCamera } | null): void
}>()

const ballMesh = ref<THREE.Mesh | null>(null)
const cubeCamera = ref<THREE.CubeCamera | null>(null)
const cubeRenderTarget = ref<THREE.WebGLCubeRenderTarget | null>(null)
const isLoading = ref(false)

const createBall = () => {
  if (!props.scene || ballMesh.value || isLoading.value) {
    return
  }
  isLoading.value = true

  cubeRenderTarget.value = new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  })
  cubeCamera.value = new THREE.CubeCamera(0.1, 100, cubeRenderTarget.value)
  props.scene.add(cubeCamera.value)

  const geometry = new THREE.SphereGeometry(props.radius, 32, 32)
  const material = new THREE.MeshStandardMaterial({
    color: 0xff6a4a,
    roughness: 0.06,
    metalness: 0.85,
    emissive: 0x3a140d,
    emissiveIntensity: 0.6,
    envMap: cubeRenderTarget.value.texture,
    envMapIntensity: 0.8,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.copy(props.position)
  mesh.castShadow = true
  mesh.receiveShadow = true
  props.scene.add(mesh)
  ballMesh.value = mesh
  emit('ready', { mesh, cubeCamera: cubeCamera.value })
  isLoading.value = false
}

watch(
  () => props.scene,
  () => {
    createBall()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (props.scene && ballMesh.value) {
    props.scene.remove(ballMesh.value)
    if (ballMesh.value.geometry) {
      ballMesh.value.geometry.dispose()
    }
    const material = ballMesh.value.material
    if (Array.isArray(material)) {
      material.forEach((item) => item.dispose())
    } else if (material) {
      material.dispose()
    }
    ballMesh.value = null
  }
  if (props.scene && cubeCamera.value) {
    props.scene.remove(cubeCamera.value)
    cubeCamera.value = null
  }
  if (cubeRenderTarget.value) {
    cubeRenderTarget.value.dispose()
    cubeRenderTarget.value = null
  }
  emit('ready', null)
})
</script>

<template></template>
