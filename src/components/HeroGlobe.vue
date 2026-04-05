<template>
  <section id="hero" class="hero">
    <div class="hero__container">
      <div class="hero__content">
        <span class="hero__label">{{ personal.title }}</span>
        <h1 class="hero__name">{{ personal.name }}</h1>
        <p class="hero__tagline">
          Building intelligent systems at the intersection of AI and modern
          engineering. Based in Tokyo, solving real-world problems with machine
          learning.
        </p>
        <div class="hero__cta">
          <a
            href="#projects"
            class="hero__btn hero__btn--filled magnetic"
            @click.prevent="smoothScrollTo('projects')"
            @mousemove="onMagMove"
            @mouseleave="onMagLeave"
          >
            View Projects
          </a>
          <a
            href="#contact"
            class="hero__btn hero__btn--outlined magnetic"
            @click.prevent="smoothScrollTo('contact')"
            @mousemove="onMagMove"
            @mouseleave="onMagLeave"
          >
            Get in Touch
          </a>
        </div>
        <div class="hero__socials">
          <a
            :href="personal.links.githubLink"
            target="_blank"
            rel="noopener noreferrer"
            class="hero__social-btn"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a
            :href="personal.links.linkedinLink"
            target="_blank"
            rel="noopener noreferrer"
            class="hero__social-btn"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            :href="personal.links.qiitaLink"
            target="_blank"
            rel="noopener noreferrer"
            class="hero__social-btn"
            aria-label="Qiita"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M8.352 18.12c-2.496 0-4.32-.672-5.472-2.016C1.728 14.76 1.152 12.744 1.152 10.08s.576-4.68 1.728-6.024C4.032 2.712 5.856 2.04 8.352 2.04c1.296 0 2.424.216 3.384.648.96.432 1.704 1.08 2.232 1.944.528.864.792 1.92.792 3.168h-3.36c0-.912-.24-1.608-.72-2.088-.48-.48-1.2-.72-2.16-.72-1.152 0-1.992.384-2.52 1.152-.528.768-.792 2.016-.792 3.744v.384c0 1.728.264 2.976.792 3.744.528.768 1.368 1.152 2.52 1.152.96 0 1.68-.24 2.16-.72.48-.48.72-1.176.72-2.088h3.36c0 1.248-.264 2.304-.792 3.168-.528.864-1.272 1.512-2.232 1.944-.96.432-2.088.648-3.384.648zm10.56-1.2c-.624 0-1.128-.192-1.512-.576-.384-.384-.576-.888-.576-1.512s.192-1.128.576-1.512c.384-.384.888-.576 1.512-.576s1.128.192 1.512.576c.384.384.576.888.576 1.512s-.192 1.128-.576 1.512c-.384.384-.888.576-1.512.576z"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="hero__canvas-wrap" ref="canvasWrap">
        <canvas ref="canvasRef"></canvas>
      </div>
    </div>
    <div class="hero__scroll-indicator">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  BufferGeometry,
  Float32BufferAttribute,
  LineSegments,
  LineBasicMaterial,
  AmbientLight,
  PointLight,
  Vector3,
  Color,
} from 'three'
import personal from '../data/personal'
import { smoothScrollTo } from '../composables/useSmoothScroll'
import { useMagnetic } from '../composables/useMagnetic'

const { onMove: onMagMove, onLeave: onMagLeave } = useMagnetic(0.3)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasWrap = ref<HTMLDivElement | null>(null)

let cleanupFn: (() => void) | null = null

interface NodeData {
  mesh: Mesh
  basePos: Vector3
  phase: Vector3
  speed: Vector3
  isPulse: boolean
  pulsePhase: number
}

