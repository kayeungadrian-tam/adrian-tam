<template>
  <section id="impact" class="section impact">
    <div class="section__container">
      <div class="section__header">
        <span class="section__label">DEPLOYED IMPACT</span>
        <h2 class="section__title">AI in Real Operations</h2>
        <p class="section__subtitle">
          Production systems shaped with the people who run the workflow—and
          engineered for trust, traceability, and measurable improvement.
        </p>
      </div>

      <div class="impact__grid">
        <article
          v-for="(item, index) in impact"
          :key="item.client"
          :ref="(el) => setRef(el as HTMLElement | null, index)"
          class="impact-card animate-on-scroll"
          :class="{ 'is-visible': visible[index] }"
          :style="{ transitionDelay: `${index * 120}ms` }"
        >
          <div class="impact-card__topline">
            <span class="impact-card__client">{{ item.client }}</span>
            <span class="impact-card__status">{{ item.status }}</span>
          </div>
          <h3 class="impact-card__title">{{ item.title }}</h3>
          <p v-if="item.metric" class="impact-card__metric">{{ item.metric }}</p>
          <p class="impact-card__description">{{ item.description }}</p>

          <div class="impact-card__stack" aria-label="Technology stack">
            <span v-for="technology in item.stack" :key="technology">
              {{ technology }}
            </span>
          </div>

          <a
            v-if="item.source"
            :href="item.source"
            target="_blank"
            rel="noopener noreferrer"
            class="impact-card__source"
          >
            View public source
            <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import impact from '../data/impact'
import { useStaggeredScrollAnimation } from '../composables/useScrollAnimation'

const { setRef, visible } = useStaggeredScrollAnimation(impact.length, 0.1)
</script>

<style scoped>
.impact {
  background: var(--color-bg);
}

.impact__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-6);
}

.impact-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: var(--space-8);
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out),
    border-color var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out);
}

.impact-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent-border);
  box-shadow: var(--shadow-lg);
}

.impact-card__topline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.impact-card__client {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.impact-card__status {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
}

.impact-card__title {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-4);
}

.impact-card__metric {
  padding: var(--space-3) var(--space-4);
  margin-bottom: var(--space-5);
  color: var(--color-heading);
  background: var(--color-accent-bg);
  border-left: 3px solid var(--color-accent);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1.5;
}

.impact-card__description {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.75;
  margin-bottom: var(--space-6);
}

.impact-card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: auto;
  margin-bottom: var(--space-5);
}

.impact-card__stack span {
  padding: var(--space-1) var(--space-3);
  color: var(--color-accent);
  background: var(--color-accent-bg);
  border: 1px solid var(--color-accent-border);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
}

.impact-card__source {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  width: fit-content;
  font-size: var(--text-sm);
  font-weight: 600;
}

@media (max-width: 1024px) {
  .impact__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .impact-card {
    padding: var(--space-6);
  }
}
</style>
