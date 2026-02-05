import * as THREE from 'three'

/**
 * Expanded World Layout: "Inside Adrian's Mind"
 *
 * A journey through interconnected zones representing different facets of identity
 * Total world size: ~150x150 units
 */

// ==========================================
// WORLD STRUCTURE
// ==========================================

// Hub Nexus (Center) - Entry point and navigation hub
const hubCenter = new THREE.Vector3(0, 0, 0)
const hubRadius = 20

// Technical Zone (West) - Skills and expertise showcase
const technicalCenter = new THREE.Vector3(-60, 0, 0)
const technicalSize = { width: 40, depth: 30, height: 8 }

// Creative Studio (East) - Projects and innovations
const creativeCenter = new THREE.Vector3(60, 0, 0)
const creativeSize = { width: 35, depth: 35, height: 10 }

// Personal Core (South) - Identity and values
const personalCenter = new THREE.Vector3(0, 0, 60)
const personalSize = { width: 25, depth: 25, height: 6 }

// Future Vision (North) - Aspirations and learning
const futureCenter = new THREE.Vector3(0, 0, -60)
const futureSize = { width: 30, depth: 30, height: 12 }

// ==========================================
// PORTAL SYSTEM
// ==========================================

export interface Portal {
  id: string
  fromZone: string
  toZone: string
  position: THREE.Vector3
  rotation: number
  radius: number
  color: string
  label: string
}

export const portals: Portal[] = [
  // Hub to Technical
  {
    id: 'hub-to-technical',
    fromZone: 'hub',
    toZone: 'technical',
    position: new THREE.Vector3(-hubRadius, 0, 0),
    rotation: -Math.PI / 2,
    radius: 2.5,
    color: '#00d4ff', // Cyan
    label: 'Technical Zone',
  },
  // Hub to Creative
  {
    id: 'hub-to-creative',
    fromZone: 'hub',
    toZone: 'creative',
    position: new THREE.Vector3(hubRadius, 0, 0),
    rotation: Math.PI / 2,
    radius: 2.5,
    color: '#ff9500', // Orange
    label: 'Creative Studio',
  },
  // Hub to Personal
  {
    id: 'hub-to-personal',
    fromZone: 'hub',
    toZone: 'personal',
    position: new THREE.Vector3(0, 0, hubRadius),
    rotation: Math.PI,
    radius: 2.5,
    color: '#00ff88', // Green
    label: 'Personal Core',
  },
  // Hub to Future
  {
    id: 'hub-to-future',
    fromZone: 'hub',
    toZone: 'future',
    position: new THREE.Vector3(0, 0, -hubRadius),
    rotation: 0,
    radius: 2.5,
    color: '#ff00ff', // Magenta
    label: 'Future Vision',
  },
  // Return portals from zones back to hub
  {
    id: 'technical-to-hub',
    fromZone: 'technical',
    toZone: 'hub',
    position: new THREE.Vector3(
      technicalCenter.x + technicalSize.width / 2 - 3,
      0,
      technicalCenter.z
    ),
    rotation: Math.PI / 2,
    radius: 2.0,
    color: '#a78bfa', // Purple
    label: 'Return to Hub',
  },
  {
    id: 'creative-to-hub',
    fromZone: 'creative',
    toZone: 'hub',
    position: new THREE.Vector3(
      creativeCenter.x - creativeSize.width / 2 + 3,
      0,
      creativeCenter.z
    ),
    rotation: -Math.PI / 2,
    radius: 2.0,
    color: '#a78bfa',
    label: 'Return to Hub',
  },
  {
    id: 'personal-to-hub',
    fromZone: 'personal',
    toZone: 'hub',
    position: new THREE.Vector3(
      personalCenter.x,
      0,
      personalCenter.z - personalSize.depth / 2 + 3
    ),
    rotation: 0,
    radius: 2.0,
    color: '#a78bfa',
    label: 'Return to Hub',
  },
  {
    id: 'future-to-hub',
    fromZone: 'future',
    toZone: 'hub',
    position: new THREE.Vector3(
      futureCenter.x,
      0,
      futureCenter.z + futureSize.depth / 2 - 3
    ),
    rotation: Math.PI,
    radius: 2.0,
    color: '#a78bfa',
    label: 'Return to Hub',
  },
]

// ==========================================
// ZONE DEFINITIONS
// ==========================================

export interface Zone {
  id: string
  name: string
  description: string
  center: THREE.Vector3
  size: { width: number; depth: number; height: number }
  color: string
  spawnPoint: THREE.Vector3
  boundingBox: {
    min: THREE.Vector3
    max: THREE.Vector3
  }
}

