<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
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
  theme: 'dark' | 'light'
}>()

let meshes: THREE.Mesh[] = []
let floorTexture: THREE.CanvasTexture | null = null
let wallTexture: THREE.CanvasTexture | null = null
let floorMaterial: THREE.MeshStandardMaterial | null = null
let backWallMaterial: THREE.MeshStandardMaterial | null = null
let leftWallMaterial: THREE.MeshStandardMaterial | null = null
let rightWallMaterial: THREE.MeshStandardMaterial | null = null
let roofMaterial: THREE.MeshStandardMaterial | null = null

const getThemeFloorOverrides = (theme: 'dark' | 'light'): FloorTextureConfig => {
  if (theme === 'dark') {
    return {
      baseColor: '#111826',
      plankColorA: '#141d2b',
      plankColorB: '#0f1826',
      grainColor: '90, 100, 120',
      plankLineAlpha: 0.22,
      seamLineAlpha: 0.32,
    }
  }
  return {
    baseColor: '#f2efe9',
    plankColorA: '#ece7df',
    plankColorB: '#f5f2ec',
    grainColor: '60, 50, 40',
    plankLineAlpha: 0.18,
    seamLineAlpha: 0.25,
  }
}

const createFloorTexture = (overrides?: FloorTextureConfig) => {
  const canvas = document.createElement('canvas')
  const config: Required<FloorTextureConfig> = {
    size: overrides?.size ?? props.floorTextureConfig?.size ?? 512,
    plankCount: overrides?.plankCount ?? props.floorTextureConfig?.plankCount ?? 8,
    plankLineAlpha: overrides?.plankLineAlpha ?? props.floorTextureConfig?.plankLineAlpha ?? 0.18,
    plankLineWidth: overrides?.plankLineWidth ?? props.floorTextureConfig?.plankLineWidth ?? 2,
    seamLineAlpha: overrides?.seamLineAlpha ?? props.floorTextureConfig?.seamLineAlpha ?? 0.25,
    seamLineWidth: overrides?.seamLineWidth ?? props.floorTextureConfig?.seamLineWidth ?? 3,
    grainCount: overrides?.grainCount ?? props.floorTextureConfig?.grainCount ?? 1200,
    grainAlphaMin: overrides?.grainAlphaMin ?? props.floorTextureConfig?.grainAlphaMin ?? 0.05,
    grainAlphaMax: overrides?.grainAlphaMax ?? props.floorTextureConfig?.grainAlphaMax ?? 0.08,
    repeat: overrides?.repeat ?? props.floorTextureConfig?.repeat ?? 3,
    anisotropy: overrides?.anisotropy ?? props.floorTextureConfig?.anisotropy ?? 6,
    baseColor: overrides?.baseColor ?? props.floorTextureConfig?.baseColor ?? '#f2efe9',
    plankColorA: overrides?.plankColorA ?? props.floorTextureConfig?.plankColorA ?? '#ece7df',
    plankColorB: overrides?.plankColorB ?? props.floorTextureConfig?.plankColorB ?? '#f5f2ec',
    grainColor: overrides?.grainColor ?? props.floorTextureConfig?.grainColor ?? '60, 50, 40',
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

const createWallTexture = (theme: 'dark' | 'light') => {
  const canvas = document.createElement('canvas')
  const size = 512
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) {
    return null
  }
  const baseColor = theme === 'dark' ? '#162238' : '#f3dcc9'
  const shadeA = theme === 'dark' ? '#1b2944' : '#edd1be'
  const shadeB = theme === 'dark' ? '#132035' : '#f7e2d2'
  context.fillStyle = baseColor
  context.fillRect(0, 0, size, size)

  const panelCount = 6
  const panelHeight = size / panelCount
  for (let i = 0; i < panelCount; i += 1) {
    const y = i * panelHeight
    context.fillStyle = i % 2 === 0 ? shadeA : shadeB
    context.fillRect(0, y, size, panelHeight)
    context.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(90,70,50,0.12)'
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(size, y)
    context.stroke()
  }

  const speckCount = 1200
  for (let i = 0; i < speckCount; i += 1) {
    const x = Math.random() * size
    const y = Math.random() * size
    const alpha = theme === 'dark' ? 0.05 : 0.08
    context.fillStyle = theme === 'dark'
      ? `rgba(210, 220, 235, ${alpha})`
      : `rgba(120, 95, 70, ${alpha})`
    context.fillRect(x, y, 1, 1)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 1.5)
  texture.anisotropy = 4
  return texture
}

const applyTheme = (theme: 'dark' | 'light') => {
  if (!floorMaterial || !backWallMaterial || !leftWallMaterial || !rightWallMaterial) {
    return
  }
  const overrides = getThemeFloorOverrides(theme)
  const nextTexture = createFloorTexture(overrides)
  if (nextTexture) {
    floorMaterial.map?.dispose()
    floorMaterial.map = nextTexture
    floorMaterial.needsUpdate = true
    floorTexture = nextTexture
    if (roofMaterial) {
      roofMaterial.map?.dispose()
      roofMaterial.map = nextTexture
      roofMaterial.needsUpdate = true
    }
  }
  const nextWallTexture = createWallTexture(theme)
  if (nextWallTexture) {
    backWallMaterial.map?.dispose()
    leftWallMaterial.map?.dispose()
    rightWallMaterial.map?.dispose()
    backWallMaterial.map = nextWallTexture
    leftWallMaterial.map = nextWallTexture
    rightWallMaterial.map = nextWallTexture
    backWallMaterial.needsUpdate = true
    leftWallMaterial.needsUpdate = true
    rightWallMaterial.needsUpdate = true
    wallTexture = nextWallTexture
  }
  if (theme === 'dark') {
    floorMaterial.color.set(0x0f1626)
    floorMaterial.roughness = 0.92
    backWallMaterial.color.set(0x1d2b46)
    leftWallMaterial.color.set(0x162034)
    rightWallMaterial.color.set(0x202c44)
    backWallMaterial.roughness = 0.95
    leftWallMaterial.roughness = 0.95
    rightWallMaterial.roughness = 0.95
    if (roofMaterial) {
      roofMaterial.color.copy(floorMaterial.color)
      roofMaterial.roughness = floorMaterial.roughness
      roofMaterial.opacity = 0.3
    }
  } else {
    floorMaterial.color.set(0xf5f3ef)
    floorMaterial.roughness = 0.85
    backWallMaterial.color.set(0xf5d7c2)
    leftWallMaterial.color.set(0xf0cdb4)
    rightWallMaterial.color.set(0xf6dec8)
    backWallMaterial.roughness = 0.88
    leftWallMaterial.roughness = 0.88
    rightWallMaterial.roughness = 0.88
    if (roofMaterial) {
      roofMaterial.color.copy(floorMaterial.color)
      roofMaterial.roughness = floorMaterial.roughness
      roofMaterial.opacity = 0.35
    }
  }
}

onMounted(() => {
  if (!props.scene) {
    return
  }

  const roomHeight = props.roomHeight ?? 5.2
  const wallThickness = 0.18
  const floorThickness = 0.12
  const floorOvershoot = 1.2
  const roofThickness = 0.08
  floorTexture = createFloorTexture(getThemeFloorOverrides(props.theme))

  const floorGeometry = new THREE.BoxGeometry(
    props.roomWidth + floorOvershoot * 2,
    floorThickness,
    props.roomDepth + floorOvershoot * 2
  )
  floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f3ef,
    roughness: 0.85,
    metalness: 0,
    map: floorTexture ?? undefined,
  })
  const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.position.y = -floorThickness / 2
  floor.receiveShadow = true
  props.scene.add(floor)
  meshes.push(floor)

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf3e1cf,
    roughness: 0.92,
  })

  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(props.roomWidth, roomHeight, wallThickness),
    wallMaterial.clone()
  )
  if (backWall.material instanceof THREE.MeshStandardMaterial) {
    backWall.material.color.set(0xf5d7c2)
    backWallMaterial = backWall.material
  }
  backWall.position.set(0, roomHeight / 2, -props.roomDepth / 2 - wallThickness / 2)
  backWall.receiveShadow = true
  props.scene.add(backWall)
  meshes.push(backWall)

  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, roomHeight, props.roomDepth),
    wallMaterial.clone()
  )
  if (leftWall.material instanceof THREE.MeshStandardMaterial) {
    leftWall.material.color.set(0xf0cdb4)
    leftWallMaterial = leftWall.material
  }
  leftWall.position.set(-props.roomWidth / 2 - wallThickness / 2, roomHeight / 2, 0)
  leftWall.receiveShadow = true
  props.scene.add(leftWall)
  meshes.push(leftWall)

  const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, roomHeight, props.roomDepth),
    wallMaterial.clone()
  )
  if (rightWall.material instanceof THREE.MeshStandardMaterial) {
    rightWall.material.color.set(0xf6dec8)
    rightWallMaterial = rightWall.material
  }
  rightWall.position.set(props.roomWidth / 2 + wallThickness / 2, roomHeight / 2, 0)
  rightWall.receiveShadow = true
  props.scene.add(rightWall)
  meshes.push(rightWall)

  const roofGeometry = new THREE.BoxGeometry(
    props.roomWidth + wallThickness * 2,
    roofThickness,
    props.roomDepth + wallThickness * 2
  )
  roofMaterial = floorMaterial.clone()
  roofMaterial.transparent = true
  roofMaterial.opacity = 0.35
  const roof = new THREE.Mesh(roofGeometry, roofMaterial)
  roof.position.set(0, roomHeight + roofThickness / 2, 0)
  roof.receiveShadow = true
  props.scene.add(roof)
  meshes.push(roof)

  applyTheme(props.theme)
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
  if (wallTexture) {
    wallTexture.dispose()
    wallTexture = null
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
