import * as THREE from 'three'

export const createSpotlightCone = (theme: 'dark' | 'light') => {
  const spotPosition = new THREE.Vector3(0.6, 5.5, 0)
  const spotDistance = 5.5
  const spotAngle = THREE.MathUtils.degToRad(30)

  const radius = Math.tan(spotAngle) * spotDistance
  const geometry = new THREE.ConeGeometry(radius, spotDistance, 32, 1, true)
  geometry.translate(0, -spotDistance / 2, 0)

  const material = new THREE.MeshBasicMaterial({
    color: theme === 'dark' ? 0xFFF9D6 : 0xFAE987,
    transparent: true,
    opacity: theme === 'dark' ? 0.15 : 0.06,
    side: THREE.DoubleSide,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.copy(spotPosition)
  mesh.renderOrder = 1

  return { mesh, material }
}

export const createSkyboxTexture = (theme: 'dark' | 'light') => {
  const size = 2048
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  if (theme === 'light') {
    const gradient = ctx.createLinearGradient(0, 0, 0, size)
    gradient.addColorStop(0, '#cfe0f6')
    gradient.addColorStop(0.55, '#e9eef7')
    gradient.addColorStop(1, '#f7e9d2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

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

    const haze = ctx.createLinearGradient(0, size * 0.6, 0, size)
    haze.addColorStop(0, 'rgba(40, 34, 58, 0)')
    haze.addColorStop(1, 'rgba(62, 48, 72, 0.35)')
    ctx.fillStyle = haze
    ctx.fillRect(0, size * 0.6, size, size * 0.4)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export const segmentIntersectsWall = (
  start: THREE.Vector3,
  end: THREE.Vector3,
  center: THREE.Vector3,
  halfSize: THREE.Vector3
) => {
  const dirX = end.x - start.x
  const dirZ = end.z - start.z
  let tMin = 0
  let tMax = 1

  const checkAxis = (startVal: number, dir: number, min: number, max: number) => {
    if (Math.abs(dir) < 1e-6) {
      return !(startVal < min || startVal > max)
    }
    const inv = 1 / dir
    let t1 = (min - startVal) * inv
    let t2 = (max - startVal) * inv
    if (t1 > t2) {
      const tmp = t1
      t1 = t2
      t2 = tmp
    }
    tMin = Math.max(tMin, t1)
    tMax = Math.min(tMax, t2)
    return tMax >= tMin
  }

  const minX = center.x - halfSize.x
  const maxX = center.x + halfSize.x
  const minZ = center.z - halfSize.z
  const maxZ = center.z + halfSize.z

  return checkAxis(start.x, dirX, minX, maxX) && checkAxis(start.z, dirZ, minZ, maxZ)
}

export const createGraffiti = (text: string) => {
  const group = new THREE.Group()
  const size = 1240
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return group
  }

  ctx.clearRect(0, 0, size, size)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillStyle = 'rgba(240, 240, 245, 0.06)'
  for (let i = 0; i < 2000; i += 1) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = Math.random() * 1.6
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.font = '600 86px "IBM Plex Sans", sans-serif'
  ctx.fillStyle = '#f2efe9'
  ctx.strokeStyle = 'rgba(250, 248, 244, 0.7)'
  ctx.lineWidth = 4
  for (let i = 0; i < 4; i += 1) {
    const jitterX = (Math.random() - 0.5) * 2
    const jitterY = (Math.random() - 0.5) * 2
    ctx.fillText(text, size / 2 + jitterX, size * 0.46 + jitterY)
    ctx.strokeText(text, size / 2 + jitterX, size * 0.46 + jitterY)
  }

  ctx.strokeStyle = 'rgba(236, 232, 225, 0.6)'
  ctx.lineWidth = 12
  ctx.beginPath()
  ctx.moveTo(size * 0.18, size * 0.57)
  ctx.lineTo(size * 0.82, size * 0.57)
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(4.6, 1.4),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
    })
  )
  plane.renderOrder = 2

  group.add(plane)
  return group
}
