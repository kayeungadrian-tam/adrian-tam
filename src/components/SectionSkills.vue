<template>
  <section id="skills" class="section skills">
    <div class="section__container">
      <div class="section__header">
        <span class="section__label">SKILLS</span>
        <h2 class="section__title">Tech Stack & Expertise</h2>
      </div>
      <div class="section__content skills__grid">
        <div
          v-for="(category, ci) in skillCategories"
          :key="category.name"
          :ref="(el) => setRef(el as HTMLElement | null, ci)"
          class="orbit-card animate-on-scroll"
          :class="{ 'is-visible': visible[ci] }"
          :style="{ transitionDelay: `${ci * 120}ms` }"
          @mouseenter="hoveredCategory = ci"
          @mouseleave="hoveredCategory = -1"
        >
          <!-- Orbit paths (visual rings) -->
          <svg class="orbit-paths" viewBox="0 0 300 300">
            <circle
              v-for="r in orbitRadii"
              :key="r"
              cx="150" cy="150" :r="r"
              fill="none"
              :stroke="categoryColors[ci]"
              stroke-width="1"
              stroke-dasharray="4 4"
              :opacity="hoveredCategory === ci ? 0.4 : 0.15"
            />
          </svg>

          <!-- Center icon -->
          <div class="orbit-center">
            <span class="orbit-center__icon">{{ category.icon }}</span>
            <span class="orbit-center__name">{{ category.name }}</span>
          </div>

          <!-- Orbiting skill bubbles -->
          <div
            v-for="(skill, si) in category.skills"
            :key="skill.name"
            class="orbit-item"
            :class="{
              'orbit-item--paused': hoveredCategory === ci && hoveredSkill !== si,
              'orbit-item--active': hoveredSkill === si && hoveredCategory === ci,
            }"
            :style="getOrbitStyle(skill.level, si, category.skills.length, ci)"
            @mouseenter="hoveredSkill = si"
            @mouseleave="hoveredSkill = -1"
          >
            <span
              class="orbit-bubble"
              :style="{
                width: `${getBubbleSize(skill.level)}px`,
                height: `${getBubbleSize(skill.level)}px`,
                borderColor: categoryColors[ci],
                background: hoveredSkill === si && hoveredCategory === ci
                  ? categoryColors[ci]
                  : 'var(--color-surface)',
                color: hoveredSkill === si && hoveredCategory === ci
                  ? '#fff'
                  : 'var(--color-heading)',
              }"
            >
              {{ shortName(skill.name) }}
            </span>

            <!-- Tooltip -->
            <div
              v-if="hoveredSkill === si && hoveredCategory === ci"
              class="orbit-tooltip"
            >
              {{ skill.name }}
              <span class="orbit-tooltip__level">
                <span
                  v-for="n in 5"
                  :key="n"
                  class="orbit-tooltip__dot"
                  :class="{ 'orbit-tooltip__dot--filled': n <= skill.level }"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { skillCategories } from '../data/skills'
import { useStaggeredScrollAnimation } from '../composables/useScrollAnimation'

const { setRef, visible } = useStaggeredScrollAnimation(skillCategories.length)

const hoveredCategory = ref(-1)
const hoveredSkill = ref(-1)

const categoryColors = ['#6366F1', '#8B5CF6', '#06B6D4', '#F59E0B']

const orbitRadii = [60, 95, 130]

function getBubbleSize(level: number): number {
  if (level >= 5) return 46
  if (level >= 4) return 40
  return 34
}

function getOrbitRadius(level: number): number {
  if (level >= 5) return 60
  if (level >= 4) return 95
  return 130
}

function getOrbitSpeed(level: number): number {
  if (level >= 5) return 22
  if (level >= 4) return 30
  return 38
}

