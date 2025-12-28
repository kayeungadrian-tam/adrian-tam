<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, shallowRef } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import WorkOverlay from './overlays/WorkOverlay.vue'
import AboutOverlay from './overlays/AboutOverlay.vue'
import EducationOverlay from './overlays/EducationOverlay.vue'
import StartOverlay from './overlays/StartOverlay.vue'
import TableModel from './objects/table.vue'
import BookshelfModel from './objects/bookshelf.vue'
import ChairModel from './objects/chair.vue'
import AvatarModel from './objects/avatar.vue'
import SceneLights from './lights/SceneLights.vue'
import BallModel from './objects/ball.vue'
import PlayerRig from './objects/playerRig.vue'

const container = ref<HTMLDivElement | null>(null)
const hasStarted = ref(false)
const isFadingOut = ref(false)

const movement = {
  forward: false,
  backward: false,
  left: false,
  right: false,
}
const clock = new THREE.Clock()
let yaw = 0
let pitch = 0
let isPointerLocked = false
let cameraHeight = 1.2

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let resizeHandler: (() => void) | null = null
let keyDownHandler: ((event: KeyboardEvent) => void) | null = null
let keyUpHandler: ((event: KeyboardEvent) => void) | null = null
let mouseMoveHandler: ((event: MouseEvent) => void) | null = null
let pointerLockHandler: (() => void) | null = null
let clickHandler: (() => void) | null = null
let contextMenuHandler: ((event: MouseEvent) => void) | null = null

let avatarHead: THREE.Object3D | null = null
let playerRig: THREE.Object3D | null = null
let ballCubeCamera: THREE.CubeCamera | null = null

const sceneRef = shallowRef<THREE.Scene | null>(null)
const gltfLoaderRef = shallowRef<GLTFLoader | null>(null)

const intro = {
  active: false,
  startTime: 0,
  durationMs: 2200,
  from: new THREE.Vector3(0, 3.6, 9),
}
const followOffset = new THREE.Vector3(0, 1.4, 3.2)
const roomWidth = 12
const roomDepth = 10
const playerRadius = 0.4
const ballRadius = 0.25
const ballVelocity = new THREE.Vector3()
let ballMesh: THREE.Mesh | null = null
const ballPosition = new THREE.Vector3(1.0, ballRadius, 0.4)
const tablePosition = new THREE.Vector3(0.6, 0, 1.2)
const tableRotationY = Math.PI
const chairPosition = new THREE.Vector3(-3.2, 0, -3.8)
const bookshelfPosition = new THREE.Vector3(-0.2, 0, -4.4)
const avatarPosition = new THREE.Vector3(1.8, 0, -1.6)
const avatarRotationY = Math.PI
const playerPosition = new THREE.Vector3(2.4, 0.55, 4.4)
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
const interactables = [
  {
    id: 'table',
    position: new THREE.Vector3(0.6, 0.8, 1.2),
    cameraOffset: new THREE.Vector3(0.0, 0.8, 1.6),
  },
  {
    id: 'chair',
    position: new THREE.Vector3(-3.2, 0.7, -3.8),
    cameraOffset: new THREE.Vector3(0.8, 0.6, 1.2),
  },
  {
    id: 'bookshelf',
    position: new THREE.Vector3(-0.2, 1.2, -4.4),
    cameraOffset: new THREE.Vector3(1.1, 1.1, 0.8),
  },
]

const createLabel = (text: string) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) {
    return null
  }
  const fontSize = 48
  const padding = 24
  context.font = `600 ${fontSize}px "Segoe UI", "Helvetica Neue", Arial, sans-serif`
  const metrics = context.measureText(text)
  canvas.width = Math.ceil(metrics.width + padding * 2)
  canvas.height = Math.ceil(fontSize + padding * 2)
  context.font = `600 ${fontSize}px "Segoe UI", "Helvetica Neue", Arial, sans-serif`
  context.fillStyle = 'rgba(27, 34, 55, 0.9)'
  context.textBaseline = 'middle'
  context.textAlign = 'center'
  context.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(canvas.width / 120, canvas.height / 120, 1)
  return sprite
}

type BallReadyPayload = { mesh: THREE.Mesh; cubeCamera: THREE.CubeCamera } | null
type PlayerReadyPayload = THREE.Mesh | null

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

// Add these to your reactive variables/refs
const velocity = new THREE.Vector3(0, 0, 0);
const friction = 0.92; // How quickly you stop (0.9 to 0.98 is best)
const acceleration = 0.005; // How fast you speed up

const delta = clock.getDelta();
const moveSpeed = 3.0;
const moveDistance = delta * moveSpeed;

// 1. Logic Variables (keep these outside animate)
const direction = new THREE.Vector3(0, 0, 0);

