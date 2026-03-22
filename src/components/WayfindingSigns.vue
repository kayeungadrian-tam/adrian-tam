<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import * as THREE from 'three'
import { portals, zones, type Portal } from '../config/expandedWorld'

const props = defineProps<{ scene: THREE.Scene | null; theme: 'dark' | 'light' }>()

let rootGroup: THREE.Group | null = null
let animationId: number | null = null
const panelMaterials: THREE.MeshStandardMaterial[] = []
const panelTextures: THREE.CanvasTexture[] = []
const markerCones: THREE.Mesh[] = []

const getHubZone = () => zones.find((zone) => zone.id === 'hub')

const roundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

const createSignTexture = (
  title: string,
  subtitle: string,
  accent: string,
  theme: 'dark' | 'light',
  detail?: string
) => {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 420
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  if (theme === 'dark') {
    bgGradient.addColorStop(0, '#11172a')
    bgGradient.addColorStop(1, '#1c2642')
  } else {
    bgGradient.addColorStop(0, '#efe6d4')
    bgGradient.addColorStop(1, '#d9ccaf')
  }

  roundedRect(ctx, 24, 24, canvas.width - 48, canvas.height - 48, 34)
  ctx.fillStyle = bgGradient
  ctx.fill()
  ctx.lineWidth = 8
  ctx.strokeStyle = accent
  ctx.stroke()

  const stripe = ctx.createLinearGradient(0, 0, canvas.width, 0)
  stripe.addColorStop(0, accent)
  stripe.addColorStop(1, 'rgba(255,255,255,0.35)')
  ctx.fillStyle = stripe
  roundedRect(ctx, 56, 54, canvas.width - 112, 34, 12)
  ctx.fill()

  ctx.fillStyle = theme === 'dark' ? '#e8efff' : '#2f261a'
  ctx.font = '700 66px "Trebuchet MS", "Arial", sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(title.toUpperCase(), 68, 178)

  ctx.font = '600 40px "Trebuchet MS", "Arial", sans-serif'
  ctx.fillStyle = theme === 'dark' ? '#b8c9ff' : '#5e4d31'
  ctx.fillText(subtitle, 68, 246)

  if (detail) {
    ctx.font = '500 30px "Trebuchet MS", "Arial", sans-serif'
    ctx.fillStyle = theme === 'dark' ? 'rgba(222,232,255,0.86)' : 'rgba(70,55,34,0.82)'
    ctx.fillText(detail, 68, 302)
  }

  ctx.fillStyle = accent
  ctx.beginPath()
  ctx.moveTo(canvas.width - 138, 170)
  ctx.lineTo(canvas.width - 70, 210)
  ctx.lineTo(canvas.width - 138, 250)
  ctx.closePath()
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  panelTextures.push(texture)
  return texture
}

const createSignPost = (
  position: THREE.Vector3,
  facingTarget: THREE.Vector3,
  title: string,
  subtitle: string,
  accent: string,
  detail?: string
) => {
  const postGroup = new THREE.Group()
  postGroup.position.copy(position)

  const postMaterial = new THREE.MeshStandardMaterial({
    color: props.theme === 'dark' ? 0x2d3550 : 0x7b6542,
    roughness: 0.65,
    metalness: 0.2,
  })

  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 2.5, 10), postMaterial)
  post.position.y = 1.25
  post.castShadow = true
  post.receiveShadow = true
  postGroup.add(post)

  const panelTexture = createSignTexture(title, subtitle, accent, props.theme, detail)
  const panelMaterial = new THREE.MeshStandardMaterial({
    map: panelTexture ?? undefined,
    color: 0xffffff,
    emissive: new THREE.Color(accent).multiplyScalar(props.theme === 'dark' ? 0.18 : 0.06),
    emissiveIntensity: 1,
    metalness: 0.35,
    roughness: 0.5,
  })
  panelMaterials.push(panelMaterial)

  const panel = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.4, 0.2), panelMaterial)
  panel.position.set(0, 2.2, 0)
  panel.castShadow = true
  panel.receiveShadow = true
  postGroup.add(panel)

  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.16, 12),
    new THREE.MeshStandardMaterial({
      color: props.theme === 'dark' ? 0xb6c8ff : 0xa68254,
      metalness: 0.7,
      roughness: 0.25,
    })
  )
  cap.position.y = 2.56
  cap.castShadow = true
  postGroup.add(cap)

  const marker = new THREE.Mesh(
    new THREE.ConeGeometry(0.23, 0.7, 14),
    new THREE.MeshStandardMaterial({
      color: accent,
      emissive: new THREE.Color(accent).multiplyScalar(props.theme === 'dark' ? 0.35 : 0.14),
      emissiveIntensity: 1,
      roughness: 0.35,
      metalness: 0.45,
    })
  )
  marker.position.set(0, 3.1, 0)
  marker.rotation.x = Math.PI
  marker.userData.baseY = 3.1
  marker.userData.phase = Math.random() * Math.PI * 2
  markerCones.push(marker)
  postGroup.add(marker)

  postGroup.lookAt(facingTarget.x, postGroup.position.y + 1.6, facingTarget.z)
  rootGroup?.add(postGroup)
}

