import * as THREE from 'three'
import { Text } from 'troika-three-text'

type TroikaLabel = Text & {
  color: string
  outlineColor: string
  outlineWidth: number
  fillOpacity?: number
}

type LabelEntry = {
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

export const createLabelManager = () => {
  const labelBillboards: THREE.Object3D[] = []
  const labelRegistry = new Map<string, LabelEntry>()
  let activeLabelId = ''
  let activeLabelBackplate: THREE.MeshStandardMaterial | null = null
  let activeLabelGroup: THREE.Object3D | null = null

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

  const setActive = (id: string) => {
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

  const updatePulse = (timeMs: number) => {
    if (activeLabelBackplate) {
      const pulse = Math.sin(timeMs * 0.004) * 0.15
      activeLabelBackplate.emissiveIntensity = 0.35 + pulse
    }
    if (activeLabelGroup) {
      const scalePulse = 1 + Math.sin(timeMs * 0.004) * 0.015
      activeLabelGroup.scale.setScalar(scalePulse)
    }
  }

  const updateBillboards = (camera: THREE.Camera) => {
    for (const label of labelBillboards) {
      label.quaternion.copy(camera.quaternion)
    }
  }

  return {
    createLabel,
    setActive,
    updatePulse,
    updateBillboards,
  }
}
