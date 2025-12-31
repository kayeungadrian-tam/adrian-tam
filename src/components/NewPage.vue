<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue'
import * as THREE from 'three'
import { Text } from 'troika-three-text'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// Overlays
import WorkOverlay from './overlays/WorkOverlay.vue'
import AboutOverlay from './overlays/AboutOverlay.vue'
import EducationOverlay from './overlays/EducationOverlay.vue'
import StartOverlay from './overlays/StartOverlay.vue'
import AwardsOverlay from './overlays/AwardsOverlay.vue'
import ProjectsOverlay from './overlays/ProjectsOverlay.vue'

// Objects
import TableModel from './objects/table.vue'
import BookshelfModel from './objects/bookshelf.vue'
import ChairModel from './objects/chair.vue'
import AvatarModel from './objects/avatar.vue'
import BallModel from './objects/ball.vue'
import SceneLights from './lights/SceneLights.vue'
import PlayerRig from './objects/playerRig.vue'
import CertificateModel from './objects/certificate.vue'
import DrawerModel from './objects/drawer.vue'
import RoomShell from './room/RoomShell.vue'
import CeilingLightModel from './objects/ceilingLight.vue'

// Cameras
import SceneCamera from './camera/SceneCamera.vue'

// Config
import { sceneLayout } from '../config/sceneLayout'
import { createPlayerMovement } from './playerMovement'

const container = ref<HTMLDivElement | null>(null)
const hasStarted = ref(false)
const isFadingOut = ref(false)
const theme = ref<'dark' | 'light'>('dark')
const themeStorageKey = 'portfolio-theme'

const clock = new THREE.Clock()

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let resizeHandler: (() => void) | null = null
let keyDownHandler: ((event: KeyboardEvent) => void) | null = null
let keyUpHandler: ((event: KeyboardEvent) => void) | null = null
let mouseMoveHandler: ((event: MouseEvent) => void) | null = null
let pointerDownHandler: ((event: MouseEvent) => void) | null = null
let pointerUpHandler: (() => void) | null = null
let wheelHandler: ((event: WheelEvent) => void) | null = null
let contextMenuHandler: ((event: MouseEvent) => void) | null = null

let avatarHead: THREE.Object3D | null = null
let playerRig: THREE.Object3D | null = null
let ballCubeCamera: THREE.CubeCamera | null = null

let spotlightCone: THREE.Mesh | null = null
let spotlightConeMaterial: THREE.MeshBasicMaterial | null = null
let skyboxTexture: THREE.Texture | null = null
let backWallMaterial: THREE.MeshStandardMaterial | null = null

const sceneRef = shallowRef<THREE.Scene | null>(null)
const gltfLoaderRef = shallowRef<GLTFLoader | null>(null)
const introLookAt = new THREE.Vector3(0, 1.2, 0)

const intro = {
  active: false,
  startTime: 0,
  durationMs: 2200,
  from: new THREE.Vector3(0, 3.6, 9),
}
const {
  followOffset,
  roomWidth,
  roomDepth,
  roomHeight,
  wallThickness,
  floorThickness,
  roofThickness,
  floorOvershoot,
  playerRadius,
  ballRadius,
  ballPosition,
  tablePosition,
  tableRotationY,
  tableTargetHeight,
  drawerPosition,
  drawerRotationY,
  drawerTargetHeight,
  chairPosition,
  chairTargetHeight,
  bookshelfPosition,
  bookshelfTargetHeight,
  avatarPosition,
  avatarRotationY,
  avatarScale,
  playerPosition,
  playerTargetHeight,
  certificatePosition,
  certificateRotationY,
  certificateTargetHeight,
  ceilingLightPosition,
  ceilingLightTargetHeight,
  labels,
  interactables,
  movement: movementConfig,
} = sceneLayout
const ballVelocity = new THREE.Vector3()
let ballMesh: THREE.Mesh | null = null
const labelBillboards: THREE.Object3D[] = []
type TroikaLabel = Text & {
  color: string
  outlineColor: string
  outlineWidth: number
  fillOpacity?: number
}

const labelRegistry = new Map<
  string,
  {
    group: THREE.Object3D
    backplate: THREE.MeshStandardMaterial
    label: TroikaLabel
    shadow: TroikaLabel
    defaults: {
      backplateColor: THREE.Color
      emissive: THREE.Color
      emissiveIntensity: number
      labelColor: string
      outlineColor: string
      outlineWidth: number
      shadowColor: string
      shadowOpacity: number
    }
  }
