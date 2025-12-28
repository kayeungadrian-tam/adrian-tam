<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { disposeModel, loadScaledModel } from './modelLoader'

const props = defineProps<{
  scene: THREE.Scene | null
  loader: GLTFLoader | null
  position: THREE.Vector3
  rotationY?: number
  targetHeight?: number
}>()

const modelRoot = ref<THREE.Object3D | null>(null)
const isLoading = ref(false)

const loadModel = async () => {
  if (!props.scene || !props.loader || modelRoot.value || isLoading.value) {
    return
  }
  isLoading.value = true
  try {
    const model = await loadScaledModel({
      loader: props.loader,
      url: new URL('../../assets/models/wooden_bookshelf.glb', import.meta.url).href,
      position: props.position,
      rotationY: props.rotationY ?? 0,
      targetHeight: props.targetHeight ?? 2.2,
    })
    props.scene.add(model)
    modelRoot.value = model
  } catch (error) {
    console.error('Failed to load bookshelf model.', error)
  } finally {
    isLoading.value = false
  }
}

watch(
  () => [props.scene, props.loader],
  () => {
    void loadModel()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (props.scene && modelRoot.value) {
    props.scene.remove(modelRoot.value)
    disposeModel(modelRoot.value)
    modelRoot.value = null
  }
})
</script>

<template></template>