export const zones: Zone[] = [
  {
    id: 'hub',
    name: 'Hub Nexus',
    description: 'The center of my mind - where all paths converge',
    center: hubCenter,
    size: { width: hubRadius * 2, depth: hubRadius * 2, height: 6 },
    color: '#a78bfa', // Purple
    spawnPoint: new THREE.Vector3(0, 0, 5),
    boundingBox: {
      min: new THREE.Vector3(-hubRadius, 0, -hubRadius),
      max: new THREE.Vector3(hubRadius, 6, hubRadius),
    },
  },
  {
    id: 'technical',
    name: 'Technical Zone',
    description: 'The data center of skills and expertise',
    center: technicalCenter,
    size: technicalSize,
    color: '#00d4ff', // Cyan
    spawnPoint: new THREE.Vector3(
      technicalCenter.x + 15,
      0,
      technicalCenter.z
    ),
    boundingBox: {
      min: new THREE.Vector3(
        technicalCenter.x - technicalSize.width / 2,
        0,
        technicalCenter.z - technicalSize.depth / 2
      ),
      max: new THREE.Vector3(
        technicalCenter.x + technicalSize.width / 2,
        technicalSize.height,
        technicalCenter.z + technicalSize.depth / 2
      ),
    },
  },
  {
    id: 'creative',
    name: 'Creative Studio',
    description: 'The workshop where ideas become reality',
    center: creativeCenter,
    size: creativeSize,
    color: '#ff9500', // Orange
    spawnPoint: new THREE.Vector3(
      creativeCenter.x - 15,
      0,
      creativeCenter.z
    ),
    boundingBox: {
      min: new THREE.Vector3(
        creativeCenter.x - creativeSize.width / 2,
        0,
        creativeCenter.z - creativeSize.depth / 2
      ),
      max: new THREE.Vector3(
        creativeCenter.x + creativeSize.width / 2,
        creativeSize.height,
        creativeCenter.z + creativeSize.depth / 2
      ),
    },
  },
  {
    id: 'personal',
    name: 'Personal Core',
    description: 'The heart space - who I really am',
    center: personalCenter,
    size: personalSize,
    color: '#00ff88', // Green
    spawnPoint: new THREE.Vector3(
      personalCenter.x,
      0,
      personalCenter.z - 10
    ),
    boundingBox: {
      min: new THREE.Vector3(
        personalCenter.x - personalSize.width / 2,
        0,
        personalCenter.z - personalSize.depth / 2
      ),
      max: new THREE.Vector3(
        personalCenter.x + personalSize.width / 2,
        personalSize.height,
        personalCenter.z + personalSize.depth / 2
      ),
    },
  },
  {
    id: 'future',
    name: 'Future Vision',
    description: 'The observatory - what comes next',
    center: futureCenter,
    size: futureSize,
    color: '#ff00ff', // Magenta
    spawnPoint: new THREE.Vector3(
      futureCenter.x,
      0,
      futureCenter.z + 10
    ),
    boundingBox: {
      min: new THREE.Vector3(
        futureCenter.x - futureSize.width / 2,
        0,
        futureCenter.z - futureSize.depth / 2
      ),
      max: new THREE.Vector3(
        futureCenter.x + futureSize.width / 2,
        futureSize.height,
        futureCenter.z + futureSize.depth / 2
      ),
    },
  },
]

// ==========================================
// NEURAL PATHWAYS (Visual connections)
// ==========================================

export interface NeuralPath {
  from: THREE.Vector3
  to: THREE.Vector3
  color: string
  width: number
}

export const neuralPathways: NeuralPath[] = [
  // Hub to Technical
  {
    from: new THREE.Vector3(-hubRadius, 0, 0),
    to: new THREE.Vector3(technicalCenter.x + technicalSize.width / 2, 0, 0),
    color: '#00d4ff',
    width: 0.5,
  },
  // Hub to Creative
  {
    from: new THREE.Vector3(hubRadius, 0, 0),
    to: new THREE.Vector3(creativeCenter.x - creativeSize.width / 2, 0, 0),
    color: '#ff9500',
    width: 0.5,
  },
  // Hub to Personal
  {
    from: new THREE.Vector3(0, 0, hubRadius),
    to: new THREE.Vector3(0, 0, personalCenter.z - personalSize.depth / 2),
    color: '#00ff88',
    width: 0.5,
  },
  // Hub to Future
  {
    from: new THREE.Vector3(0, 0, -hubRadius),
    to: new THREE.Vector3(0, 0, futureCenter.z + futureSize.depth / 2),
    color: '#ff00ff',
    width: 0.5,
  },
]

// ==========================================
// INTERACTABLES PER ZONE
// ==========================================

export interface Interactable {
  id: string
  zone: string
  type: 'info' | 'portal' | 'interactive' | 'showcase'
  position: THREE.Vector3
  label: string
  triggerRadius: number
  action?: string
}

