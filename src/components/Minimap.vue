<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { zones, getCurrentZone, type Zone } from '../config/expandedWorld'
import * as THREE from 'three'

interface Props {
  playerPosition: THREE.Vector3 | null
  theme: 'dark' | 'light'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'teleport', zoneId: string): void
}>()

const currentZone = ref<Zone | null>(null)
const visitedZones = ref<Set<string>>(new Set(['hub'])) // Start with hub visited
const minimapSize = 200
const worldScale = 0.8 // Scale down world for minimap

// Calculate minimap bounds
const worldBounds = {
  minX: -100,
  maxX: 100,
  minZ: -100,
  maxZ: 100,
}
const worldWidth = worldBounds.maxX - worldBounds.minX
const worldDepth = worldBounds.maxZ - worldBounds.minZ

/**
 * Convert world position to minimap coordinates
 */
function worldToMinimap(worldPos: THREE.Vector3): { x: number; y: number } {
  const normalizedX = (worldPos.x - worldBounds.minX) / worldWidth
  const normalizedZ = (worldPos.z - worldBounds.minZ) / worldDepth

  return {
    x: normalizedX * minimapSize * worldScale + minimapSize * (1 - worldScale) / 2,
    y: normalizedZ * minimapSize * worldScale + minimapSize * (1 - worldScale) / 2,
  }
}

/**
 * Get minimap position for a zone
 */
function getZoneMinimapPos(zone: Zone): { x: number; y: number; width: number; height: number } {
  const topLeft = worldToMinimap(
    new THREE.Vector3(
      zone.center.x - zone.size.width / 2,
      0,
      zone.center.z - zone.size.depth / 2
    )
  )
  const bottomRight = worldToMinimap(
    new THREE.Vector3(
      zone.center.x + zone.size.width / 2,
      0,
      zone.center.z + zone.size.depth / 2
    )
  )

  return {
    x: topLeft.x,
    y: topLeft.y,
    width: bottomRight.x - topLeft.x,
    height: bottomRight.y - topLeft.y,
  }
}

/**
 * Get player minimap position
 */
const playerMinimapPos = computed(() => {
  if (!props.playerPosition) return { x: minimapSize / 2, y: minimapSize / 2 }
  return worldToMinimap(props.playerPosition)
})

// Watch player position to update current zone
watch(() => props.playerPosition, (newPos) => {
  if (!newPos) return

  const zone = getCurrentZone(newPos)
  if (zone) {
    currentZone.value = zone
    visitedZones.value.add(zone.id)
  }
}, { deep: true })

/**
 * Handle zone click for fast travel
 */
function handleZoneClick(zone: Zone) {
  if (visitedZones.value.has(zone.id)) {
    emit('teleport', zone.id)
  }
}

/**
 * Check if zone is visited
 */
function isVisited(zoneId: string): boolean {
  return visitedZones.value.has(zoneId)
}

/**
 * Check if zone is current
 */
function isCurrent(zoneId: string): boolean {
  return currentZone.value?.id === zoneId
}
</script>

