import * as THREE from 'three'
import { segmentIntersectsWall } from './sceneVisuals'

type WallMaterial = THREE.MeshStandardMaterial | null

const backWallCenter = new THREE.Vector3()
const backWallHalf = new THREE.Vector3()
const leftWallCenter = new THREE.Vector3()
const leftWallHalf = new THREE.Vector3()
const rightWallCenter = new THREE.Vector3()
const rightWallHalf = new THREE.Vector3()

export const updateWallOcclusion = (params: {
  camera: THREE.PerspectiveCamera | null
  playerRig: THREE.Object3D | null
  roomWidth: number
  roomDepth: number
  roomHeight: number
  wallThickness: number
  backWallMaterial: WallMaterial
  leftWallMaterial: WallMaterial
  rightWallMaterial: WallMaterial
}) => {
  const {
    camera,
    playerRig,
    roomWidth,
    roomDepth,
    roomHeight,
    wallThickness,
    backWallMaterial,
    leftWallMaterial,
    rightWallMaterial,
  } = params

  if (!camera || !playerRig) return

  backWallCenter.set(0, roomHeight / 2, -roomDepth / 2 - wallThickness / 2)
  backWallHalf.set(roomWidth / 2, roomHeight / 2, wallThickness / 2)
  leftWallCenter.set(-roomWidth / 2 - wallThickness / 2, roomHeight / 2, 0)
  leftWallHalf.set(wallThickness / 2, roomHeight / 2, roomDepth / 2)
  rightWallCenter.set(roomWidth / 2 + wallThickness / 2, roomHeight / 2, 0)
  rightWallHalf.set(wallThickness / 2, roomHeight / 2, roomDepth / 2)

  const start = camera.position
  const end = playerRig.position

  const backHit = segmentIntersectsWall(start, end, backWallCenter, backWallHalf)
  const leftHit = segmentIntersectsWall(start, end, leftWallCenter, leftWallHalf)
  const rightHit = segmentIntersectsWall(start, end, rightWallCenter, rightWallHalf)

  if (backWallMaterial) {
    const backWallZ = backWallCenter.z
    const distanceBehind = backWallZ - playerRig.position.z
    const fadeStart = 0.15
    const fadeEnd = 1.2
    const t = Math.min(Math.max((distanceBehind - fadeStart) / (fadeEnd - fadeStart), 0), 1)
    const behindOpacity = 1 - t * 0.6
    const targetOpacity = Math.min(behindOpacity, backHit ? 0.35 : 1)
    if (Math.abs(backWallMaterial.opacity - targetOpacity) > 0.01) {
      backWallMaterial.opacity = targetOpacity
    }
  }
  if (leftWallMaterial) {
    const targetOpacity = leftHit ? 0.35 : 1
    if (Math.abs(leftWallMaterial.opacity - targetOpacity) > 0.01) {
      leftWallMaterial.opacity = targetOpacity
    }
  }
  if (rightWallMaterial) {
    const targetOpacity = rightHit ? 0.35 : 1
    if (Math.abs(rightWallMaterial.opacity - targetOpacity) > 0.01) {
      rightWallMaterial.opacity = targetOpacity
    }
  }
}