>()
let activeLabelId = ''
let activeLabelBackplate: THREE.MeshStandardMaterial | null = null
let activeLabelGroup: THREE.Object3D | null = null
const floorWidth = roomWidth + floorOvershoot * 2
const floorDepth = roomDepth + floorOvershoot * 2
const wallColliders = [
  {
    center: new THREE.Vector3(0, roomHeight / 2, -roomDepth / 2 - wallThickness / 2),
    halfSize: new THREE.Vector3(roomWidth / 2, roomHeight / 2, wallThickness / 2),
  },
  {
    center: new THREE.Vector3(-roomWidth / 2 - wallThickness / 2, roomHeight / 2, 0),
    halfSize: new THREE.Vector3(wallThickness / 2, roomHeight / 2, roomDepth / 2),
  },
  {
    center: new THREE.Vector3(roomWidth / 2 + wallThickness / 2, roomHeight / 2, 0),
    halfSize: new THREE.Vector3(wallThickness / 2, roomHeight / 2, roomDepth / 2),
  },
]

const applyTheme = (value: 'dark' | 'light') => {
  theme.value = value
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', value)
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(themeStorageKey, value)
  }
}

const applySceneTheme = (value: 'dark' | 'light') => {
  if (!scene || !(scene.fog instanceof THREE.FogExp2)) {
    return
  }
  if (value === 'dark') {
    scene.fog.color.set(0x2a2030)
    scene.fog.density = 0.04
  } else {
    scene.fog.color.set(0xe8edf3)
    scene.fog.density = 0.06
  }
  if (spotlightConeMaterial) {
    if (value === 'dark') {
      spotlightConeMaterial.opacity = 0.15
      spotlightConeMaterial.color.set(0xd6e4ff)
    } else {
      spotlightConeMaterial.opacity = 0.06
      spotlightConeMaterial.color.set(0xfff4e0)
    }
  }
  if (scene) {
    if (skyboxTexture) {
      skyboxTexture.dispose()
      skyboxTexture = null
    }
    skyboxTexture = createSkybox()
    if (skyboxTexture) {
      scene.background = skyboxTexture
    }
  }
}

const initTheme = () => {
  if (typeof window === 'undefined') {
    return
  }
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(themeStorageKey) : null
  if (stored === 'light' || stored === 'dark') {
    applyTheme(stored)
    return
  }
  const prefersDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
  applyTheme(prefersDark ? 'dark' : 'light')
}

