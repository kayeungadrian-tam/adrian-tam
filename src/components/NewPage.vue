<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// Overlays
import WorkOverlay from './overlays/WorkOverlay.vue'
import AboutOverlay from './overlays/AboutOverlay.vue'
import EducationOverlay from './overlays/EducationOverlay.vue'
import StartOverlay from './overlays/StartOverlay.vue'
import AwardsOverlay from './overlays/AwardsOverlay.vue'
import ProjectsOverlay from './overlays/ProjectsOverlay.vue'
import QuickOverview from './overlays/QuickOverview.vue'

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

// Expanded World
import PortalSystem from './PortalSystem.vue'
import Minimap from './Minimap.vue'
import ZoneFloors from './ZoneFloors.vue'
import SkillCrystals from './zones/SkillCrystals.vue'
import ProjectOrbs from './zones/ProjectOrbs.vue'
import HubWelcome from './zones/HubWelcome.vue'
import PersonalManifesto from './zones/PersonalManifesto.vue'

// Config
import { sceneLayout } from '../config/sceneLayout'
import { expandedWorld, zones, portals, getCurrentZone, type Portal } from '../config/expandedWorld'
import { createPlayerMovement } from './playerMovement'
import { createAudioController } from './audioController'
import { createThemeManager } from './useThemeManager'
import { createLabelManager } from './labelManager'
import { createGraffiti, createSkyboxTexture, createSpotlightCone } from './sceneVisuals'
import { updateWallOcclusion } from './sceneOcclusion'
import { createPostProcessing, type PostProcessingController } from './postProcessing'

const container = ref<HTMLDivElement | null>(null)
const themeStorageKey = 'portfolio-theme'
const hasStarted = ref(false)
const isFadingOut = ref(false)
const showQuickOverview = ref(false)
const themeManager = createThemeManager({ storageKey: themeStorageKey })
const theme = themeManager.theme
const audioEnabled = ref(true)
const menuOpen = ref(false)

// Expanded world
const portalSystemRef = ref<InstanceType<typeof PortalSystem> | null>(null)
const playerPositionRef = ref<THREE.Vector3 | null>(null)
const currentZoneId = ref<string>('hub')
const nearbyPortal = ref<Portal | null>(null)

const clock = new THREE.Clock()

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let postProcessing: PostProcessingController | null = null
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
let backWallMesh: THREE.Mesh | null = null
let leftWallMaterial: THREE.MeshStandardMaterial | null = null
let rightWallMaterial: THREE.MeshStandardMaterial | null = null
let graffitiGroup: THREE.Object3D | null = null

const sceneRef = shallowRef<THREE.Scene | null>(null)
const gltfLoaderRef = shallowRef<GLTFLoader | null>(null)
const introLookAt = new THREE.Vector3(0, 1.2, 0)

