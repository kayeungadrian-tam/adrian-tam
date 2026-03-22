<template>
  <section id="education" class="section section--alt">
    <div class="section__container">
      <div class="section__header">
        <span class="section__label">EDUCATION</span>
        <h2 class="section__title">Academic Background</h2>
      </div>

      <div class="section__content">
        <div
          v-for="(card, i) in educationCards"
          :key="card.university"
          :ref="(el) => setRef(el as HTMLElement | null, i)"
          class="edu-card animate-on-scroll"
          :class="{ 'is-visible': visible[i] }"
          :style="{ transitionDelay: `${i * 150}ms` }"
        >
          <div class="edu-card__icon">
            <span>🎓</span>
          </div>

          <div class="edu-card__content">
            <div class="edu-card__header">
              <h3 class="edu-card__university">{{ card.university }}</h3>
              <span class="edu-card__date">{{ card.date }}</span>
            </div>

            <span v-if="card.badge" class="edu-card__badge">{{ card.badge }}</span>

            <div v-if="card.degrees" class="edu-card__degrees">
              <div
                v-for="degree in card.degrees"
                :key="degree.title"
                class="edu-degree"
              >
                <span class="edu-degree__label">{{ degree.label }}</span>
                <h4 class="edu-degree__title">{{ degree.title }}</h4>
              </div>
            </div>

            <p v-if="card.description" class="edu-card__description">
              {{ card.description }}
            </p>

            <div class="edu-card__tags">
              <span v-for="tag in card.tags" :key="tag" class="edu-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import timeline from '../data/timeline'
import { useStaggeredScrollAnimation } from '../composables/useScrollAnimation'

const educationEntries = timeline.filter((entry) => entry.icon.includes('school'))

const educationCards = [
  {
    university: 'University of Auckland',
    date: '2013 - 2018',
    degrees: [
      { label: 'BSc', title: 'Mathematics & Applied Mathematics' },
      { label: 'BA', title: 'Japanese' },
    ],
    tags: ['Double Major', '5 Years', 'STEM + Humanities'],
    website: educationEntries.find((e) => e.location.includes('Auckland'))?.website,
  },
  {
    university: 'Hiroshima University',
    date: '2015 - 2016',
    badge: 'MEXT Scholarship',
    description:
      'Full exchange program funded by the Japanese Government (MEXT). One year of intensive study at Hiroshima University focusing on advanced Japanese language and cultural immersion.',
    tags: ['Government Scholarship', 'Cultural Immersion', 'Advanced Japanese'],
    website: educationEntries.find((e) => e.location.includes('Hiroshima'))?.website,
  },
]

const { setRef, visible } = useStaggeredScrollAnimation(educationCards.length)
</script>

<style scoped>
.section--alt {
  background: var(--color-bg-alt);
}

.edu-card {
  display: flex;
  gap: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
}

.edu-card + .edu-card {
  margin-top: var(--space-6);
}

.edu-card__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--color-accent-bg);
  border: 2px solid var(--color-accent-border);
  font-size: 28px;
}

.edu-card__content {
  flex: 1;
  min-width: 0;
}

.edu-card__header {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-bottom: var(--space-2);
}

.edu-card__university {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-heading);
}

.edu-card__date {
  font-size: var(--text-sm);
  color: var(--color-accent);
  white-space: nowrap;
}

.edu-card__badge {
  display: inline-block;
  background: var(--color-accent);
  color: #fff;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--space-1) var(--space-3);
  margin-bottom: var(--space-4);
}

.edu-card__degrees {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
}

.edu-degree {
  flex: 1;
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-5);
}

.edu-degree__label {
  display: block;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent);
  margin-bottom: var(--space-1);
}

.edu-degree__title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-heading);
}

.edu-card__description {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-4);
}

.edu-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-3);
}

.edu-tag {
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-accent);
  background: var(--color-accent-bg);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
}

@media (max-width: 768px) {
  .edu-card {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-6);
  }

  .edu-card__degrees {
    flex-direction: column;
  }
}
</style>
