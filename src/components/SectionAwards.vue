<template>
  <section id="awards" class="section">
    <div class="section__container">
      <div class="section__header">
        <span class="section__label">RECOGNITION</span>
        <h2 class="section__title">Awards, Press & Talks</h2>
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
              <a
                v-if="award.link"
                :href="award.link"
                target="_blank"
                rel="noopener noreferrer"
                class="award-card__link"
              >
                Official page <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div class="recognition-columns">
          <div class="recognition-block">
            <h3 class="recognition-block__title">In the press</h3>
            <article v-for="item in press" :key="item.title" class="press-item">
              <div class="press-item__meta">
                <time :datetime="item.date">{{ item.date }}</time>
                <span>{{ item.outlet }}</span>
              </div>
              <h4 class="press-item__title" lang="ja">{{ item.title }}</h4>
              <p class="press-item__note">{{ item.note }}</p>
              <div class="press-item__links">
                <a
                  v-for="link in item.links"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ link.label }} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>

          <div class="recognition-block">
            <h3 class="recognition-block__title">Speaking</h3>
            <ul class="talk-list">
              <li v-for="talk in talks" :key="talk.title" class="talk-item">
                <span class="talk-item__date">{{ talk.date }}</span>
                <div>
                  <p class="talk-item__title">“{{ talk.title }}”</p>
                  <p class="talk-item__event">
                    {{ talk.event }}<template v-if="talk.note"> · {{ talk.note }}</template>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { awards, press, talks } from '../data/recognition'
import { useStaggeredScrollAnimation } from '../composables/useScrollAnimation'

const { setRef, visible } = useStaggeredScrollAnimation(awards.length)
</script>

<style scoped>
.awards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

.award-card__link {
  display: inline-flex;
  gap: var(--space-1);
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
}

/* ===== Press & Talks ===== */

.recognition-columns {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: var(--space-8);
  margin-top: var(--space-12);
}

.recognition-block__title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: var(--space-4);
}

.press-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-left: 3px solid var(--color-accent);
  border-radius: var(--radius-lg);
  padding: var(--space-5) var(--space-6);
  box-shadow: var(--shadow-sm);
}

.press-item + .press-item {
  margin-top: var(--space-4);
}

.press-item__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  color: var(--color-accent);
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.press-item__title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-heading);
  line-height: 1.5;
  margin-bottom: var(--space-2);
}

.press-item__note {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-3);
}

.press-item__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  font-size: var(--text-sm);
  font-weight: 600;
}

.talk-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.talk-item {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: var(--space-3);
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.talk-item:first-child {
  padding-top: 0;
}

.talk-item__date {
  font-size: var(--text-sm);
  color: var(--color-accent);
  font-weight: 600;
}

.talk-item__title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-heading);
  line-height: 1.5;
}

.talk-item__event {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

@media (max-width: 1024px) {
  .recognition-columns {
    grid-template-columns: 1fr;
  }

  .awards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .awards-grid {
    grid-template-columns: 1fr;
  }

  .award-card {
    padding: var(--space-5);
  }
}
</style>