onMounted(() => {
  const canvas = canvasRef.value
  const wrap = canvasWrap.value
  if (!canvas || !wrap) return

  const isMobile = window.innerWidth < 768
  const nodeCount = isMobile ? 50 : 100
  const connectionThreshold = isMobile ? 1.8 : 1.5
  const thresholdSq = connectionThreshold * connectionThreshold
  const sphereRadius = 3

  const scene = new Scene()

  const camera = new PerspectiveCamera(50, wrap.clientWidth / wrap.clientHeight, 0.1, 100)
  camera.position.set(0, 0, 7)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(wrap.clientWidth, wrap.clientHeight)

  const ambient = new AmbientLight(0xffffff, 0.6)
  scene.add(ambient)
  const pointLight = new PointLight(0x6366f1, 1.5)
  pointLight.position.set(0, 0, 0)
  scene.add(pointLight)

  const nodes: NodeData[] = []
  const nodeGeo = new SphereGeometry(0.05, 8, 8)
  const nodeMat = new MeshStandardMaterial({
    color: 0x6366f1,
    emissive: 0x6366f1,
    emissiveIntensity: 0.15,
  })

  const pulseIndices = new Set<number>()
  const pulseCount = Math.floor(nodeCount * 0.08)
  while (pulseIndices.size < pulseCount) {
    pulseIndices.add(Math.floor(Math.random() * nodeCount))
  }

  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    const r = sphereRadius * (0.6 + Math.random() * 0.4)

    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)

    const mesh = new Mesh(nodeGeo, nodeMat.clone())
    mesh.position.set(x, y, z)
    scene.add(mesh)

    nodes.push({
      mesh,
      basePos: new Vector3(x, y, z),
      phase: new Vector3(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2),
      speed: new Vector3(0.3 + Math.random() * 0.4, 0.3 + Math.random() * 0.4, 0.3 + Math.random() * 0.4),
      isPulse: pulseIndices.has(i),
      pulsePhase: Math.random() * Math.PI * 2,
    })
  }

  const lineMat = new LineBasicMaterial({
    color: 0xa5b4fc,
    transparent: true,
    opacity: 0.3,
  })
  const lineGeo = new BufferGeometry()
  // Max possible edges in a complete graph: n*(n-1)/2, each edge = 2 vertices * 3 floats
  const maxLineVertices = nodeCount * (nodeCount - 1)
  const lineBuffer = new Float32Array(maxLineVertices * 3)
  lineGeo.setAttribute('position', new Float32BufferAttribute(lineBuffer, 3))
  lineGeo.setDrawRange(0, 0)
  const lines = new LineSegments(lineGeo, lineMat)
  scene.add(lines)

  let groupRotationY = 0
  let disposed = false
  let animationId = 0

  const mouse = { x: 0, y: 0 }
  const currentRotation = { x: 0, y: 0 }

  function onMouseMove(e: MouseEvent) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1
  }

  if (!isMobile) {
    window.addEventListener('mousemove', onMouseMove, { passive: true })
  }

  function onResize() {
    if (!wrap || !renderer) return
    const w = wrap.clientWidth
    const h = wrap.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }

  window.addEventListener('resize', onResize, { passive: true })

  const accentColor = new Color(0x6366f1)
  const brightColor = new Color(0xa5b4fc)
  const maxTilt = (5 * Math.PI) / 180
  const DRIFT = 0.15

  function animate() {
    if (disposed) return
    animationId = requestAnimationFrame(animate)

    const t = performance.now() * 0.001
    groupRotationY += 0.001

    const cosR = Math.cos(groupRotationY)
    const sinR = Math.sin(groupRotationY)

    for (const node of nodes) {
      const dx = Math.sin(t * node.speed.x + node.phase.x) * DRIFT
      const dy = Math.sin(t * node.speed.y + node.phase.y) * DRIFT
      const dz = Math.sin(t * node.speed.z + node.phase.z) * DRIFT

      const bx = node.basePos.x + dx
      const by = node.basePos.y + dy
      const bz = node.basePos.z + dz

      node.mesh.position.x = bx * cosR + bz * sinR
      node.mesh.position.y = by
      node.mesh.position.z = -bx * sinR + bz * cosR

      if (node.isPulse) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + node.pulsePhase)
        node.mesh.scale.setScalar(1 + pulse * 0.8)
        const mat = node.mesh.material as MeshStandardMaterial
        mat.emissiveIntensity = 0.15 + pulse * 0.6
        mat.emissive.lerpColors(accentColor, brightColor, pulse)
      }
    }

    let vertexCount = 0
    for (let i = 0; i < nodes.length; i++) {
      const pi = nodes[i].mesh.position
      for (let j = i + 1; j < nodes.length; j++) {
        const pj = nodes[j].mesh.position
        const ex = pi.x - pj.x
        const ey = pi.y - pj.y
        const ez = pi.z - pj.z
        if (ex * ex + ey * ey + ez * ez < thresholdSq) {
          const off = vertexCount * 3
          lineBuffer[off] = pi.x; lineBuffer[off + 1] = pi.y; lineBuffer[off + 2] = pi.z
          lineBuffer[off + 3] = pj.x; lineBuffer[off + 4] = pj.y; lineBuffer[off + 5] = pj.z
          vertexCount += 2
        }
      }
    }
    lineGeo.setDrawRange(0, vertexCount)
    ;(lineGeo.attributes.position as Float32BufferAttribute).needsUpdate = true

    if (!isMobile) {
      const targetX = -mouse.y * maxTilt
      const targetY = mouse.x * maxTilt
      currentRotation.x += (targetX - currentRotation.x) * 0.05
      currentRotation.y += (targetY - currentRotation.y) * 0.05
      scene.rotation.x = currentRotation.x
      scene.rotation.y = currentRotation.y
    }

    renderer.render(scene, camera)
  }

  animate()

  cleanupFn = () => {
    disposed = true
    cancelAnimationFrame(animationId)

    if (!isMobile) {
      window.removeEventListener('mousemove', onMouseMove)
    }
    window.removeEventListener('resize', onResize)

    nodes.forEach((node) => {
      node.mesh.geometry.dispose()
      ;(node.mesh.material as MeshStandardMaterial).dispose()
    })
    nodeGeo.dispose()
    nodeMat.dispose()
    lineGeo.dispose()
    lineMat.dispose()

    renderer.dispose()
  }
})

