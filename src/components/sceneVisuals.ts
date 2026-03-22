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

  // Seeded random for deterministic skybox across renders
  let seed = 42
  const seededRandom = () => {
    seed = (seed * 16807 + 0) % 2147483647
    return (seed - 1) / 2147483646
  }

  if (theme === 'light') {
    // Multi-layered sky gradient with atmospheric depth
    const gradient = ctx.createLinearGradient(0, 0, 0, size)
    gradient.addColorStop(0, '#a8cce8')
    gradient.addColorStop(0.2, '#bdd6f0')
    gradient.addColorStop(0.4, '#d5e3f5')
    gradient.addColorStop(0.6, '#e9eef7')
    gradient.addColorStop(0.8, '#f5ece0')
    gradient.addColorStop(1, '#f7e2c4')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    // Layered cumulus clouds with varying depth and opacity
    for (let layer = 0; layer < 3; layer += 1) {
      const layerAlpha = 0.12 + layer * 0.08
      const layerY = 0.35 + layer * 0.12
      const cloudCount = 14 - layer * 3

      for (let i = 0; i < cloudCount; i += 1) {
        const cx = seededRandom() * size
        const cy = size * (layerY + seededRandom() * 0.15)
        const blobCount = 4 + Math.floor(seededRandom() * 5)

        // Each cloud is composed of overlapping ellipses
        for (let b = 0; b < blobCount; b += 1) {
          const bx = cx + (seededRandom() - 0.5) * size * 0.18
          const by = cy + (seededRandom() - 0.5) * size * 0.025
          const bw = size * (0.06 + seededRandom() * 0.12)
          const bh = size * (0.012 + seededRandom() * 0.02)

          const cloudGrad = ctx.createRadialGradient(bx, by, 0, bx, by, bw)
          cloudGrad.addColorStop(0, `rgba(255, 255, 255, ${layerAlpha + 0.1})`)
          cloudGrad.addColorStop(0.6, `rgba(255, 255, 255, ${layerAlpha})`)
          cloudGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.fillStyle = cloudGrad
          ctx.beginPath()
          ctx.ellipse(bx, by, bw, bh, 0, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Subtle warm haze near the horizon
    const horizonGlow = ctx.createLinearGradient(0, size * 0.75, 0, size)
    horizonGlow.addColorStop(0, 'rgba(247, 220, 180, 0)')
    horizonGlow.addColorStop(0.5, 'rgba(247, 220, 180, 0.1)')
    horizonGlow.addColorStop(1, 'rgba(240, 200, 150, 0.2)')
    ctx.fillStyle = horizonGlow
    ctx.fillRect(0, size * 0.75, size, size * 0.25)
  } else {
    // Multi-layered deep space gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, size)
    gradient.addColorStop(0, '#060814')
    gradient.addColorStop(0.25, '#0a0d1c')
    gradient.addColorStop(0.5, '#0f1126')
    gradient.addColorStop(0.7, '#151730')
    gradient.addColorStop(0.85, '#1a1a35')
    gradient.addColorStop(1, '#211e3a')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    // Distant nebula glow (soft radial blobs)
    const nebulaSpots = [
      { x: 0.2, y: 0.3, r: 0.25, color: [60, 30, 90] },
      { x: 0.7, y: 0.2, r: 0.2, color: [30, 40, 80] },
      { x: 0.5, y: 0.7, r: 0.3, color: [50, 25, 65] },
    ]
    for (const spot of nebulaSpots) {
      const nx = spot.x * size
      const ny = spot.y * size
      const nr = spot.r * size
      const [cr, cg, cb] = spot.color
      const nebulaGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr)
      nebulaGrad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.15)`)
      nebulaGrad.addColorStop(0.5, `rgba(${cr}, ${cg}, ${cb}, 0.06)`)
      nebulaGrad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`)
      ctx.fillStyle = nebulaGrad
      ctx.fillRect(0, 0, size, size)
    }

    // Stars with color variation and brightness layers
    const starColors = [
      [220, 226, 255], // blue-white
      [255, 240, 220], // warm white
      [200, 220, 255], // cool blue
      [255, 210, 200], // pale red
    ]
    const starCount = 1200
    for (let i = 0; i < starCount; i += 1) {
      const x = seededRandom() * size
      const y = seededRandom() * size
      const r = seededRandom() * 1.6 + 0.2
      const alpha = 0.1 + seededRandom() * 0.7
      const colorIdx = Math.floor(seededRandom() * starColors.length)
      const [sr, sg, sb] = starColors[colorIdx]
      ctx.fillStyle = `rgba(${sr}, ${sg}, ${sb}, ${alpha})`
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()

      // Bright star glow for the largest stars
      if (r > 1.2) {
        const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, r * 4)
        glowGrad.addColorStop(0, `rgba(${sr}, ${sg}, ${sb}, ${alpha * 0.3})`)
        glowGrad.addColorStop(1, `rgba(${sr}, ${sg}, ${sb}, 0)`)
        ctx.fillStyle = glowGrad
        ctx.beginPath()
        ctx.arc(x, y, r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Aurora bands near the horizon
    const auroraColors = [
      [40, 200, 160], // teal-green
      [80, 120, 220], // blue-purple
      [120, 60, 180], // violet
    ]
    for (let band = 0; band < 3; band += 1) {
      const bandY = size * (0.7 + band * 0.06)
      const bandH = size * (0.04 + seededRandom() * 0.03)
      const [ar, ag, ab] = auroraColors[band]

      // Wavy aurora using multiple overlapping gradients
      for (let segment = 0; segment < 6; segment += 1) {
        const sx = segment * size / 5 + (seededRandom() - 0.5) * size * 0.1
        const sw = size * (0.25 + seededRandom() * 0.15)
        const auroraGrad = ctx.createRadialGradient(sx, bandY, 0, sx, bandY, sw)
        auroraGrad.addColorStop(0, `rgba(${ar}, ${ag}, ${ab}, 0.08)`)
        auroraGrad.addColorStop(0.5, `rgba(${ar}, ${ag}, ${ab}, 0.04)`)
        auroraGrad.addColorStop(1, `rgba(${ar}, ${ag}, ${ab}, 0)`)
        ctx.fillStyle = auroraGrad
        ctx.beginPath()
        ctx.ellipse(sx, bandY, sw, bandH, 0, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Horizon haze
    const haze = ctx.createLinearGradient(0, size * 0.6, 0, size)
    haze.addColorStop(0, 'rgba(40, 34, 58, 0)')
    haze.addColorStop(0.5, 'rgba(50, 40, 65, 0.15)')
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
