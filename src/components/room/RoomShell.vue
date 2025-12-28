<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import * as THREE from 'three'

type FloorTextureConfig = {
  size?: number
  plankCount?: number
  plankLineAlpha?: number
  plankLineWidth?: number
  seamLineAlpha?: number
  seamLineWidth?: number
  grainCount?: number
  grainAlphaMin?: number
  grainAlphaMax?: number
  repeat?: number
  anisotropy?: number
  baseColor?: string
  plankColorA?: string
  plankColorB?: string
  grainColor?: string
}

const props = defineProps<{
  scene: THREE.Scene | null
  roomWidth: number
  roomDepth: number
  roomHeight?: number
  floorTextureConfig?: FloorTextureConfig
}>()

let meshes: THREE.Mesh[] = []
let floorTexture: THREE.CanvasTexture | null = null

const createFloorTexture = () => {
  const canvas = document.createElement('canvas')
  const config: Required<FloorTextureConfig> = {
    size: props.floorTextureConfig?.size ?? 512,
    plankCount: props.floorTextureConfig?.plankCount ?? 8,
    plankLineAlpha: props.floorTextureConfig?.plankLineAlpha ?? 0.18,
    plankLineWidth: props.floorTextureConfig?.plankLineWidth ?? 2,
    seamLineAlpha: props.floorTextureConfig?.seamLineAlpha ?? 0.25,
    seamLineWidth: props.floorTextureConfig?.seamLineWidth ?? 3,
    grainCount: props.floorTextureConfig?.grainCount ?? 1200,
    grainAlphaMin: props.floorTextureConfig?.grainAlphaMin ?? 0.05,
    grainAlphaMax: props.floorTextureConfig?.grainAlphaMax ?? 0.08,
    repeat: props.floorTextureConfig?.repeat ?? 3,
    anisotropy: props.floorTextureConfig?.anisotropy ?? 6,
    baseColor: props.floorTextureConfig?.baseColor ?? '#f2efe9',
    plankColorA: props.floorTextureConfig?.plankColorA ?? '#ece7df',
    plankColorB: props.floorTextureConfig?.plankColorB ?? '#f5f2ec',
    grainColor: props.floorTextureConfig?.grainColor ?? '60, 50, 40',
  }
  const size = config.size
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    return null
  }
  context.fillStyle = config.baseColor
  context.fillRect(0, 0, size, size)

  const plankHeight = size / config.plankCount
  for (let i = 0; i < config.plankCount; i += 1) {
    const y = i * plankHeight
    const shade = i % 2 === 0 ? config.plankColorA : config.plankColorB
    context.fillStyle = shade
    context.fillRect(0, y, size, plankHeight)
    context.strokeStyle = `rgba(120, 110, 98, ${config.plankLineAlpha})`
    context.lineWidth = config.plankLineWidth
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(size, y)
    context.stroke()
  }

  context.strokeStyle = `rgba(120, 110, 98, ${config.seamLineAlpha})`
  context.lineWidth = config.seamLineWidth
  for (let i = 0; i < 22; i += 1) {
    const x = (size / 22) * i
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, size)
    context.stroke()
  }

  for (let i = 0; i < config.grainCount; i += 1) {
    const x = Math.random() * size
    const y = Math.random() * size
    const alpha = config.grainAlphaMin + Math.random() * (config.grainAlphaMax - config.grainAlphaMin)
    context.fillStyle = `rgba(${config.grainColor}, ${alpha})`
    context.fillRect(x, y, 1, 1)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(config.repeat, config.repeat)
  texture.anisotropy = config.anisotropy
  return texture
}

onMounted(() => {
  if (!props.scene) {
    return
  }

  const roomHeight = props.roomHeight ?? 5.2
  floorTexture = createFloorTexture()

  const floorGeometry = new THREE.PlaneGeometry(props.roomWidth, props.roomDepth)
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f3ef,
    roughness: 0.85,
    metalness: 0,
    map: floorTexture ?? undefined,
  })
  const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -0.02
  floor.receiveShadow = true
  props.scene.add(floor)
  meshes.push(floor)

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf3e1cf,
    roughness: 0.92,
  })

  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(props.roomWidth, roomHeight),
    wallMaterial.clone()
  )
  if (backWall.material instanceof THREE.MeshStandardMaterial) {
    backWall.material.color.set(0xf5d7c2)
  }
  backWall.position.set(0, roomHeight / 2, -props.roomDepth / 2)
  backWall.receiveShadow = true
  props.scene.add(backWall)
  meshes.push(backWall)

  const leftWall = new THREE.Mesh(
    new THREE.PlaneGeometry(props.roomDepth, roomHeight),
    wallMaterial.clone()
  )
  if (leftWall.material instanceof THREE.MeshStandardMaterial) {
    leftWall.material.color.set(0xf0cdb4)
  }
  leftWall.rotation.y = Math.PI / 2
  leftWall.position.set(-props.roomWidth / 2, roomHeight / 2, 0)
  leftWall.receiveShadow = true
  props.scene.add(leftWall)
  meshes.push(leftWall)

  const rightWall = new THREE.Mesh(
    new THREE.PlaneGeometry(props.roomDepth, roomHeight),
    wallMaterial.clone()
  )
  if (rightWall.material instanceof THREE.MeshStandardMaterial) {
    rightWall.material.color.set(0xf6dec8)
  }
  rightWall.rotation.y = -Math.PI / 2
  rightWall.position.set(props.roomWidth / 2, roomHeight / 2, 0)
  rightWall.receiveShadow = true
  props.scene.add(rightWall)
  meshes.push(rightWall)
})

onBeforeUnmount(() => {
  if (props.scene) {
    meshes.forEach((mesh) => props.scene?.remove(mesh))
  }
  meshes.forEach((mesh) => {
    mesh.geometry.dispose()
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((material) => material.dispose())
    } else {
      mesh.material.dispose()
    }
  })
  meshes = []
  if (floorTexture) {
    floorTexture.dispose()
    floorTexture = null
  }
})
</script>

<template></template>
