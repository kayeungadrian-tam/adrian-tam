<template>
  <section id="experience" class="section experience-section">
    <div class="section__container">
      <div class="section__header">
        <span class="section__label">EXPERIENCE</span>
        <h2 class="section__title">Career Journey</h2>
      </div>
      <div class="section__content">
        <div class="timeline" ref="timelineRef">
          <!-- Background line (gray) -->
          <div class="timeline__line"></div>
          <!-- Fill line (accent, scroll-driven) -->
          <div class="timeline__fill" :style="{ height: `${fillPercent}%` }"></div>

          <div
            v-for="(entry, index) in workEntries"
            :key="index"
            ref="cardRefs"
            class="timeline__item"
            :class="[
              index % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right',
              { 'is-visible': visibleCards[index] }
            ]"
          >
            <div
              class="timeline__node"
              :class="{ 'timeline__node--active': visibleCards[index] }"
            ></div>
            <div class="timeline__card">
              <span class="timeline__date">{{ formatDate(entry.start) }} - {{ formatDate(entry.end) }}</span>
              <h3 class="timeline__title">{{ entry.title }}</h3>
              <p class="timeline__company">
                <template v-if="entry.website">
                  <a :href="entry.website" target="_blank" rel="noopener noreferrer" class="timeline__link">
                    {{ entry.location }}
                    <svg class="timeline__external-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 1.5L5.25 6.75M10.5 1.5H7.5M10.5 1.5V4.5M4.5 1.5H2.25C1.83579 1.5 1.5 1.83579 1.5 2.25V9.75C1.5 10.1642 1.83579 10.5 2.25 10.5H9.75C10.1642 10.5 10.5 10.1642 10.5 9.75V7.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                </template>
                <template v-else>
                  {{ entry.location }}
                </template>
              </p>
              <ul class="timeline__bullets">
                <li
                  v-for="(bullet, bIndex) in parseBullets(entry.description)"
                  :key="bIndex"
                  class="timeline__bullet"
                >
                  {{ bullet }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import timeline from '../data/timeline'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const workEntries = computed(() =>
  timeline.filter((entry) => entry.icon.includes('briefcase'))
)

const timelineRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])
const visibleCards = ref<boolean[]>([])
const fillPercent = ref(0)

let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    updateTimeline()
    ticking = false
  })
}

function updateTimeline() {
  if (!timelineRef.value) return

  const rect = timelineRef.value.getBoundingClientRect()
  const trigger = window.innerHeight * 0.65

  // Fill progress: how far through the timeline the scroll trigger has reached
  const progress = (trigger - rect.top) / rect.height
  fillPercent.value = Math.max(0, Math.min(100, progress * 100))

  // Reveal cards when scroll trigger passes their position
  cardRefs.value.forEach((el, i) => {
    if (!el || visibleCards.value[i]) return
    const cardRect = el.getBoundingClientRect()
    if (cardRect.top < trigger + 50) {
      visibleCards.value[i] = true
    }
  })
}

onMounted(() => {
  visibleCards.value = new Array(workEntries.value.length).fill(false)
  window.addEventListener('scroll', onScroll, { passive: true })
  updateTimeline()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

function formatDate(date: string): string {
  if (date.toLowerCase() === 'present') return 'Present'
  const [year, month] = date.split('-')
  return month ? `${MONTH_NAMES[parseInt(month, 10) - 1]} ${year}` : year
}

function parseBullets(description: string): string[] {
  return description
    .split(/<br\s*\/?>/)
    .flatMap((segment) => segment.split(/(?:^|\s)-\s*/))
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}
</script>

<style scoped>
.experience-section {
  background: var(--color-bg-alt);
}

.timeline {
  position: relative;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-8) 0;
}

.timeline__line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
  transform: translateX(-50%);
}

.timeline__fill {
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, var(--color-accent), var(--color-secondary));
  border-radius: 0 0 2px 2px;
  z-index: 1;
  transition: height 0.1s linear;
  box-shadow: 0 0 8px var(--color-accent), 0 0 20px rgba(99,102,241,0.2);
}

/* Glowing tip */
.timeline__fill::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 12px var(--color-accent), 0 0 24px rgba(99,102,241,0.4);
}

.timeline__item {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 50%;
  padding: var(--space-4) 0;
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.timeline__item--left {
  left: 0;
  justify-content: flex-end;
  padding-right: var(--space-10);
  transform: translateX(-40px);
}

.timeline__item--right {
  left: 50%;
  justify-content: flex-start;
  padding-left: var(--space-10);
  transform: translateX(40px);
}

.timeline__item.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* Timeline node */
.timeline__node {
  position: absolute;
  top: calc(var(--space-6) + 2px);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-border);
  border: 3px solid var(--color-surface);
  box-shadow: var(--shadow-sm);
  z-index: 2;
  transition: background 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
}

.timeline__node--active {
  background: var(--color-accent);
  box-shadow: 0 0 0 4px rgba(99,102,241,0.2), var(--shadow-sm);
  transform: scale(1.2);
  animation: node-glow 2s ease-in-out infinite;
}

.timeline__item--left .timeline__node {
  right: -8px;
}

.timeline__item--right .timeline__node {
  left: -8px;
}

/* Card */
.timeline__card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  position: relative;
  max-width: 100%;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.timeline__card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Arrow pointing toward timeline line */
.timeline__card::before {
  content: '';
  position: absolute;
  top: var(--space-6);
  width: 12px;
  height: 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  transform: rotate(45deg);
  z-index: -1;
}

.timeline__item--left .timeline__card::before {
  right: -7px;
  border-left: none;
  border-bottom: none;
}

.timeline__item--right .timeline__card::before {
  left: -7px;
  border-right: none;
  border-top: none;
}

/* Card content */
.timeline__date {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-accent);
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.timeline__title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: var(--space-2);
}

.timeline__company {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.timeline__link {
  color: var(--color-accent);
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}

.timeline__link:hover {
  color: var(--color-secondary);
}

.timeline__external-icon {
  flex-shrink: 0;
}

.timeline__bullets {
  padding-left: var(--space-4);
}

.timeline__bullet {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  position: relative;
  padding-left: var(--space-3);
  margin-bottom: var(--space-1);
}

.timeline__bullet::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
}

/* ===== Mobile: left-aligned timeline ===== */
@media (max-width: 768px) {
  .timeline__line,
  .timeline__fill {
    left: 8px;
    transform: none;
  }

  .timeline__item {
    width: 100%;
    left: 0 !important;
    justify-content: flex-start;
    padding-left: calc(var(--space-10) + 8px);
    padding-right: 0;
  }

  .timeline__item--left,
  .timeline__item--right {
    transform: translateX(-30px);
  }

  .timeline__item.is-visible {
    transform: translateX(0);
  }

  .timeline__node {
    left: 0 !important;
    right: auto !important;
  }

  .timeline__card::before {
    left: -7px !important;
    right: auto !important;
    border-right: none !important;
    border-top: none !important;
    border-left: 1px solid var(--color-border-light) !important;
    border-bottom: 1px solid var(--color-border-light) !important;
  }
}
</style>