// Timer for periodic updates
let updateTimer = 0;
const updateInterval = 5; // Update every 5 seconds

// Add a rotation speed constant
const rotationSpeed = 1.5;
const walkSpeed = 3.0;

onMounted(async () => {
  if (!container.value) {
    return
  }

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0xe8edf3, 0.08)
  sceneRef.value = scene

  camera = new THREE.PerspectiveCamera(
    55,
    container.value.clientWidth / container.value.clientHeight,
    0.001,
    5000
  )
  camera.position.copy(intro.from)
  camera.lookAt(0, 1.2, 0)

  const roomHeight = 5.2

  const createFloorTexture = () => {
    const canvas = document.createElement('canvas')
    const size = 512
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')
    if (!context) {
      return null
    }
    context.fillStyle = '#f2efe9'
    context.fillRect(0, 0, size, size)

    const plankCount = 8
    const plankHeight = size / plankCount
    for (let i = 0; i < plankCount; i += 1) {
      const y = i * plankHeight
      const shade = i % 2 === 0 ? '#ece7df' : '#f5f2ec'
      context.fillStyle = shade
      context.fillRect(0, y, size, plankHeight)
      context.strokeStyle = 'rgba(120, 110, 98, 0.18)'
      context.lineWidth = 2
      context.beginPath()
      context.moveTo(0, y)
      context.lineTo(size, y)
      context.stroke()
    }

    context.strokeStyle = 'rgba(120, 110, 98, 0.25)'
    context.lineWidth = 3
    for (let i = 0; i < 22; i += 1) {
      const x = (size / 22) * i
      context.beginPath()
      context.moveTo(x, 0)
      context.lineTo(x, size)
      context.stroke()
    }

    for (let i = 0; i < 1200; i += 1) {
      const x = Math.random() * size
      const y = Math.random() * size
      const alpha = 0.05 + Math.random() * 0.08
      context.fillStyle = `rgba(60, 50, 40, ${alpha})`
      context.fillRect(x, y, 1, 1)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(3, 3)
    texture.anisotropy = 6
    return texture
  }

  const floorTexture = createFloorTexture()
  const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth)
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
  scene.add(floor)

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf3e1cf,
    roughness: 0.92,
  })
  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(roomWidth, roomHeight),
    wallMaterial
  )
  backWall.material = wallMaterial.clone()
  if (backWall.material instanceof THREE.MeshStandardMaterial) {
    backWall.material.color.set(0xf5d7c2)
  }
  backWall.position.set(0, roomHeight / 2, -roomDepth / 2)
  backWall.receiveShadow = true
  scene.add(backWall)

  const leftWall = new THREE.Mesh(
    new THREE.PlaneGeometry(roomDepth, roomHeight),
    wallMaterial
  )
  leftWall.material = wallMaterial.clone()
  if (leftWall.material instanceof THREE.MeshStandardMaterial) {
    leftWall.material.color.set(0xf0cdb4)
  }
  leftWall.rotation.y = Math.PI / 2
  leftWall.position.set(-roomWidth / 2, roomHeight / 2, 0)
  leftWall.receiveShadow = true
  scene.add(leftWall)

  const rightWall = new THREE.Mesh(
    new THREE.PlaneGeometry(roomDepth, roomHeight),
    wallMaterial
  )
  rightWall.material = wallMaterial.clone()
  if (rightWall.material instanceof THREE.MeshStandardMaterial) {
    rightWall.material.color.set(0xf6dec8)
  }
  rightWall.rotation.y = -Math.PI / 2
  rightWall.position.set(roomWidth / 2, roomHeight / 2, 0)
  rightWall.receiveShadow = true
  scene.add(rightWall)

  const picture = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.8),
    new THREE.MeshStandardMaterial({
      color: 0x9fc1e5,
      roughness: 0.6,
    })
  )
  picture.position.set(-4.6, 1.6, -4.6)
  picture.rotation.y = Math.PI / 2
  picture.receiveShadow = true
  scene.add(picture)

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)
  gltfLoaderRef.value = gltfLoader

  const shelfLabel = createLabel('Education')
  if (shelfLabel) {
    shelfLabel.position.copy(bookshelfPosition).add(new THREE.Vector3(0, 2.6, 0))
    scene.add(shelfLabel)
  }

  const tableLabel = createLabel('Work')
  if (tableLabel) {
    tableLabel.position.copy(tablePosition).add(new THREE.Vector3(0, 2.0, 0))
    scene.add(tableLabel)
  }

  const chairLabel = createLabel('About me')
  if (chairLabel) {
    chairLabel.position.copy(chairPosition).add(new THREE.Vector3(0, 1.4, 0))
    scene.add(chairLabel)
  }


  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)
  renderer.setClearColor(0x000000, 0)

  resizeHandler = () => {
    if (!container.value || !camera || !renderer) {
      return
    }
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', resizeHandler)

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
      yaw = 0
      pitch = 0
      event.preventDefault()
      return
    }
    if (focus.active && (event.code === 'Escape' || event.code === 'Space')) {
      focus.active = false
      focus.transitioning = false
      event.preventDefault()
      return
    }
    if (event.code === 'Space') {
      if (!hasStarted.value && !isFadingOut.value) {
        isFadingOut.value = true
        intro.active = true
        intro.startTime = performance.now()
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
          const focusOffset = new THREE.Vector3(0, 2.0, 2.4)
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
    if (event.code === 'KeyW') movement.forward = true
    if (event.code === 'KeyS') movement.backward = true
    if (event.code === 'KeyA') movement.left = true
    if (event.code === 'KeyD') movement.right = true
  }

  keyUpHandler = (event: KeyboardEvent) => {
    if (!hasStarted.value) {
      return
    }
    if (event.code === 'KeyW') movement.forward = false
    if (event.code === 'KeyS') movement.backward = false
    if (event.code === 'KeyA') movement.left = false
    if (event.code === 'KeyD') movement.right = false
  }

  // mouseMoveHandler = (event: MouseEvent) => {
  //   if (!isPointerLocked || !camera) {
  //     return
  //   }
  //   const sensitivity = 0.0025
  //   yaw -= event.movementX * sensitivity
  //   pitch -= event.movementY * sensitivity
  //   const maxPitch = Math.PI / 2 - 0.05
  //   pitch = Math.max(-maxPitch, Math.min(maxPitch, pitch))
  //   camera.rotation.set(pitch, yaw, 0, 'YXZ')
  // }

  pointerLockHandler = () => {
    if (!renderer) {
      return
    }
    isPointerLocked = document.pointerLockElement === renderer.domElement
  }

  clickHandler = () => {
    if (!hasStarted.value) {
      return
    }
    renderer?.domElement.requestPointerLock()
  }

  contextMenuHandler = (event: MouseEvent) => {
    event.preventDefault()
  }

  window.addEventListener('keydown', keyDownHandler)
  window.addEventListener('keyup', keyUpHandler)
  // window.addEventListener('mousemove', mouseMoveHandler)
  document.addEventListener('pointerlockchange', pointerLockHandler)
  renderer.domElement.addEventListener('click', clickHandler)
  renderer.domElement.addEventListener('contextmenu', contextMenuHandler)

  renderer.setAnimationLoop(animate)
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
  if (mouseMoveHandler) {
    window.removeEventListener('mousemove', mouseMoveHandler)
  }
  if (pointerLockHandler) {
    document.removeEventListener('pointerlockchange', pointerLockHandler)
  }
  if (clickHandler && renderer) {
    renderer.domElement.removeEventListener('click', clickHandler)
  }
  if (contextMenuHandler && renderer) {
    renderer.domElement.removeEventListener('contextmenu', contextMenuHandler)
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

  // 1. Handle Rotation (A and D keys)
  // Instead of moving left/right, we change the YAW
  if (!focus.active) {
    if (movement.left) {
      yaw += rotationSpeed * delta;
    }
    if (movement.right) {
      yaw -= rotationSpeed * delta;
    }
  }

  // 2. Calculate Forward Direction based on current Yaw
  // In Three.js, -Z is forward. We rotate that vector by our yaw.
  const forwardDir = new THREE.Vector3(0, 0, -1);
  const horizontalRotation = new THREE.Quaternion();
  horizontalRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
  forwardDir.applyQuaternion(horizontalRotation);

  if (playerRig) {
    playerRig.rotation.y = yaw;
    const mesh = playerRig as THREE.Mesh
    if (mesh.material instanceof THREE.MeshStandardMaterial) {
      mesh.material.opacity = focus.active ? 0.35 : 1
    }
  }

  // 3. Handle Movement (W and S keys)
  const moveDelta = new THREE.Vector3(0, 0, 0);
  if (!focus.active) {
    if (movement.forward) {
      moveDelta.add(forwardDir);
    }
    if (movement.backward) {
      moveDelta.sub(forwardDir);
    }
  }

  // Normalize and apply speed
  if (moveDelta.lengthSq() > 0) {
    moveDelta.normalize();
    if (playerRig) {
      playerRig.position.addScaledVector(moveDelta, walkSpeed * delta);
      const halfWidth = roomWidth / 2 - playerRadius
      const halfDepth = roomDepth / 2 - playerRadius
      playerRig.position.x = Math.max(-halfWidth, Math.min(halfWidth, playerRig.position.x))
      playerRig.position.z = Math.max(-halfDepth, Math.min(halfDepth, playerRig.position.z))
    }
  }

  if (playerRig && ballMesh) {
    const toBall = new THREE.Vector3().subVectors(ballMesh.position, playerRig.position)
    const distance = toBall.length()
    const minDistance = playerRadius + ballRadius
    if (distance > 0 && distance < minDistance) {
      const pushDir = toBall.normalize()
      const overlap = minDistance - distance
      ballMesh.position.addScaledVector(pushDir, overlap)
      ballVelocity.addScaledVector(pushDir, 2.2)
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

  if (playerRig && !focus.active) {
    let nearest = ''
    let nearestDist = Infinity
    const playerPos = playerRig.position
    for (const item of interactables) {
      const dist = playerPos.distanceTo(item.position)
      if (dist < 2.2 && dist < nearestDist) {
        nearest = item.id
        nearestDist = dist
      }
    }
    nearbyId.value = nearest
  } else if (focus.active) {
    nearbyId.value = ''
  }

  // 4. Update Camera (intro fly-in then third-person follow)
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
    const offsetRotation = new THREE.Quaternion();
    offsetRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    const targetOffset = followOffset.clone().applyQuaternion(offsetRotation);
    const targetPos = playerRig.position.clone().add(targetOffset);

    if (intro.active) {
      const elapsed = performance.now() - intro.startTime;
      const t = Math.min(Math.max(elapsed / intro.durationMs, 0), 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      camera.position.lerpVectors(intro.from, targetPos, eased);
      camera.lookAt(
        playerRig.position.x,
        playerRig.position.y + 0.6,
        playerRig.position.z
      );
      if (t >= 1) {
        intro.active = false;
        hasStarted.value = true;
        isFadingOut.value = false;
      }
    } else {
      camera.position.copy(targetPos);
      camera.lookAt(
        playerRig.position.x,
        playerRig.position.y + 0.6,
        playerRig.position.z
      );
    }
  } else {
    camera.position.y = cameraHeight;
    camera.rotation.set(pitch, yaw, 0, 'YXZ');
  }

  // 5. Avatar Head (Optional - Head still follows camera)
  if (avatarHead) {
    const headTarget = new THREE.Vector3();
    camera.getWorldPosition(headTarget);
    avatarHead.lookAt(headTarget);
    avatarHead.rotateY(Math.PI);
  }

  if (ballMesh && ballCubeCamera) {
    ballMesh.visible = false
    ballCubeCamera.position.copy(ballMesh.position)
    ballCubeCamera.update(renderer, scene)
    ballMesh.visible = true
  }

  renderer.render(scene, camera);
}
</script>

<template>
  <div class="threejs-stage">
    <div ref="container" class="threejs-canvas"></div>
    <SceneLights v-if="sceneRef" :scene="sceneRef" />
    <BallModel
      v-if="sceneRef"
      :scene="sceneRef"
      :position="ballPosition"
      :radius="ballRadius"
      @ready="handleBallReady"
    />
    <PlayerRig
      v-if="sceneRef"
      :scene="sceneRef"
      :position="playerPosition"
      @ready="handlePlayerReady"
    />
    <TableModel
      v-if="sceneRef && gltfLoaderRef"
      :scene="sceneRef"
      :loader="gltfLoaderRef"
      :position="tablePosition"
      :rotation-y="tableRotationY"
    />
    <BookshelfModel
      v-if="sceneRef && gltfLoaderRef"
      :scene="sceneRef"
      :loader="gltfLoaderRef"
      :position="bookshelfPosition"
    />
    <ChairModel
      v-if="sceneRef && gltfLoaderRef"
      :scene="sceneRef"
      :loader="gltfLoaderRef"
      :position="chairPosition"
    />
    <AvatarModel
      v-if="sceneRef && gltfLoaderRef"
      :scene="sceneRef"
      :loader="gltfLoaderRef"
      :position="avatarPosition"
      :rotation-y="avatarRotationY"
      @head-ready="avatarHead = $event"
    />
    <div v-if="hasStarted" class="threejs-hint">Press Enter to return</div>
    <div v-if="hasStarted && nearbyId && !focus.active" class="threejs-prompt">
      Press Spacebar to view
    </div>
    <div v-if="focus.active" class="threejs-prompt">
      Press Esc to return
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
    <StartOverlay v-if="!hasStarted || isFadingOut" :is-fading-out="isFadingOut" />
  </div>
</template>

<style scoped>
.threejs-stage {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at top, #fdfcf9 0%, #e7ecf3 60%, #dfe5ee 100%);
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
  background: rgba(27, 34, 55, 0.75);
  color: #fdfcf9;
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
  background: rgba(27, 34, 55, 0.8);
  color: #fdfcf9;
  font-size: 15px;
  border-radius: 999px;
  letter-spacing: 0.4px;
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
</style>
