<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { applyShadowProps, disposeModel } from './modelLoader'

const props = defineProps<{
  scene: THREE.Scene | null
  loader: GLTFLoader | null
  position: THREE.Vector3
  rotationY?: number
}>()

const emit = defineEmits<{
  (event: 'head-ready', head: THREE.Object3D | null): void
}>()

const modelRoot = ref<THREE.Object3D | null>(null)
const isLoading = ref(false)
let headNode: THREE.Object3D | null = null

const loadModel = async () => {
  if (!props.scene || !props.loader || modelRoot.value || isLoading.value) {
    return
  }
  isLoading.value = true
  try {
    const gltf = await props.loader.loadAsync(
      new URL('../../assets/models/male_human_low-poly_base.glb', import.meta.url).href
    )
    gltf.scene.position.set(0, 0, 0)
    gltf.scene.scale.setScalar(1)
    gltf.scene.traverse((node: THREE.Object3D) => {
      const name = node.name.toLowerCase()
      if (!headNode && (name === 'head' || name.includes('head'))) {
        headNode = node
      }
    })
    applyShadowProps(gltf.scene)
    const rig = new THREE.Group()
    rig.add(gltf.scene)
    rig.position.copy(props.position)
    rig.rotation.y = props.rotationY ?? Math.PI
    props.scene.add(rig)
    modelRoot.value = rig
    emit('head-ready', headNode)
  } catch (error) {
    console.error('Failed to load avatar model.', error)
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
  headNode = null
  emit('head-ready', null)
})
</script>

<template></template>