const toggleTheme = () => {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

const nearbyId = ref('')
const focus = reactive({
  active: false,
  transitioning: false,
  targetId: '',
  startTime: 0,
  durationMs: 1200,
  fromPos: new THREE.Vector3(),
  toPos: new THREE.Vector3(),
  fromLook: new THREE.Vector3(),
  toLook: new THREE.Vector3(),
})

const createLabel = (text: string, id?: string) => {
  const group = new THREE.Group()
  const backplate = new THREE.Mesh(
    new THREE.ExtrudeGeometry(new THREE.Shape(), {
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelSegments: 2,
      steps: 1,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x0f3a74,
      roughness: 0.3,
      metalness: 0.1,
      emissive: 0x06162b,
      emissiveIntensity: 0.4,
    })
  )
  backplate.position.set(0, 0, -0.06)
  backplate.castShadow = true
  backplate.receiveShadow = true
  group.add(backplate)

  const shadow = new Text() as TroikaLabel
  shadow.text = text
  shadow.fontSize = 0.28
  shadow.color = '#0a122c'
  shadow.fillOpacity = 0.55
  shadow.anchorX = 'center'
  shadow.anchorY = 'middle'
  shadow.position.set(0.03, -0.03, -0.02)
  shadow.depthOffset = -2
  shadow.sync(() => {
    if (shadow.material) {
      shadow.material.depthTest = false
      shadow.material.transparent = true
    }
  })

  const label = new Text() as TroikaLabel
  label.text = text
  label.fontSize = 0.28
  label.color = '#d0e2ff'
  label.outlineWidth = 0.01
  label.outlineColor = '#0a122c'
  label.anchorX = 'center'
  label.anchorY = 'middle'
  label.depthOffset = -1
  label.sync(() => {
    if (label.material) {
      label.material.depthTest = false
      label.material.transparent = true
    }
    const bounds = label.textRenderInfo?.blockBounds
    if (!bounds) {
      return
    }
    const width = bounds[2] - bounds[0]
    const height = bounds[3] - bounds[1]
    const padding = 0.08
    const cornerRadius = 0.12
    const plateShape = new THREE.Shape()
    const w = width + padding * 2
    const h = height + padding * 1
    const r = Math.min(cornerRadius, w * 0.3, h * 0.5)
    plateShape.moveTo(-w / 2 + r, -h / 2)
    plateShape.lineTo(w / 2 - r, -h / 2)
    plateShape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
    plateShape.lineTo(w / 2, h / 2 - r)
    plateShape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
    plateShape.lineTo(-w / 2 + r, h / 2)
    plateShape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
    plateShape.lineTo(-w / 2, -h / 2 + r)
    plateShape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
    const geometry = new THREE.ExtrudeGeometry(plateShape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelSegments: 2,
      steps: 1,
    })
    backplate.geometry.dispose()
    backplate.geometry = geometry
  })
  label.castShadow = true
  label.receiveShadow = false
  group.add(shadow, label)
  labelBillboards.push(group)
  if (id && backplate.material instanceof THREE.MeshStandardMaterial) {
    labelRegistry.set(id, {
      group,
      backplate: backplate.material,
      label,
      shadow,
      defaults: {
        backplateColor: backplate.material.color.clone(),
        emissive: backplate.material.emissive.clone(),
        emissiveIntensity: backplate.material.emissiveIntensity,
        labelColor: label.color as string,
        outlineColor: label.outlineColor as string,
        outlineWidth: label.outlineWidth,
        shadowColor: shadow.color as string,
        shadowOpacity: shadow.fillOpacity ?? 0.55,
      },
    })
  }
  return group
}

const setLabelActive = (id: string) => {
  if (id === activeLabelId) {
    return
  }
  if (activeLabelId && labelRegistry.has(activeLabelId)) {
    const entry = labelRegistry.get(activeLabelId)
    if (entry) {
      entry.backplate.color.copy(entry.defaults.backplateColor)
      entry.backplate.emissive.copy(entry.defaults.emissive)
      entry.backplate.emissiveIntensity = entry.defaults.emissiveIntensity
      entry.label.color = entry.defaults.labelColor
      entry.label.outlineColor = entry.defaults.outlineColor
      entry.label.outlineWidth = entry.defaults.outlineWidth
      entry.shadow.color = entry.defaults.shadowColor
      entry.shadow.fillOpacity = entry.defaults.shadowOpacity
    }
  }
  activeLabelId = id
  activeLabelBackplate = null
  activeLabelGroup = null
  if (id && labelRegistry.has(id)) {
    const entry = labelRegistry.get(id)
    if (entry) {
      activeLabelBackplate = entry.backplate
      activeLabelGroup = entry.group
      entry.label.color = '#FFFFFF'
      entry.shadow.fillOpacity = Math.min(entry.defaults.shadowOpacity + 0.08, 0.8)
      entry.backplate.color
        .copy(entry.defaults.backplateColor)
        .multiplyScalar(1.5)
      entry.backplate.emissive.copy(entry.backplate.color)
      entry.backplate.emissiveIntensity = 0.5
    }
  }
}

