<template>
  <section id="about" class="section about">
    <div class="section__container">
      <div class="section__header">
        <span class="section__label">ABOUT</span>
        <h2 class="section__title">About Me</h2>
      </div>
      <div
        ref="elRef"
        class="section__content about__layout animate-on-scroll"
        :class="{ 'is-visible': isVisible }"
      >
        <div class="about__text">
          <p class="about__paragraph">
            {{ personal.aboutMeParagraph }}
          </p>
          <p class="about__paragraph">
            {{ personal.aboutMeExpanded }}
          </p>
        </div>
        <div class="about__info">
          <div class="about__photo-wrapper">
            <img
              :src="photoUrl"
              alt="Adrian Tam"
              class="about__photo"
            />
          </div>
          <div class="about__chips">
            <span class="about__chip">📍 Tokyo, Japan</span>
            <span class="about__chip">🤖 AI / ML / Computer Vision</span>
            <span class="about__chip">💼 5+ Years</span>
            <span class="about__chip">
              🗣️ {{ personal.info.lang.join(' ') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import personal from '../data/personal'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { elRef, isVisible } = useScrollAnimation()

const photoUrl = new URL('../assets/img/new_photo.png', import.meta.url).href
</script>

<style scoped>
.about {
  background: var(--color-bg-alt);
}

.about__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  align-items: start;
}

@media (min-width: 769px) {
  .about__layout {
    grid-template-columns: 3fr 2fr;
  }
}

.about__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.about__paragraph {
  font-size: var(--text-base);
  line-height: 1.75;
  color: var(--color-text);
}

.about__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
}

.about__photo-wrapper {
  display: flex;
  justify-content: center;
}

.about__photo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-accent-border);
  box-shadow: var(--shadow-lg);
}

.about__chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
}

.about__chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--color-accent-bg);
  border: 1px solid var(--color-accent-border);
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-text);
  white-space: nowrap;
}
</style>