// Start at hub center with camera above
const hubZone = zones.find(z => z.id === 'hub')!
const intro = {
  active: false,
  startTime: 0,
  durationMs: 2200,
  from: new THREE.Vector3(hubZone.center.x, 15, hubZone.center.z + 15),
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
const overlayMenuItems = labels
  .filter((label) => typeof label.id === 'string' && label.id.length > 0)
  .map((label) => ({
    id: label.id as string,
    label: label.text,
  }))
const ballVelocity = new THREE.Vector3()
let ballMesh: THREE.Mesh | null = null
const labelManager = createLabelManager()
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

const toggleTheme = () => {
  themeManager.toggleTheme()
}

const setSkyboxTexture = (texture: THREE.Texture | null) => {
  if (skyboxTexture) {
    skyboxTexture.dispose()
  }
  skyboxTexture = texture
}

const toggleAudio = () => {
  audioEnabled.value = !audioEnabled.value
  audioController.toggle()
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const openOverlay = (id: string) => {
  if (!camera) {
    return
  }
  const target = interactables.find((item) => item.id === id)
  if (!target) {
    return
  }
  if (!hasStarted.value) {
    hasStarted.value = true
    isFadingOut.value = false
    intro.active = false
    focus.openedFromMenu = true
  } else {
    focus.openedFromMenu = false
  }
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
  menuOpen.value = false
}

const nearbyId = ref('')
const focus = reactive({
  active: false,
  transitioning: false,
  targetId: '',
  openedFromMenu: false,
  startTime: 0,
  durationMs: 1200,
  fromPos: new THREE.Vector3(),
  toPos: new THREE.Vector3(),
  fromLook: new THREE.Vector3(),
  toLook: new THREE.Vector3(),
})


const createSkybox = () => createSkyboxTexture(theme.value)
const startExperience = () => {
  if (hasStarted.value || isFadingOut.value) {
    return
  }
  isFadingOut.value = true
  intro.active = true
  intro.startTime = performance.now()
  audioController.start()
}

const handleQuickView = () => {
  showQuickOverview.value = true
}

const handleCloseQuickView = () => {
  showQuickOverview.value = false
}

const handleExploreFromQuickView = () => {
  showQuickOverview.value = false
  startExperience()
}

/**
 * Handle portal teleportation
 */
const handlePortalTeleport = (portal: Portal) => {
  if (!playerRig || !camera) return

  const targetZone = zones.find(z => z.id === portal.toZone)
  if (!targetZone) return

  // Teleport player to spawn point of destination zone
  playerRig.position.copy(targetZone.spawnPoint)
  currentZoneId.value = portal.toZone

  // Update camera position smoothly
  const offsetPos = targetZone.spawnPoint.clone()
  offsetPos.y += 6
  offsetPos.z += 5
  camera.position.copy(offsetPos)
  camera.lookAt(targetZone.spawnPoint)
}

/**
 * Handle minimap teleport (fast travel to visited zone)
 */
const handleMinimapTeleport = (zoneId: string) => {
  if (!playerRig || !camera) return

  const targetZone = zones.find(z => z.id === zoneId)
  if (!targetZone) return

  // Teleport to zone spawn point
  playerRig.position.copy(targetZone.spawnPoint)
  currentZoneId.value = zoneId

  // Update camera
  const offsetPos = targetZone.spawnPoint.clone()
  offsetPos.y += 6
  offsetPos.z += 5
  camera.position.copy(offsetPos)
  camera.lookAt(targetZone.spawnPoint)
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

const handleBackWallReady = (payload: { material: THREE.MeshStandardMaterial | null; mesh: THREE.Mesh | null }) => {
  backWallMaterial = payload.material
  backWallMesh = payload.mesh
  if (!scene) {
    return
  }
  if (graffitiGroup) {
    scene.remove(graffitiGroup)
    graffitiGroup = null
  }
  if (backWallMesh) {
    graffitiGroup = createGraffiti('THE ROOM OF ADRIAN TAM')
    graffitiGroup.position.set(0, roomHeight * 0.8, -4.7)
    scene.add(graffitiGroup)
  }
}

const handleWallsReady = (payload: {
  back: THREE.MeshStandardMaterial | null
  left: THREE.MeshStandardMaterial | null
  right: THREE.MeshStandardMaterial | null
}) => {
  backWallMaterial = payload.back
  leftWallMaterial = payload.left
  rightWallMaterial = payload.right
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
const audioController = createAudioController({
  url: new URL('../assets/audio/321_long_BPM152.mp3', import.meta.url).href,
  volume: 0.12,
  enabled: audioEnabled.value,
})

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
  themeManager.initTheme()
  if (!container.value) {
    return
  }

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0xe8edf3, 0.025)
  sceneRef.value = scene

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)
  gltfLoaderRef.value = gltfLoader
  audioController.init()

  for (const label of labels) {
    const labelMesh = labelManager.createLabel(label.text, label.id)
    if (labelMesh) {
      labelMesh.position.copy(label.position)
      scene.add(labelMesh)
    }
  }

  const spotlight = createSpotlightCone(theme.value)
  spotlightCone = spotlight.mesh
  spotlightConeMaterial = spotlight.material
  scene.add(spotlightCone)

  themeManager.applySceneTheme({
    scene,
    spotlightConeMaterial,
    createSkybox,
    setSkyboxTexture,
  })

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)
  renderer.setClearColor(0x000000, 0)

  // Initialize post-processing effects
  if (camera) {
    postProcessing = createPostProcessing({
      renderer,
      scene,
      camera,
      theme: theme.value,
    })
  }

  resizeHandler = () => {
    if (!container.value || !renderer) {
      return
    }
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (camera && postProcessing) {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      postProcessing.resize(window.innerWidth, window.innerHeight)
    }
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
      audioController.stop()
      event.preventDefault()
      return
    }
    if (focus.active && (event.code === 'KeyQ' || event.code === 'Space')) {
      focus.active = false
      focus.transitioning = false
      if (focus.openedFromMenu) {
        hasStarted.value = false
        isFadingOut.value = false
        intro.active = false
        focus.openedFromMenu = false
      }
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

watch(theme, () => {
  themeManager.applySceneTheme({
    scene,
    spotlightConeMaterial,
    createSkybox,
    setSkyboxTexture,
  })
  if (postProcessing) {
    postProcessing.updateTheme(theme.value)
  }
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
  if (graffitiGroup && scene) {
    scene.remove(graffitiGroup)
    graffitiGroup = null
  }
  if (skyboxTexture) {
    skyboxTexture.dispose()
    skyboxTexture = null
    if (scene?.background) {
      scene.background = null
    }
  }

  if (postProcessing) {
    postProcessing.dispose()
    postProcessing = null
  }

  if (renderer && container.value) {
    container.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
  audioController.stop()
})

function animate() {
  if (!scene || !camera || !renderer) return;

  if (!hasStarted.value && !isFadingOut.value && !intro.active) {
    if (postProcessing) {
      postProcessing.render();
    } else {
      renderer.render(scene, camera);
    }
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

    // Update player position for minimap
    playerPositionRef.value = playerRig.position.clone()

    // Check for nearby portals
    if (portalSystemRef.value && !focus.active) {
      const portal = portalSystemRef.value.checkPortalProximity(playerRig.position)
      nearbyPortal.value = portal

      // Auto-teleport when entering portal
      if (portal && movementState.moveVelocity.length() > 0.5) {
        handlePortalTeleport(portal)
      }
    }

    // Update current zone
    const zone = getCurrentZone(playerRig.position)
    if (zone) {
      currentZoneId.value = zone.id
    }
  }
  updateWallOcclusion({
    camera,
    playerRig,
    roomWidth,
    roomDepth,
    roomHeight,
    wallThickness,
    backWallMaterial,
    leftWallMaterial,
    rightWallMaterial,
  })

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
  labelManager.setActive(highlightId)
  labelManager.updatePulse(performance.now())

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

  labelManager.updateBillboards(camera)

  if (ballMesh && ballCubeCamera) {
    ballMesh.visible = false
    ballCubeCamera.position.copy(ballMesh.position)
    ballCubeCamera.update(renderer, scene)
    ballMesh.visible = true
  }

  // Update post-processing effects
  if (postProcessing) {
    postProcessing.updateFocusMode(focus.active)
    postProcessing.render()
  } else {
    renderer.render(scene, camera)
  }
}
</script>

<template>
  <div class="threejs-stage">

    <button class="theme-toggle" type="button" @click.stop="toggleTheme" v-bind="{
      'aria-pressed': theme === 'dark',
      'aria-label': `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
      title: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
    }">
      <fa class="theme-toggle__icon" icon="lightbulb" aria-hidden="true" />
    </button>

    <button class="theme-toggle theme-toggle--audio" type="button" @click.stop="toggleAudio" v-bind="{
      'aria-pressed': audioEnabled,
      'aria-label': `${audioEnabled ? 'Mute' : 'Enable'} background music`,
      title: `${audioEnabled ? 'Mute' : 'Enable'} background music`,
    }">
      <fa class="theme-toggle__icon" :icon="audioEnabled ? 'volume-high' : 'volume-xmark'" aria-hidden="true" />
    </button>
    <button class="theme-toggle theme-toggle--menu" type="button" @click.stop="toggleMenu" v-bind="{
      'aria-expanded': menuOpen,
      'aria-label': 'Open menu',
      title: 'Open menu',
    }">
      <fa class="theme-toggle__icon" icon="bars" aria-hidden="true" />
    </button>
    <div v-if="menuOpen" class="overlay-menu">
      <div class="overlay-menu__title">Navigation</div>
      <button class="overlay-menu__item overlay-menu__item--highlight" type="button" @click="handleQuickView">
        <fa icon="file-alt" /> Quick Overview
      </button>
      <div class="overlay-menu__divider"></div>
      <div class="overlay-menu__title">Sections</div>
      <button v-for="item in overlayMenuItems" :key="item.id" class="overlay-menu__item" type="button"
        @click="openOverlay(item.id)">
        {{ item.label }}
      </button>
    </div>
    <div v-if="hasStarted && !focus.active" class="threejs-guide">
      <div class="threejs-guide__row threejs-guide__row--cluster">
        <div class="threejs-guide__cluster">
          <div class="threejs-guide__key threejs-guide__key--w">W</div>
          <div class="threejs-guide__key threejs-guide__key--a">A</div>
          <div class="threejs-guide__key threejs-guide__key--s">S</div>
          <div class="threejs-guide__key threejs-guide__key--d">D</div>
        </div>
        <span class="threejs-guide__label">Movement</span>
      </div>
      <div class="threejs-guide__row">
        <div class="threejs-guide__key threejs-guide__key--space">Space</div>
        <span class="threejs-guide__label">Interact / Close</span>
      </div>
      <div class="threejs-guide__row">
        <div class="threejs-guide__key threejs-guide__key--enter">Enter</div>
        <span class="threejs-guide__label">Return</span>
      </div>
      <div class="threejs-guide__row">
        <span class="threejs-guide__mouse">
          <fa class="threejs-guide__mouse-icon" icon="mouse-pointer" aria-hidden="true" />
          Drag
        </span>
        <span class="threejs-guide__label">Look</span>
      </div>
    </div>
    <div ref="container" class="threejs-canvas"></div>
    <SceneCamera :container="container" :intro-from="intro.from" :look-at="introLookAt" @ready="handleCameraReady" />
    <RoomShell v-if="sceneRef" :scene="sceneRef" :room-width="roomWidth" :room-depth="roomDepth"
      :room-height="roomHeight" :wall-thickness="wallThickness" :floor-thickness="floorThickness"
      :roof-thickness="roofThickness" :floor-overshoot="floorOvershoot" :theme="theme"
      @back-wall-ready="handleBackWallReady" @walls-ready="handleWallsReady" />
    <SceneLights v-if="sceneRef" :scene="sceneRef" :theme="theme" :player-position="playerPositionRef" />

    <!-- Expanded World Components -->
    <ZoneFloors v-if="sceneRef" :scene="sceneRef" :theme="theme" />
    <PortalSystem ref="portalSystemRef" v-if="sceneRef" :scene="sceneRef" :theme="theme" />

    <!-- Zone Content -->
    <HubWelcome v-if="sceneRef" :scene="sceneRef" :hub-center="zones.find(z => z.id === 'hub')!.center" :theme="theme" />
    <SkillCrystals v-if="sceneRef" :scene="sceneRef" :zone-center="zones.find(z => z.id === 'technical')!.center" :theme="theme" />
    <ProjectOrbs v-if="sceneRef" :scene="sceneRef" :zone-center="zones.find(z => z.id === 'creative')!.center" :theme="theme" />
    <PersonalManifesto v-if="sceneRef" :scene="sceneRef" :zone-center="zones.find(z => z.id === 'personal')!.center" :theme="theme" />

    <BallModel v-if="sceneRef" :scene="sceneRef" :position="ballPosition" :radius="ballRadius"
      @ready="handleBallReady" />
    <PlayerRig v-if="sceneRef && gltfLoaderRef" :scene="sceneRef" :loader="gltfLoaderRef" :position="hubZone.spawnPoint"
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

    <div v-if="hasStarted && nearbyId && !focus.active" class="threejs-prompt">
      Press Spacebar to view
    </div>
    <div v-if="hasStarted && nearbyPortal && !focus.active" class="threejs-prompt threejs-prompt--portal">
      <fa icon="door-open" /> Entering {{ nearbyPortal.label }}
    </div>
    <div v-if="focus.active" class="threejs-prompt">
      Press Q to return
    </div>

    <!-- Minimap -->
    <Minimap
      v-if="hasStarted && !focus.active"
      :player-position="playerPositionRef"
      :theme="theme"
      @teleport="handleMinimapTeleport"
    />
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

    <StartOverlay
      v-if="!hasStarted || isFadingOut"
      :is-fading-out="isFadingOut"
      @fade="startExperience"
      @quick-view="handleQuickView"
    />

    <QuickOverview
      v-if="showQuickOverview"
      @close="handleCloseQuickView"
      @explore="handleExploreFromQuickView"
    />

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

.threejs-prompt--portal {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  animation: portal-pulse 1.5s ease-in-out infinite;
  display: flex;
  align-items: center;
  gap: 8px;
}

@keyframes portal-pulse {
  0%, 100% {
    transform: translateX(-50%) scale(1);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  50% {
    transform: translateX(-50%) scale(1.05);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
}

.threejs-guide {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 20;
  padding: 14px 16px;
  border-radius: 14px;
  color: var(--stage-hint-text);
  font-size: 12px;
  letter-spacing: 0.3px;
  display: grid;
  gap: 10px;
  box-shadow: none;
  backdrop-filter: none;
}

.threejs-guide__cluster {
  position: relative;
  width: 110px;
  height: 76px;
}

.threejs-guide__key {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 32px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--stage-hint-text) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--stage-hint-text) 25%, transparent);
  color: var(--stage-hint-text);
  font-weight: 600;
  font-size: 12px;
}

.threejs-guide__key--w {
  top: 0;
  left: 36px;
}

.threejs-guide__key--a {
  top: 38px;
  left: 0;
}

.threejs-guide__key--s {
  top: 38px;
  left: 36px;
}

.threejs-guide__key--d {
  top: 38px;
  left: 72px;
}

.threejs-guide__key--space {
  position: relative;
  width: 110px;
}

.threejs-guide__key--enter {
  position: relative;
  width: 88px;
}

.threejs-guide__row {
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1.2;
}

.threejs-guide__row--cluster {
  gap: 14px;
}

.threejs-guide__label {
  font-size: 11px;
  opacity: 0.85;
}

.threejs-guide__mouse {
  padding: 4px 8px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--stage-hint-text) 12%, transparent);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.threejs-guide__mouse-icon {
  font-size: 12px;
}

[data-theme='light'] .threejs-guide {
  color: #1d1f27;
}

[data-theme='light'] .threejs-guide__key {
  background: rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 0, 0, 0.18);
  color: #1d1f27;
}

[data-theme='light'] .threejs-guide__mouse {
  background: rgba(0, 0, 0, 0.08);
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 72px;
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

.theme-toggle--audio {
  right: 124px;
}

.theme-toggle--menu {
  right: 20px;
}

.overlay-menu {
  position: fixed;
  right: 20px;
  top: 74px;
  z-index: 20;
  min-width: 160px;
  padding: 12px;
  border-radius: 12px;
  background: var(--stage-hint-bg);
  color: var(--stage-hint-text);
  border: 1px solid var(--theme-toggle-border);
  box-shadow: var(--theme-toggle-shadow);
  display: grid;
  gap: 6px;
}

.overlay-menu__title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.7;
  margin-bottom: 4px;
}

.overlay-menu__item {
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  color: inherit;
  text-align: left;
  padding: 6px 8px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.overlay-menu__item:hover {
  background: var(--stage-prompt-bg);
  border-color: var(--stage-prompt-text);
}

.overlay-menu__item--highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  border-color: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
}

.overlay-menu__item--highlight:hover {
  background: linear-gradient(135deg, #7688eb 0%, #8458b3 100%);
  transform: translateY(-1px);
}

.overlay-menu__divider {
  height: 1px;
  background: var(--theme-toggle-border);
  margin: 8px 0;
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