<template>
  <div class="minimap" :class="{ 'minimap--dark': theme === 'dark', 'minimap--light': theme === 'light' }">
    <div class="minimap__title">World Map</div>
    <svg
      class="minimap__svg"
      :width="minimapSize"
      :height="minimapSize"
      viewBox="0 0 200 200"
    >
      <!-- Background -->
      <rect class="minimap__bg" x="0" y="0" width="200" height="200" />

      <!-- Zones -->
      <g
        v-for="zone in zones"
        :key="zone.id"
        class="minimap__zone"
        :class="{
          'minimap__zone--visited': isVisited(zone.id),
          'minimap__zone--current': isCurrent(zone.id),
          'minimap__zone--unvisited': !isVisited(zone.id)
        }"
        @click="handleZoneClick(zone)"
      >
        <rect
          :x="getZoneMinimapPos(zone).x"
          :y="getZoneMinimapPos(zone).y"
          :width="getZoneMinimapPos(zone).width"
          :height="getZoneMinimapPos(zone).height"
          :fill="zone.color"
          :opacity="isVisited(zone.id) ? 0.6 : 0.2"
          stroke="currentColor"
          :stroke-width="isCurrent(zone.id) ? 2 : 1"
        />
        <text
          :x="getZoneMinimapPos(zone).x + getZoneMinimapPos(zone).width / 2"
          :y="getZoneMinimapPos(zone).y + getZoneMinimapPos(zone).height / 2"
          text-anchor="middle"
          dominant-baseline="middle"
          class="minimap__zone-label"
          :opacity="isVisited(zone.id) ? 1 : 0.4"
        >
          {{ zone.name.split(' ')[0] }}
        </text>
      </g>

      <!-- Connections (neural pathways) -->
      <g class="minimap__connections">
        <!-- Hub to Technical -->
        <line
          :x1="worldToMinimap(new THREE.Vector3(0, 0, 0)).x"
          :y1="worldToMinimap(new THREE.Vector3(0, 0, 0)).y"
          :x2="worldToMinimap(new THREE.Vector3(-60, 0, 0)).x"
          :y2="worldToMinimap(new THREE.Vector3(-60, 0, 0)).y"
          stroke="#00d4ff"
          stroke-width="1"
          opacity="0.3"
          stroke-dasharray="2,2"
        />
        <!-- Hub to Creative -->
        <line
          :x1="worldToMinimap(new THREE.Vector3(0, 0, 0)).x"
          :y1="worldToMinimap(new THREE.Vector3(0, 0, 0)).y"
          :x2="worldToMinimap(new THREE.Vector3(60, 0, 0)).x"
          :y2="worldToMinimap(new THREE.Vector3(60, 0, 0)).y"
          stroke="#ff9500"
          stroke-width="1"
          opacity="0.3"
          stroke-dasharray="2,2"
        />
        <!-- Hub to Personal -->
        <line
          :x1="worldToMinimap(new THREE.Vector3(0, 0, 0)).x"
          :y1="worldToMinimap(new THREE.Vector3(0, 0, 0)).y"
          :x2="worldToMinimap(new THREE.Vector3(0, 0, 60)).x"
          :y2="worldToMinimap(new THREE.Vector3(0, 0, 60)).y"
          stroke="#00ff88"
          stroke-width="1"
          opacity="0.3"
          stroke-dasharray="2,2"
        />
        <!-- Hub to Future -->
        <line
          :x1="worldToMinimap(new THREE.Vector3(0, 0, 0)).x"
          :y1="worldToMinimap(new THREE.Vector3(0, 0, 0)).y"
          :x2="worldToMinimap(new THREE.Vector3(0, 0, -60)).x"
          :y2="worldToMinimap(new THREE.Vector3(0, 0, -60)).y"
          stroke="#ff00ff"
          stroke-width="1"
          opacity="0.3"
          stroke-dasharray="2,2"
        />
      </g>

      <!-- Player position -->
      <g class="minimap__player">
        <circle
          :cx="playerMinimapPos.x"
          :cy="playerMinimapPos.y"
          r="4"
          fill="white"
          stroke="black"
          stroke-width="1"
        />
        <circle
          :cx="playerMinimapPos.x"
          :cy="playerMinimapPos.y"
          r="6"
          fill="none"
          stroke="white"
          stroke-width="1"
          opacity="0.5"
        >
          <animate
            attributeName="r"
            from="6"
            to="10"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.5"
            to="0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>

    <!-- Zone info -->
    <div v-if="currentZone" class="minimap__info">
      <div class="minimap__zone-name">{{ currentZone.name }}</div>
      <div class="minimap__zone-desc">{{ currentZone.description }}</div>
    </div>

    <!-- Progress -->
    <div class="minimap__progress">
      {{ visitedZones.size }} / {{ zones.length }} zones explored
    </div>
  </div>
</template>

<style scoped>
.minimap {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 30;
  padding: 12px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border: 1px solid;
}

.minimap--dark {
  background: rgba(0, 0, 0, 0.7);
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.minimap--light {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.2);
  color: black;
}

.minimap__title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  opacity: 0.7;
}

.minimap__svg {
  display: block;
  border-radius: 8px;
  overflow: hidden;
}

.minimap__bg {
  fill: rgba(128, 128, 128, 0.1);
}

.minimap__zone {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.minimap__zone--visited:hover {
  opacity: 0.8;
}

.minimap__zone--unvisited {
  cursor: not-allowed;
}

.minimap__zone--current {
  filter: brightness(1.3);
}

.minimap__zone-label {
  font-size: 8px;
  font-weight: 600;
  fill: white;
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.minimap__info {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid currentColor;
  opacity: 0.3;
}

.minimap__zone-name {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

.minimap__zone-desc {
  font-size: 10px;
  opacity: 0.8;
  line-height: 1.3;
}

.minimap__progress {
  margin-top: 8px;
  font-size: 10px;
  text-align: center;
  opacity: 0.6;
  font-weight: 600;
}

@media (max-width: 768px) {
  .minimap {
    bottom: 80px;
    right: 10px;
    padding: 8px;
  }

  .minimap__svg {
    width: 150px;
    height: 150px;
  }
}
</style>
