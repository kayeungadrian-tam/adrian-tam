<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { Text } from 'troika-three-text'

interface Props {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera | null
  hubCenter: THREE.Vector3
  theme: 'dark' | 'light'
}

const props = defineProps<Props>()

let welcomeGroup: THREE.Group | null = null
let textMeshes: Text[] = []
let animationId: number | null = null

const _cameraWorldPos = new THREE.Vector3()
const _textWorldPos = new THREE.Vector3()
const _lookTarget = new THREE.Vector3()

function createWelcomeHub(): THREE.Group {
  const group = new THREE.Group()
  group.position.copy(props.hubCenter)

  // Thin glowing ground ring
  const ringGeometry = new THREE.TorusGeometry(4, 0.04, 16, 64)
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xa78bfa,
    transparent: true,
    opacity: 0.6,
  })
  const ring = new THREE.Mesh(ringGeometry, ringMaterial)
  ring.rotation.x = -Math.PI / 2
  ring.position.y = 0.05
  group.add(ring)

  // Inner ring
  const innerRingGeometry = new THREE.TorusGeometry(2.5, 0.02, 16, 64)
  const innerRingMaterial = new THREE.MeshBasicMaterial({
    color: 0xc4b5fd,
    transparent: true,
    opacity: 0.3,
  })
  const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial)
  innerRing.rotation.x = -Math.PI / 2
  innerRing.position.y = 0.05
  group.add(innerRing)

  // Floating title
  const titleMesh = new Text() as any
  titleMesh.text = 'ADRIAN TAM'
  titleMesh.fontSize = 0.6
  titleMesh.font = '/fonts/Roboto-Bold.ttf'
  titleMesh.color = 0xffffff
  titleMesh.anchorX = 'center'
  titleMesh.anchorY = 'middle'
  titleMesh.position.y = 3.5
  titleMesh.textAlign = 'center'
  titleMesh.letterSpacing = 0.12
  titleMesh.sync()
  textMeshes.push(titleMesh)
  group.add(titleMesh)

  // Subtitle
  const subtitleMesh = new Text() as any
  subtitleMesh.text = 'AI ENGINEER'
  subtitleMesh.fontSize = 0.25
  subtitleMesh.font = '/fonts/Roboto-Regular.ttf'
  subtitleMesh.color = 0xa78bfa
  subtitleMesh.anchorX = 'center'
  subtitleMesh.anchorY = 'middle'
  subtitleMesh.position.y = 2.8
  subtitleMesh.textAlign = 'center'
  subtitleMesh.letterSpacing = 0.3
  subtitleMesh.sync()
  textMeshes.push(subtitleMesh)
  group.add(subtitleMesh)

  // Hint text
  const hintMesh = new Text() as any
  hintMesh.text = 'explore the zones'
  hintMesh.fontSize = 0.15
  hintMesh.font = '/fonts/Roboto-Regular.ttf'
  hintMesh.color = 0x888888
  hintMesh.anchorX = 'center'
  hintMesh.anchorY = 'middle'
  hintMesh.position.y = 2.3
  hintMesh.textAlign = 'center'
  hintMesh.letterSpacing = 0.15
  hintMesh.sync()
  textMeshes.push(hintMesh)
  group.add(hintMesh)

  // Subtle vertical light beam
  const beamGeometry = new THREE.CylinderGeometry(0.02, 0.02, 8, 8)
  const beamMaterial = new THREE.MeshBasicMaterial({
    color: 0xa78bfa,
    transparent: true,
    opacity: 0.08,
  })
  const beam = new THREE.Mesh(beamGeometry, beamMaterial)
  beam.position.y = 4
  group.add(beam)
  group.userData.beam = beam

  // Sparse floating particles
  const particleCount = 40
  const particlesGeometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2
    const radius = 3 + Math.random() * 2
    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = Math.random() * 6
    positions[i * 3 + 2] = Math.sin(angle) * radius
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xa78bfa,
    size: 0.06,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
  })

  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  group.add(particles)
  group.userData.particles = particles
  group.userData.ring = ring
  group.userData.innerRing = innerRing

  return group
}

function animateWelcome() {
  if (!welcomeGroup) return

  const time = performance.now() * 0.001

  // Billboard text toward camera
  if (props.camera) {
    props.camera.getWorldPosition(_cameraWorldPos)
    textMeshes.forEach((textMesh) => {
      textMesh.getWorldPosition(_textWorldPos)
      _lookTarget.set(_cameraWorldPos.x, _textWorldPos.y, _cameraWorldPos.z)
      textMesh.lookAt(textMesh.parent!.worldToLocal(_lookTarget))
    })
  }

  // Gentle ring pulse
  const ring = welcomeGroup.userData.ring
  if (ring) {
    ring.material.opacity = 0.4 + Math.sin(time * 1.5) * 0.2
  }

  // Slow particle rotation
  const particles = welcomeGroup.userData.particles
  if (particles) {
    particles.rotation.y += 0.001
  }

  // Subtle beam pulse
  const beam = welcomeGroup.userData.beam
  if (beam) {
    beam.material.opacity = 0.04 + Math.sin(time * 0.8) * 0.04
  }

  animationId = requestAnimationFrame(animateWelcome)
}

onMounted(() => {
  if (!props.scene) return
  welcomeGroup = createWelcomeHub()
  props.scene.add(welcomeGroup)
  animateWelcome()
})

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (welcomeGroup) {
    props.scene.remove(welcomeGroup)
    welcomeGroup.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        obj.geometry.dispose()
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose())
        } else {
          obj.material.dispose()
        }
      }
      if (obj instanceof Text) {
        (obj as any).dispose()
      }
    })
    welcomeGroup = null
  }

  textMeshes = []
})
</script>

<template>
  <!-- Hub welcome is purely visual, rendered via Three.js -->
</template>
