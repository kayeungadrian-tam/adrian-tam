<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { applyShadowProps, disposeModel } from './modelLoader'

const props = defineProps<{
  scene: THREE.Scene | null
  loader: GLTFLoader | null
  position: THREE.Vector3
  targetHeight?: number
}>()

const emit = defineEmits<{
  (event: 'ready', payload: THREE.Object3D | null): void
}>()

const modelRoot = ref<THREE.Object3D | null>(null)
const isLoading = ref(false)
let mixer: THREE.AnimationMixer | null = null

const createPlayer = () => {
  if (!props.scene || !props.loader || modelRoot.value || isLoading.value) {
    return
  }
  isLoading.value = true
  void props.loader
    .loadAsync(new URL('../../assets/models/walkrun_and_idle.glb', import.meta.url).href)
    .then((gltf) => {
      const targetHeight = props.targetHeight ?? 2.0
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const size = new THREE.Vector3()
      const center = new THREE.Vector3()
      box.getSize(size)
      box.getCenter(center)
      const scale = size.y > 0 ? targetHeight / size.y : 1
      gltf.scene.scale.setScalar(scale)
      gltf.scene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale)
      applyShadowProps(gltf.scene)

      const rig = new THREE.Group()
      rig.add(gltf.scene)
      rig.position.copy(props.position)
      rig.rotation.y = Math.PI

      mixer = new THREE.AnimationMixer(gltf.scene)
      const clips = gltf.animations ?? []
      const findClip = (names: string[]) =>
        clips.find((clip) => names.some((name) => clip.name.toLowerCase().includes(name)))
      const idleClip = findClip(['idle', 'rest'])
      const walkClip = findClip(['walk'])
      const runClip = findClip(['run', 'jog', 'sprint'])
      const actions: Record<string, THREE.AnimationAction> = {}
      if (idleClip) actions.idle = mixer.clipAction(idleClip)
      if (walkClip) actions.walk = mixer.clipAction(walkClip)
      if (runClip) actions.run = mixer.clipAction(runClip)
      const defaultAction = actions.idle ?? actions.walk ?? actions.run
      if (defaultAction) {
        defaultAction.play()
      }
      rig.userData.mixer = mixer
      rig.userData.actions = actions
      rig.userData.activeAction = defaultAction ?? null

      props.scene?.add(rig)
      modelRoot.value = rig
      emit('ready', rig)
    })
    .catch((error) => {
      console.error('Failed to load player rig model.', error)
    })
    .finally(() => {
      isLoading.value = false
    })
}

watch(
  () => [props.scene, props.loader],
  () => {
    createPlayer()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (props.scene && modelRoot.value) {
    props.scene.remove(modelRoot.value)
    disposeModel(modelRoot.value)
    modelRoot.value = null
  }
  if (mixer) {
    mixer.stopAllAction()
    mixer = null
  }
  emit('ready', null)
})
</script>

<template></template>