export const interactables: Interactable[] = [
  // Hub Nexus interactables
  {
    id: 'hub-welcome',
    zone: 'hub',
    type: 'info',
    position: new THREE.Vector3(0, 0, 0),
    label: 'Welcome',
    triggerRadius: 3.0,
  },

  // Technical Zone interactables
  {
    id: 'tech-skills-wall',
    zone: 'technical',
    type: 'showcase',
    position: new THREE.Vector3(technicalCenter.x - 15, 0, technicalCenter.z - 10),
    label: 'Skills Matrix',
    triggerRadius: 3.0,
  },
  {
    id: 'tech-code-samples',
    zone: 'technical',
    type: 'interactive',
    position: new THREE.Vector3(technicalCenter.x + 10, 0, technicalCenter.z),
    label: 'Code Gallery',
    triggerRadius: 3.0,
  },
  {
    id: 'tech-architecture',
    zone: 'technical',
    type: 'showcase',
    position: new THREE.Vector3(technicalCenter.x, 0, technicalCenter.z + 10),
    label: 'System Architecture',
    triggerRadius: 3.0,
  },

  // Creative Studio interactables
  {
    id: 'creative-projects',
    zone: 'creative',
    type: 'showcase',
    position: new THREE.Vector3(creativeCenter.x, 0, creativeCenter.z),
    label: 'Project Gallery',
    triggerRadius: 4.0,
  },
  {
    id: 'creative-workbench',
    zone: 'creative',
    type: 'interactive',
    position: new THREE.Vector3(creativeCenter.x + 12, 0, creativeCenter.z + 12),
    label: 'Prototype Bench',
    triggerRadius: 3.0,
  },

  // Personal Core interactables
  {
    id: 'personal-manifesto',
    zone: 'personal',
    type: 'info',
    position: new THREE.Vector3(personalCenter.x, 0, personalCenter.z),
    label: 'My Philosophy',
    triggerRadius: 3.0,
  },
  {
    id: 'personal-values',
    zone: 'personal',
    type: 'showcase',
    position: new THREE.Vector3(personalCenter.x + 8, 0, personalCenter.z + 8),
    label: 'Core Values',
    triggerRadius: 3.0,
  },

  // Future Vision interactables
  {
    id: 'future-telescope',
    zone: 'future',
    type: 'interactive',
    position: new THREE.Vector3(futureCenter.x, 0, futureCenter.z),
    label: 'Vision Telescope',
    triggerRadius: 3.5,
  },
  {
    id: 'future-learning',
    zone: 'future',
    type: 'showcase',
    position: new THREE.Vector3(futureCenter.x - 10, 0, futureCenter.z - 10),
    label: 'Learning Queue',
    triggerRadius: 3.0,
  },
]

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get zone by ID
 */
export function getZone(zoneId: string): Zone | undefined {
  return zones.find(z => z.id === zoneId)
}

/**
 * Get current zone based on position
 */
export function getCurrentZone(position: THREE.Vector3): Zone | null {
  for (const zone of zones) {
    const { min, max } = zone.boundingBox
    if (
      position.x >= min.x && position.x <= max.x &&
      position.z >= min.z && position.z <= max.z
    ) {
      return zone
    }
  }
  return null
}

/**
 * Get portals in a zone
 */
export function getPortalsInZone(zoneId: string): Portal[] {
  return portals.filter(p => p.fromZone === zoneId)
}

/**
 * Get interactables in a zone
 */
export function getInteractablesInZone(zoneId: string): Interactable[] {
  return interactables.filter(i => i.zone === zoneId)
}

/**
 * Calculate distance to nearest portal
 */
export function getNearestPortal(position: THREE.Vector3, currentZone: string): Portal | null {
  const zonePortals = getPortalsInZone(currentZone)
  let nearest: Portal | null = null
  let minDistance = Infinity

  for (const portal of zonePortals) {
    const distance = position.distanceTo(portal.position)
    if (distance < minDistance) {
      minDistance = distance
      nearest = portal
    }
  }

  return nearest
}

// ==========================================
// EXPORT CONFIGURATION
// ==========================================

export const expandedWorld = {
  zones,
  portals,
  neuralPathways,
  interactables,
  hubCenter,
  hubRadius,
  worldBounds: {
    min: new THREE.Vector3(-100, 0, -100),
    max: new THREE.Vector3(100, 20, 100),
  },
  // Keep original movement settings
  playerRadius: 0.4,
  movement: {
    walkSpeed: 3.5, // Slightly faster for larger world
    runSpeed: 7.0,
    moveAcceleration: 6,
    moveDamping: 12,
    rotationSmoothing: 8,
    mouseSensitivity: 0.0024,
    cameraPitchLimits: { min: -0.2, max: 0.55 },
    zoomLimits: { min: 0.6, max: 1.6 },
    zoomSensitivity: 0.0015,
  },
}
