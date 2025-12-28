<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps<{
  scene: THREE.Scene | null
  position: THREE.Vector3
}>()

const emit = defineEmits<{
  (event: 'ready', payload: THREE.Mesh | null): void
}>()

const playerMesh = ref<THREE.Mesh | null>(null)

const createPlayer = () => {
  if (!props.scene || playerMesh.value) {
    return
  }
  const geometry = new THREE.CylinderGeometry(0.28, 0.28, 1.1, 24)
  const material = new THREE.MeshStandardMaterial({
    color: 0x2f7fff,
    roughness: 0.45,
    metalness: 0.1,
    transparent: true,
    opacity: 1,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.copy(props.position)
  mesh.castShadow = true
  mesh.receiveShadow = true
  props.scene.add(mesh)
  playerMesh.value = mesh
  emit('ready', mesh)
}

watch(
  () => props.scene,
  () => {
    createPlayer()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (props.scene && playerMesh.value) {
    props.scene.remove(playerMesh.value)
    if (playerMesh.value.geometry) {
      playerMesh.value.geometry.dispose()
    }
    const material = playerMesh.value.material
    if (Array.isArray(material)) {
      material.forEach((item) => item.dispose())
    } else if (material) {
      material.dispose()
    }
    playerMesh.value = null
  }
  emit('ready', null)
})
</script>

<template></template>
