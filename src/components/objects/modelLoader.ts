import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export type ModelLoadOptions = {
  loader: GLTFLoader
  url: string
  position: THREE.Vector3
  rotationY?: number
  targetHeight: number
  applyShadows?: boolean
}

export const applyShadowProps = (object: THREE.Object3D) => {
  object.traverse((node: THREE.Object3D) => {
    if ((node as THREE.Mesh).isMesh) {
      node.castShadow = true
      node.receiveShadow = true
    }
  })
}

export const disposeModel = (object: THREE.Object3D) => {
  object.traverse((node: THREE.Object3D) => {
    if ((node as THREE.Mesh).isMesh) {
      const mesh = node as THREE.Mesh
      if (mesh.geometry) {
        mesh.geometry.dispose()
      }
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material: THREE.Material) => material.dispose())
      } else if (mesh.material) {
        mesh.material.dispose()
      }
    }
  })
}

export const loadScaledModel = async (options: ModelLoadOptions) => {
  const gltf = await options.loader.loadAsync(options.url)
  const box = new THREE.Box3().setFromObject(gltf.scene)
  const size = new THREE.Vector3()
  const center = new THREE.Vector3()
  box.getSize(size)
  box.getCenter(center)
  const scale = size.y > 0 ? options.targetHeight / size.y : 1
  gltf.scene.scale.setScalar(scale)
  gltf.scene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale)
  gltf.scene.position.add(options.position)
  gltf.scene.rotation.y = options.rotationY ?? 0
  if (options.applyShadows !== false) {
    applyShadowProps(gltf.scene)
  }
  return gltf.scene
}
