<template>
  <section id="awards" class="section">
    <div class="section__container">
      <div class="section__header">
        <span class="section__label">RECOGNITION</span>
        <h2 class="section__title">Awards & Honors</h2>
      </div>

      <div class="section__content">
        <div class="awards-grid">
          <div
            v-for="(award, i) in awards"
            :key="award.name"
            :ref="(el) => setRef(el as HTMLElement | null, i)"
            class="award-card animate-on-scroll"
            :class="{ 'is-visible': visible[i] }"
            :style="{ transitionDelay: `${i * 150}ms` }"
          >
            <div class="award-card__icon">
              <span>{{ award.emoji }}</span>
            </div>

            <div class="award-card__content">
              <h3 class="award-card__name">{{ award.name }}</h3>
              <span class="award-card__year">{{ award.year }}</span>
              <p class="award-card__description">{{ award.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStaggeredScrollAnimation } from '../composables/useScrollAnimation'

const awards = [
  {
    emoji: '🏆',
    name: "IBM Manager's Choice Award",
    year: '2024',
    description:
      'Recognition for outstanding contributions to AI projects at IBM Japan.',
  },
  {
    emoji: '🎖️',
    name: 'MEXT Scholarship',
    year: '2015',
    description:
      'Full scholarship from the Japanese Government for academic excellence.',
  },
]

const { setRef, visible } = useStaggeredScrollAnimation(awards.length)
</script>

<style scoped>
.awards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.award-card {
  display: flex;
  gap: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}

.award-card__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-accent-bg);
  border: 2px solid var(--color-accent-border);
  font-size: 24px;
}

.award-card__content {
  flex: 1;
  min-width: 0;
}

.award-card__name {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: var(--space-1);
}

.award-card__year {
  display: inline-block;
  font-size: var(--text-sm);
  color: var(--color-accent);
  margin-bottom: var(--space-2);
}

.award-card__description {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .awards-grid {
    grid-template-columns: 1fr;
  }

  .award-card {
    padding: var(--space-5);
  }
}
</style>