onBeforeUnmount(() => {
  cleanupFn?.()
})
</script>

<style scoped>
.hero {
  height: 100vh;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.hero__container {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
  width: 100%;
  gap: var(--space-8);
}

.hero__content {
  flex: 1;
  min-width: 0;
}

.hero__label {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.hero__name {
  font-size: var(--text-6xl);
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.1;
  margin-bottom: var(--space-4);
}

.hero__tagline {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: var(--space-8);
}

.hero__cta {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: 600;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out),
              background var(--duration-fast) var(--ease-out);
  cursor: pointer;
}

.hero__btn:hover {
  transform: translateY(-1px);
}

.hero__btn--filled {
  background: var(--color-accent);
  color: #fff;
}

.hero__btn--filled:hover {
  background: #4f46e5;
  box-shadow: var(--shadow-md);
  color: #fff;
}

.hero__btn--outlined {
  background: transparent;
  color: var(--color-accent);
  border: 2px solid var(--color-accent);
}

.hero__btn--outlined:hover {
  background: var(--color-accent-bg);
}

.hero__socials {
  display: flex;
  gap: var(--space-3);
}

.hero__social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  transition: color var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              background var(--duration-fast) var(--ease-out);
}

.hero__social-btn:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  background: var(--color-accent-bg);
}

.hero__canvas-wrap {
  flex: 1;
  min-width: 0;
  height: 100%;
  position: relative;
}

.hero__canvas-wrap canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.hero__scroll-indicator {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  color: var(--color-text-tertiary);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-8px);
  }
  60% {
    transform: translateX(-50%) translateY(-4px);
  }
}

@media (max-width: 768px) {
  .hero__container {
    flex-direction: column-reverse;
    padding-top: var(--space-4);
  }

  .hero__canvas-wrap {
    width: 100%;
    height: 50vh;
    flex: none;
  }

  .hero__content {
    text-align: center;
    flex: none;
  }

  .hero__name {
    font-size: var(--text-4xl);
  }

  .hero__tagline {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .hero__cta {
    justify-content: center;
  }

  .hero__socials {
    justify-content: center;
  }
}
</style>
