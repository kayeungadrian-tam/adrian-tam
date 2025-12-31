import { ref } from 'vue'
import * as THREE from 'three'

export type PlayerMovementConfig = {
  walkSpeed: number
  runSpeed: number
  moveAcceleration: number
  moveDamping: number
  rotationSmoothing: number
  cameraPitchLimits: { min: number; max: number }
  mouseSensitivity: number
  zoomLimits: { min: number; max: number }
  zoomSensitivity: number
  initialYaw: number
  initialOrbitYaw: number
  initialOrbitPitch: number
  getHasStarted: () => boolean
  isFocusActive: () => boolean
}

export type PlayerMovementState = {
  cameraOrbitYaw: number
  cameraOrbitPitch: number
  cameraZoom: number
  currentYaw: number
  moveVelocity: THREE.Vector3
}

export type UpdateMovementArgs = {
  delta: number
  playerRig: THREE.Object3D | null
  focusActive: boolean
  roomWidth: number
  roomDepth: number
  wallColliders?: Array<{
    center: THREE.Vector3
    halfSize: THREE.Vector3
  }>
  playerRadius: number
  setPlayerAnimation: (state: 'idle' | 'walk' | 'run') => void
}

export const createPlayerMovement = (config: PlayerMovementConfig) => {
  const movement = {
    forward: false,
    backward: false,
    left: false,
    right: false,
  }
  const sprintKey = ref(false)
  const state: PlayerMovementState = {
    cameraOrbitYaw: config.initialOrbitYaw,
    cameraOrbitPitch: config.initialOrbitPitch,
    cameraZoom: 1,
    currentYaw: config.initialYaw,
    moveVelocity: new THREE.Vector3(),
  }
  let isPointerDown = false

  const resetState = () => {
    movement.forward = false
    movement.backward = false
    movement.left = false
    movement.right = false
    sprintKey.value = false
    state.moveVelocity.set(0, 0, 0)
    state.currentYaw = config.initialYaw
    state.cameraOrbitYaw = config.initialOrbitYaw
    state.cameraOrbitPitch = config.initialOrbitPitch
    state.cameraZoom = 1
  }

  const handlePointerDown = (event: MouseEvent) => {
    if (event.button !== 0) return
    isPointerDown = true
  }

  const handlePointerUp = () => {
    isPointerDown = false
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!config.getHasStarted() || config.isFocusActive() || !isPointerDown) {
      return
    }
    state.cameraOrbitYaw -= event.movementX * config.mouseSensitivity
    state.cameraOrbitPitch -= event.movementY * config.mouseSensitivity
    state.cameraOrbitPitch = Math.max(
      config.cameraPitchLimits.min,
      Math.min(config.cameraPitchLimits.max, state.cameraOrbitPitch)
    )
  }

  const handleWheel = (event: WheelEvent) => {
    if (!config.getHasStarted() || config.isFocusActive()) {
      return
    }
    event.preventDefault()
    state.cameraZoom += event.deltaY * config.zoomSensitivity
    state.cameraZoom = Math.max(
      config.zoomLimits.min,
      Math.min(config.zoomLimits.max, state.cameraZoom)
    )
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'KeyS') movement.forward = true
    if (event.code === 'KeyW') movement.backward = true
    if (event.code === 'KeyA') movement.left = true
    if (event.code === 'KeyD') movement.right = true
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') sprintKey.value = true
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === 'KeyS') movement.forward = false
    if (event.code === 'KeyW') movement.backward = false
    if (event.code === 'KeyA') movement.left = false
    if (event.code === 'KeyD') movement.right = false
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') sprintKey.value = false
  }

  const updateMovement = (args: UpdateMovementArgs) => {
    const { playerRig, focusActive, delta, roomWidth, roomDepth, playerRadius } = args
    if (!playerRig) {
      return
    }
    if (focusActive) {
      state.moveVelocity.set(0, 0, 0)
      args.setPlayerAnimation('idle')
      return
    }

    let forwardInput = 0
    let strafeInput = 0

    if (movement.forward) forwardInput += 1
    if (movement.backward) forwardInput -= 1
    if (movement.left) strafeInput -= 1
    if (movement.right) strafeInput += 1

    const isMoving = forwardInput !== 0 || strafeInput !== 0

    if (isMoving) {
      state.cameraOrbitYaw = config.initialOrbitYaw
      state.cameraOrbitPitch = config.initialOrbitPitch

      const moveDir = new THREE.Vector3(strafeInput, 0, forwardInput)
      if (moveDir.lengthSq() > 0) {
        moveDir.normalize()
      }
      const desiredYaw = Math.atan2(moveDir.x, moveDir.z)
      let yawDiff = desiredYaw - state.currentYaw
      while (yawDiff > Math.PI) yawDiff -= Math.PI * 2
      while (yawDiff < -Math.PI) yawDiff += Math.PI * 2
      state.currentYaw += yawDiff * config.rotationSmoothing * delta

      const currentSpeed = sprintKey.value ? config.runSpeed : config.walkSpeed
      const targetVelocity = moveDir.multiplyScalar(currentSpeed)

      state.moveVelocity.lerp(targetVelocity, config.moveAcceleration * delta)
      args.setPlayerAnimation(sprintKey.value ? 'run' : 'walk')
    } else {
      state.moveVelocity.multiplyScalar(Math.exp(-config.moveDamping * delta))
      if (state.moveVelocity.length() < 0.01) {
        state.moveVelocity.set(0, 0, 0)
      }
      args.setPlayerAnimation('idle')
    }

    playerRig.rotation.y = state.currentYaw

    if (state.moveVelocity.lengthSq() > 0) {
      playerRig.position.addScaledVector(state.moveVelocity, delta)

      const halfWidth = roomWidth / 2 - playerRadius
      const halfDepth = roomDepth / 2 - playerRadius
      playerRig.position.x = Math.max(-halfWidth, Math.min(halfWidth, playerRig.position.x))
      playerRig.position.z = Math.max(-halfDepth, Math.min(halfDepth, playerRig.position.z))

      if (args.wallColliders && args.wallColliders.length > 0) {
        for (const wall of args.wallColliders) {
          const dx = playerRig.position.x - wall.center.x
          const dz = playerRig.position.z - wall.center.z
          const overlapX = wall.halfSize.x + playerRadius - Math.abs(dx)
          const overlapZ = wall.halfSize.z + playerRadius - Math.abs(dz)
          if (overlapX > 0 && overlapZ > 0) {
            if (overlapX < overlapZ) {
              playerRig.position.x += dx > 0 ? overlapX : -overlapX
            } else {
              playerRig.position.z += dz > 0 ? overlapZ : -overlapZ
            }
          }
        }
      }
    }
  }

  return {
    movement,
    sprintKey,
    state,
    resetState,
    handlePointerDown,
    handlePointerUp,
    handleMouseMove,
    handleWheel,
    handleKeyDown,
    handleKeyUp,
    updateMovement,
  }
}