const createSpotlightCone = () => {
  const spotPosition = new THREE.Vector3(0.6, 5.5, 0)
  const spotDistance = 5.5
  const spotAngle = THREE.MathUtils.degToRad(30)

  const radius = Math.tan(spotAngle) * spotDistance
  const geometry = new THREE.ConeGeometry(radius, spotDistance, 32, 1, true)

  geometry.translate(0, -spotDistance / 2, 0)

  const material = new THREE.MeshBasicMaterial({
    color: theme.value === 'dark' ? 0xFFF9D6 : 0xFAE987,
    transparent: true,
    opacity: theme.value === 'dark' ? 0.15 : 0.06,
    side: THREE.DoubleSide,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  spotlightConeMaterial = material

  const cone = new THREE.Mesh(geometry, material)
  cone.position.copy(spotPosition)
  cone.renderOrder = 1

  return cone
}

const createSkybox = () => {
  const size = 2048
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  if (theme.value === 'light') {
    const gradient = ctx.createLinearGradient(0, 0, 0, size)
    gradient.addColorStop(0, '#cfe0f6')
    gradient.addColorStop(0.55, '#e9eef7')
    gradient.addColorStop(1, '#f7e9d2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    // Cloud bands
    for (let i = 0; i < 32; i += 1) {
      const y = size * (0.45 + Math.random() * 0.35)
      const width = size * (0.35 + Math.random() * 0.6)
      const height = size * (0.02 + Math.random() * 0.05)
      const x = Math.random() * (size - width)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.beginPath()
      ctx.ellipse(x + width / 2, y, width / 2, height, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  } else {
    const gradient = ctx.createLinearGradient(0, 0, 0, size)
    gradient.addColorStop(0, '#0a0d1c')
    gradient.addColorStop(0.6, '#131429')
    gradient.addColorStop(1, '#1d1a2f')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    // Star field
    const starCount = 700
    for (let i = 0; i < starCount; i += 1) {
      const x = Math.random() * size
      const y = Math.random() * size
      const radius = Math.random() * 1.4 + 0.3
      const alpha = 0.15 + Math.random() * 0.6
      ctx.fillStyle = `rgba(220, 226, 255, ${alpha})`
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    // Soft haze near the horizon
    const haze = ctx.createLinearGradient(0, size * 0.6, 0, size)
    haze.addColorStop(0, 'rgba(40, 34, 58, 0)')
    haze.addColorStop(1, 'rgba(62, 48, 72, 0.35)')
    ctx.fillStyle = haze
    ctx.fillRect(0, size * 0.6, size, size * 0.4)
  }

  const texture = new THREE.CanvasTexture(canvas)
  // Important for a background texture to look correct:
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

const startExperience = () => {
  if (hasStarted.value || isFadingOut.value) {
    return
  }
  isFadingOut.value = true
  intro.active = true
  intro.startTime = performance.now()
}

type BallReadyPayload = { mesh: THREE.Mesh; cubeCamera: THREE.CubeCamera } | null
type PlayerReadyPayload = THREE.Object3D | null

const handleBallReady = (payload: BallReadyPayload) => {
  if (payload) {
    ballMesh = payload.mesh
    ballCubeCamera = payload.cubeCamera
  } else {
    ballMesh = null
    ballCubeCamera = null
  }
}

const handlePlayerReady = (payload: PlayerReadyPayload) => {
  playerRig = payload
}

const handleCameraReady = (payload: THREE.PerspectiveCamera | null) => {
  camera = payload
}

const handleBackWallReady = (material: THREE.MeshStandardMaterial | null) => {
  backWallMaterial = material
}

// Camera smoothing for RPG feel
const cameraLag = 0.08
const cameraRotationLag = 0.12

let targetCameraOffset = new THREE.Vector3()
let currentCameraOffset = new THREE.Vector3()

const playerMovement = createPlayerMovement({
  walkSpeed: movementConfig.walkSpeed,
  runSpeed: movementConfig.runSpeed,
  moveAcceleration: movementConfig.moveAcceleration,
  moveDamping: movementConfig.moveDamping,
  rotationSmoothing: movementConfig.rotationSmoothing,
  cameraPitchLimits: movementConfig.cameraPitchLimits,
  mouseSensitivity: movementConfig.mouseSensitivity,
  zoomLimits: movementConfig.zoomLimits,
  zoomSensitivity: movementConfig.zoomSensitivity,
  initialYaw: Math.PI,
  initialOrbitYaw: 0,
  initialOrbitPitch: 0.3,
  getHasStarted: () => hasStarted.value,
  isFocusActive: () => focus.active,
})
const movementState = playerMovement.state
let lastFocusOpacity = 1

const updateRigOpacity = (rig: THREE.Object3D, opacity: number) => {
  rig.traverse((node: THREE.Object3D) => {
    if ((node as THREE.Mesh).isMesh) {
      const mesh = node as THREE.Mesh
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      materials.forEach((material) => {
        if (!material) return
        if ('opacity' in material) {
          material.transparent = true
          material.opacity = opacity
        }
      })
    }
  })
}

const setPlayerAnimation = (state: 'idle' | 'walk' | 'run') => {
  if (!playerRig) return
  const actions = playerRig.userData?.actions as
    | Record<string, THREE.AnimationAction>
    | undefined
  const nextAction =
    actions?.[state] ?? actions?.walk ?? actions?.idle ?? actions?.run
  if (!nextAction) return
  const currentAction = playerRig.userData?.activeAction as
    | THREE.AnimationAction
    | undefined
  if (currentAction === nextAction) return
  nextAction.reset()
  nextAction.fadeIn(0.15)
  nextAction.play()
  if (currentAction) {
    currentAction.fadeOut(0.15)
  }
  playerRig.userData.activeAction = nextAction
}

onMounted(async () => {
  initTheme()
  if (!container.value) {
    return
  }

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0xe8edf3, 0.08)
  applySceneTheme(theme.value)
  sceneRef.value = scene

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)
  gltfLoaderRef.value = gltfLoader

  for (const label of labels) {
    const labelMesh = createLabel(label.text, label.id)
    if (labelMesh) {
      labelMesh.position.copy(label.position)
      scene.add(labelMesh)
    }
  }

  spotlightCone = createSpotlightCone()
  if (spotlightCone) {
    scene.add(spotlightCone)
  }

  skyboxTexture = createSkybox()
  if (skyboxTexture && scene) {
    scene.background = skyboxTexture
  }

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)
  renderer.setClearColor(0x000000, 0)

  resizeHandler = () => {
    if (!container.value || !renderer) {
      return
    }
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', resizeHandler)

  pointerDownHandler = playerMovement.handlePointerDown
  pointerUpHandler = playerMovement.handlePointerUp
  mouseMoveHandler = playerMovement.handleMouseMove
  wheelHandler = playerMovement.handleWheel

  keyDownHandler = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      hasStarted.value = false
      isFadingOut.value = false
      intro.active = false
      focus.active = false
      focus.transitioning = false
      nearbyId.value = ''
      if (camera) {
        camera.position.copy(intro.from)
        camera.lookAt(0, 1.2, 0)
      }
      playerMovement.resetState()
      event.preventDefault()
      return
    }
    if (focus.active && (event.code === 'KeyQ' || event.code === 'Space')) {
      focus.active = false
      focus.transitioning = false
      event.preventDefault()
      return
    }
    if (event.code === 'Space') {
      if (!hasStarted.value && !isFadingOut.value) {
        startExperience()
        event.preventDefault()
        return
      }
      if (hasStarted.value && !focus.active) {
        const target = interactables.find((item) => item.id === nearbyId.value)
        if (target && camera) {
          focus.active = true
          focus.transitioning = true
          focus.targetId = target.id
          focus.startTime = performance.now()
          focus.fromPos.copy(camera.position)
          const forward = new THREE.Vector3()
          camera.getWorldDirection(forward)
          focus.fromLook.copy(camera.position).add(forward)
          const focusOffset = target.cameraOffset ?? new THREE.Vector3(0, 2.0, 2.4)
          focus.toPos.copy(target.position).add(focusOffset)
          focus.toLook.copy(target.position)
        }
        event.preventDefault()
      }
      return
    }
    if (!hasStarted.value) {
      return
    }
    playerMovement.handleKeyDown(event)
  }

  keyUpHandler = (event: KeyboardEvent) => {
    if (!hasStarted.value) {
      return
    }
    playerMovement.handleKeyUp(event)
  }

  contextMenuHandler = (event: MouseEvent) => {
    event.preventDefault()
  }

  window.addEventListener('keydown', keyDownHandler)
  window.addEventListener('keyup', keyUpHandler)
  renderer.domElement.addEventListener('contextmenu', contextMenuHandler)
  renderer.domElement.addEventListener('mousedown', pointerDownHandler)
  window.addEventListener('mouseup', pointerUpHandler)
  window.addEventListener('mousemove', mouseMoveHandler)
  renderer.domElement.addEventListener('wheel', wheelHandler, { passive: false })

  renderer.setAnimationLoop(animate)
})

watch(theme, (value) => {
  applySceneTheme(value)
})

onBeforeUnmount(() => {
  if (renderer) {
    renderer.setAnimationLoop(null)
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
  if (keyDownHandler) {
    window.removeEventListener('keydown', keyDownHandler)
  }
  if (keyUpHandler) {
    window.removeEventListener('keyup', keyUpHandler)
  }
  if (pointerDownHandler && renderer) {
    renderer.domElement.removeEventListener('mousedown', pointerDownHandler)
  }
  if (pointerUpHandler) {
    window.removeEventListener('mouseup', pointerUpHandler)
  }
  if (mouseMoveHandler) {
    window.removeEventListener('mousemove', mouseMoveHandler)
  }
  if (wheelHandler && renderer) {
    renderer.domElement.removeEventListener('wheel', wheelHandler)
  }
  if (contextMenuHandler && renderer) {
    renderer.domElement.removeEventListener('contextmenu', contextMenuHandler)
  }

  if (spotlightCone && scene) {
    scene.remove(spotlightCone)
    spotlightCone.geometry.dispose()
    if (spotlightConeMaterial) {
      spotlightConeMaterial.dispose()
    }
    spotlightCone = null
    spotlightConeMaterial = null
  }
  if (skyboxTexture) {
    skyboxTexture.dispose()
    skyboxTexture = null
    if (scene?.background) {
      scene.background = null
    }
  }

  if (renderer && container.value) {
    container.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
})

function animate() {
  if (!scene || !camera || !renderer) return;

  if (!hasStarted.value && !isFadingOut.value && !intro.active) {
    renderer.render(scene, camera);
    return;
  }

  const delta = clock.getDelta();

  const mixer = playerRig?.userData?.mixer as THREE.AnimationMixer | undefined
  if (mixer) {
    mixer.update(delta)
  }

  if (spotlightCone && spotlightConeMaterial) {
    const time = performance.now() * 0.001
    const baseOpacity = theme.value === 'dark' ? 0.15 : 0.01
    spotlightConeMaterial.opacity = baseOpacity + Math.sin(time * 0.5) * 0.03
  }

  playerMovement.updateMovement({
    delta,
    playerRig,
    focusActive: focus.active,
    roomWidth: floorWidth,
    roomDepth: floorDepth,
    wallColliders,
    playerRadius,
    setPlayerAnimation,
  })
  if (playerRig) {
    const targetOpacity = focus.active ? 0.35 : 1
    if (Math.abs(targetOpacity - lastFocusOpacity) > 0.01) {
      updateRigOpacity(playerRig, targetOpacity)
      lastFocusOpacity = targetOpacity
    }
  }
  if (backWallMaterial && playerRig) {
    const backWallZ = -roomDepth / 2 - wallThickness / 2
    const distanceBehind = backWallZ - playerRig.position.z
    const fadeStart = 0.15
    const fadeEnd = 1.2
    const t = Math.min(Math.max((distanceBehind - fadeStart) / (fadeEnd - fadeStart), 0), 1)
    const targetOpacity = 1 - t * 0.6
    if (Math.abs(backWallMaterial.opacity - targetOpacity) > 0.01) {
      backWallMaterial.opacity = targetOpacity
    }
  }

  // Ball physics
  if (playerRig && ballMesh) {
    const toBall = new THREE.Vector3().subVectors(ballMesh.position, playerRig.position)
    const distance = toBall.length()
    const minDistance = playerRadius + ballRadius
    if (distance > 0 && distance < minDistance) {
      const pushDir = toBall.normalize()
      const overlap = minDistance - distance
      ballMesh.position.addScaledVector(pushDir, overlap)
      const pushForce = movementState.moveVelocity.length() * 3.5
      ballVelocity.addScaledVector(pushDir, pushForce)
    }
  }

  if (ballMesh) {
    ballMesh.rotation.y += delta * 0.9
    ballMesh.rotation.x += delta * 0.35
    ballVelocity.multiplyScalar(0.99)
    ballMesh.position.addScaledVector(ballVelocity, delta)

    const halfWidth = roomWidth / 2 - ballRadius
    const halfDepth = roomDepth / 2 - ballRadius

    if (ballMesh.position.x < -halfWidth) {
      ballMesh.position.x = -halfWidth
      ballVelocity.x *= -0.6
    } else if (ballMesh.position.x > halfWidth) {
      ballMesh.position.x = halfWidth
      ballVelocity.x *= -0.6
    }

    if (ballMesh.position.z < -halfDepth) {
      ballMesh.position.z = -halfDepth
      ballVelocity.z *= -0.6
    } else if (ballMesh.position.z > halfDepth) {
      ballMesh.position.z = halfDepth
      ballVelocity.z *= -0.6
    }

    ballMesh.position.y = ballRadius
  }

  // Interactable detection
  if (playerRig && !focus.active) {
    let nearest = ''
    let nearestDist = Infinity
    const playerPos = playerRig.position
    for (const item of interactables) {
      const dist = playerPos.distanceTo(item.position)
      const triggerRadius = item.triggerRadius ?? 2.5
      if (dist < triggerRadius && dist < nearestDist) {
        nearest = item.id
        nearestDist = dist
      }
    }
    nearbyId.value = nearest
  } else if (focus.active) {
    nearbyId.value = ''
  }
  const highlightId = !focus.active ? nearbyId.value : ''
  setLabelActive(highlightId)
  if (activeLabelBackplate) {
    const pulse = Math.sin(performance.now() * 0.004) * 0.15
    activeLabelBackplate.emissiveIntensity = 0.35 + pulse
  }
  if (activeLabelGroup) {
    const scalePulse = 1 + Math.sin(performance.now() * 0.004) * 0.015
    activeLabelGroup.scale.setScalar(scalePulse)
  }

  // Camera control
  if (playerRig && focus.active) {
    const elapsed = performance.now() - focus.startTime
    const t = Math.min(Math.max(elapsed / focus.durationMs, 0), 1)
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    camera.position.lerpVectors(focus.fromPos, focus.toPos, eased)
    const lookTarget = new THREE.Vector3().lerpVectors(focus.fromLook, focus.toLook, eased)
    camera.lookAt(lookTarget)
    if (t >= 1) {
      focus.transitioning = false
    }
  } else if (playerRig) {
    // Smooth camera follow with lag
    const offsetRotation = new THREE.Euler(
      movementState.cameraOrbitPitch,
      movementState.cameraOrbitYaw,
      0,
      'YXZ'
    )
    targetCameraOffset = followOffset.clone().applyEuler(offsetRotation).multiplyScalar(
      movementState.cameraZoom
    )

    currentCameraOffset.lerp(targetCameraOffset, cameraLag)
    const targetPos = playerRig.position.clone().add(currentCameraOffset)

    if (intro.active) {
      const elapsed = performance.now() - intro.startTime
      const t = Math.min(Math.max(elapsed / intro.durationMs, 0), 1)
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      camera.position.lerpVectors(intro.from, targetPos, eased)
      camera.lookAt(playerRig.position.x, playerRig.position.y + 0.6, playerRig.position.z)
      if (t >= 1) {
        intro.active = false
        hasStarted.value = true
        isFadingOut.value = false
      }
    } else {
      camera.position.lerp(targetPos, cameraRotationLag)
      const lookTarget = new THREE.Vector3(
        playerRig.position.x,
        playerRig.position.y + 0.6,
        playerRig.position.z
      )
      camera.lookAt(lookTarget)
    }
  }

  if (avatarHead) {
    const headTarget = new THREE.Vector3()
    camera.getWorldPosition(headTarget)
    avatarHead.lookAt(headTarget)
    avatarHead.rotateY(Math.PI)
  }

  if (labelBillboards.length > 0) {
    for (const label of labelBillboards) {
      label.quaternion.copy(camera.quaternion)
    }
  }

  if (ballMesh && ballCubeCamera) {
    ballMesh.visible = false
    ballCubeCamera.position.copy(ballMesh.position)
    ballCubeCamera.update(renderer, scene)
    ballMesh.visible = true
  }

  renderer.render(scene, camera)
}
</script>

<template>
  <div class="threejs-stage">
    <button class="theme-toggle" type="button" @click.stop="toggleTheme"
      v-bind="{
        'aria-pressed': theme === 'dark',
        'aria-label': `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
        title: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
      }">
      <fa class="theme-toggle__icon" icon="lightbulb" aria-hidden="true" />
    </button>
    <div ref="container" class="threejs-canvas"></div>
    <SceneCamera :container="container" :intro-from="intro.from" :look-at="introLookAt" @ready="handleCameraReady" />
    <RoomShell v-if="sceneRef" :scene="sceneRef" :room-width="roomWidth" :room-depth="roomDepth"
      :room-height="roomHeight" :wall-thickness="wallThickness" :floor-thickness="floorThickness"
      :roof-thickness="roofThickness" :floor-overshoot="floorOvershoot" :theme="theme"
      @back-wall-ready="handleBackWallReady" />
    <SceneLights v-if="sceneRef" :scene="sceneRef" :theme="theme" />
    <BallModel v-if="sceneRef" :scene="sceneRef" :position="ballPosition" :radius="ballRadius"
      @ready="handleBallReady" />
    <PlayerRig v-if="sceneRef && gltfLoaderRef" :scene="sceneRef" :loader="gltfLoaderRef" :position="playerPosition"
      :target-height="playerTargetHeight" @ready="handlePlayerReady" />
    <CeilingLightModel v-if="sceneRef && gltfLoaderRef" :scene="sceneRef" :loader="gltfLoaderRef"
      :position="ceilingLightPosition" :target-height="ceilingLightTargetHeight" />
    <DrawerModel v-if="sceneRef && gltfLoaderRef" :scene="sceneRef" :loader="gltfLoaderRef" :position="drawerPosition"
      :rotation-y="drawerRotationY" :target-height="drawerTargetHeight" />
    <CertificateModel v-if="sceneRef && gltfLoaderRef" :scene="sceneRef" :loader="gltfLoaderRef"
      :position="certificatePosition" :rotation-y="certificateRotationY" :target-height="certificateTargetHeight" />
    <TableModel v-if="sceneRef && gltfLoaderRef" :scene="sceneRef" :loader="gltfLoaderRef" :position="tablePosition"
      :rotation-y="tableRotationY" :target-height="tableTargetHeight" />
    <BookshelfModel v-if="sceneRef && gltfLoaderRef" :scene="sceneRef" :loader="gltfLoaderRef"
      :position="bookshelfPosition" :target-height="bookshelfTargetHeight" />
    <ChairModel v-if="sceneRef && gltfLoaderRef" :scene="sceneRef" :loader="gltfLoaderRef" :position="chairPosition"
      :target-height="chairTargetHeight" />
    <AvatarModel v-if="sceneRef && gltfLoaderRef" :scene="sceneRef" :loader="gltfLoaderRef" :position="avatarPosition"
      :rotation-y="avatarRotationY" :scale="avatarScale" @head-ready="avatarHead = $event" />
    <div v-if="hasStarted" class="threejs-hint">Press Enter to return</div>
    <div v-if="hasStarted && nearbyId && !focus.active" class="threejs-prompt">
      Press Spacebar to view
    </div>
    <div v-if="focus.active" class="threejs-prompt">
      Press Q to return
    </div>
    <Transition name="overlay-fade">
      <WorkOverlay v-if="focus.active && focus.targetId === 'table'" />
    </Transition>
    <Transition name="overlay-fade">
      <AboutOverlay v-if="focus.active && focus.targetId === 'chair'" />
    </Transition>
    <Transition name="overlay-fade">
      <EducationOverlay v-if="focus.active && focus.targetId === 'bookshelf'" />
    </Transition>
    <Transition name="overlay-fade">
      <AwardsOverlay v-if="focus.active && focus.targetId === 'certificate'" />
    </Transition>
    <Transition name="overlay-fade">
      <ProjectsOverlay v-if="focus.active && focus.targetId === 'drawer'" />
    </Transition>

    <StartOverlay v-if="!hasStarted || isFadingOut" :is-fading-out="isFadingOut" @fade="startExperience" />

  </div>
</template>

<style scoped>
.threejs-stage {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: var(--stage-bg);
}

.threejs-canvas {
  width: 100%;
  height: 100%;
}

.threejs-canvas :deep(canvas) {
  display: block;
}

.threejs-hint {
  position: absolute;
  right: 24px;
  bottom: 20px;
  padding: 8px 14px;
  background: var(--stage-hint-bg);
  color: var(--stage-hint-text);
  font-size: 14px;
  border-radius: 999px;
  letter-spacing: 0.4px;
}

.threejs-prompt {
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  padding: 10px 18px;
  background: var(--stage-prompt-bg);
  color: var(--stage-prompt-text);
  font-size: 15px;
  border-radius: 999px;
  letter-spacing: 0.4px;
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 20;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: 44px;
  height: 44px;
  justify-content: center;
  padding: 0;
  border-radius: 10px;
  border: 1px solid var(--theme-toggle-border);
  background: var(--theme-toggle-bg);
  color: var(--theme-toggle-text);
  cursor: pointer;
  box-shadow: var(--theme-toggle-shadow);
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.theme-toggle:hover {
  background: var(--theme-toggle-hover-bg);
  transform: translateY(-1px);
}

.theme-toggle__icon {
  width: 22px;
  height: 22px;
  font-size: 22px;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (max-width: 768px) {
  .theme-toggle {
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
  }
}
</style>