function getOrbitStyle(level: number, index: number, total: number, catIndex: number) {
  const radius = getOrbitRadius(level)
  const speed = getOrbitSpeed(level)

  // Distribute skills at same level evenly
  const sameLevel = skillCategories[catIndex].skills.filter((s) => {
    if (level >= 5) return s.level >= 5
    if (level >= 4) return s.level === 4
    return s.level <= 3
  })
  const indexInRing = sameLevel.findIndex(
    (s) => s.name === skillCategories[catIndex].skills[index].name
  )
  const countInRing = sameLevel.length

  const startDelay = -(indexInRing / countInRing) * speed

  return {
    '--orbit-r': `${radius}px`,
    animationDuration: `${speed}s`,
    animationDelay: `${startDelay}s`,
    animationDirection: catIndex % 2 === 0 ? 'normal' : 'reverse',
  }
}

const nameMap: Record<string, string> = {
  'Computer Vision': 'CV',
  'NLP / Transformers': 'NLP',
  'Causal Discovery': 'Causal',
  'Scikit-learn': 'sklearn',
  'TypeScript': 'TS',
  'PostgreSQL': 'PG',
  'HTML / CSS': 'HTML',
  'Three.js': '3JS',
  'Vue.js': 'Vue',
  'FastAPI': 'FAPI',
  'English (Native)': 'EN',
  'Japanese (Business)': 'JP',
  'Cantonese (Native)': 'HK',
  'Mandarin': 'CN',
}

function shortName(name: string): string {
  return nameMap[name] || name
}
</script>

<style scoped>
.skills {
  background: var(--color-bg);
}

.skills__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
}

@media (max-width: 768px) {
  .skills__grid {
    grid-template-columns: 1fr;
  }
}

/* ===== Orbit Card ===== */

.orbit-card {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  max-width: 340px;
  margin: 0 auto;
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-sm);
  overflow: visible;
  transition: box-shadow var(--duration-normal) var(--ease-out),
              opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}

.orbit-card:hover {
  box-shadow: var(--shadow-lg);
}

/* ===== Orbit Paths ===== */

.orbit-paths {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.orbit-paths circle {
  transition: opacity 0.4s ease;
}

/* ===== Orbit Center ===== */

.orbit-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  pointer-events: none;
}

.orbit-center__icon {
  display: block;
  font-size: 2rem;
  margin-bottom: var(--space-1);
}

.orbit-center__name {
  display: block;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

/* ===== Orbiting Items ===== */

.orbit-item {
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  width: 40px;
  height: 40px;
  animation: orbit linear infinite;
  z-index: 3;
}

.orbit-item--paused {
  opacity: 0.5;
}

.orbit-item--active {
  z-index: 10;
}

.orbit-card:hover .orbit-item {
  animation-duration: 60s !important;
}

.orbit-bubble {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1.5px solid;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
  transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
  /* Counter-rotate to keep text upright */
  animation: orbit-reverse linear infinite;
  animation-duration: inherit;
  animation-delay: inherit;
  animation-direction: inherit;
  cursor: default;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.orbit-card:hover .orbit-bubble {
  animation-duration: 60s !important;
}

.orbit-item--active .orbit-bubble {
  transform: translate(-50%, -50%) scale(1.25);
  box-shadow: var(--shadow-md);
}

/* ===== Tooltip ===== */

.orbit-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-heading);
  white-space: nowrap;
  box-shadow: var(--shadow-md);
  pointer-events: none;
  z-index: 20;
  /* Counter-rotate */
  animation: orbit-reverse linear infinite;
  animation-duration: inherit;
  animation-delay: inherit;
  animation-direction: inherit;
}

.orbit-card:hover .orbit-tooltip {
  animation-duration: 60s !important;
}

.orbit-tooltip__level {
  display: flex;
  gap: 3px;
  margin-top: 4px;
  justify-content: center;
}

.orbit-tooltip__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-border);
}

.orbit-tooltip__dot--filled {
  background: var(--color-accent);
}

/* orbit / orbit-reverse keyframes are in style.css (global) */
</style>