const addCentralDirectory = () => {
  const hub = getHubZone()
  if (!hub) return

  createSignPost(
    hub.center.clone().add(new THREE.Vector3(0, 0, -7)),
    hub.center,
    'World Directory',
    'Hub Nexus Transit Authority',
    '#a78bfa',
    'Technical | Creative | Personal | Future'
  )
}

const addPortalSigns = () => {
  const hub = getHubZone()
  if (!hub) return

  const hubPortals = portals.filter((portal) => portal.fromZone === 'hub')
  hubPortals.forEach((portal) => {
    const targetZone = zones.find((zone) => zone.id === portal.toZone)
    if (!targetZone) return

    const direction = portal.position.clone().sub(hub.center).normalize()
    const signPosition = portal.position.clone().addScaledVector(direction, -4.2)
    signPosition.y = 0

    createSignPost(
      signPosition,
      targetZone.center,
      targetZone.name,
      `Portal Gate ${targetZone.name.split(' ')[0]}`,
      portal.color
    )
  })

  const returnPortals = portals.filter((portal) => portal.fromZone !== 'hub' && portal.toZone === 'hub')
  returnPortals.forEach((portal) => {
    const currentZone = zones.find((zone) => zone.id === portal.fromZone)
    if (!currentZone) return

    const inward = currentZone.center.clone().sub(portal.position).normalize()
    const signPosition = portal.position.clone().addScaledVector(inward, 2.8)
    signPosition.y = 0

    createSignPost(
      signPosition,
      hub.center,
      'Return to Hub',
      `${currentZone.name} Exit`,
      '#a78bfa',
      'Fast Route to Nexus'
    )
  })
}

const buildSigns = () => {
  if (!rootGroup) return
  addCentralDirectory()
  addPortalSigns()
}

const clearSigns = () => {
  if (!rootGroup) return

  rootGroup.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose()
      const objectMaterial = object.material
      if (Array.isArray(objectMaterial)) {
        objectMaterial.forEach((material) => material.dispose())
      } else {
        objectMaterial.dispose()
      }
    }
  })

  while (rootGroup.children.length > 0) {
    rootGroup.remove(rootGroup.children[0])
  }

  panelTextures.forEach((texture) => texture.dispose())
  panelTextures.length = 0
  panelMaterials.length = 0
  markerCones.length = 0
}

const animateSigns = () => {
  const time = performance.now() * 0.001

  panelMaterials.forEach((material, index) => {
    material.emissiveIntensity = 0.65 + Math.sin(time * 1.8 + index * 0.6) * 0.2
  })

  markerCones.forEach((cone) => {
    const baseY = (cone.userData.baseY as number) ?? 3.1
    const phase = (cone.userData.phase as number) ?? 0
    cone.position.y = baseY + Math.sin(time * 1.6 + phase) * 0.12
  })

  animationId = requestAnimationFrame(animateSigns)
}

onMounted(() => {
  if (!props.scene) return
  rootGroup = new THREE.Group()
  props.scene.add(rootGroup)
  buildSigns()
  animateSigns()
})

watch(
  () => props.theme,
  () => {
    clearSigns()
    buildSigns()
  }
)

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  clearSigns()
  if (rootGroup && props.scene) {
    props.scene.remove(rootGroup)
  }
  rootGroup = null
  animationId = null
})
</script>

<template>
  <!-- Wayfinding signs are rendered directly in Three.js -->
</template>
