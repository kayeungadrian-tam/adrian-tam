<template>
  <section id="skills" class="section skills">
    <div class="section__container">
      <div class="section__header">
        <span class="section__label">SKILLS</span>
        <h2 class="section__title">Tech Stack & Expertise</h2>
      </div>
      <div class="section__content skills__grid">
        <div
          v-for="(category, index) in skillCategories"
          :key="category.name"
          :ref="(el) => setCardRef(el as HTMLElement | null, index)"
          class="skills__card animate-on-scroll"
          :class="{ 'is-visible': cardVisible[index] }"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="skills__card-header">
            <span class="skills__card-icon">{{ category.icon }}</span>
            <h3 class="skills__card-title">{{ category.name }}</h3>
          </div>
          <ul class="skills__list">
            <li
              v-for="skill in category.skills"
              :key="skill.name"
              class="skills__item"
            >
              <span class="skills__item-name">{{ skill.name }}</span>
              <div class="skills__bar-track">
                <div
                  class="skills__bar-fill"
                  :style="{
                    width: cardVisible[index] ? `${(skill.level / 5) * 100}%` : '0%',
                    transitionDelay: `${index * 100 + 200}ms`,
                  }"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { skillCategories } from '../data/skills'

const cardRefs = ref<(HTMLElement | null)[]>([])
const cardVisible = ref<boolean[]>(skillCategories.map(() => false))

let observer: IntersectionObserver | null = null

function setCardRef(el: HTMLElement | null, index: number) {
  cardRefs.value[index] = el
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.value.indexOf(entry.target as HTMLElement)
          if (index !== -1) {
            cardVisible.value[index] = true
            observer?.unobserve(entry.target)
          }
        }
      })
    },
    { threshold: 0.15 }
  )

  cardRefs.value.forEach((el) => {
    if (el) observer?.observe(el)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.skills {
  background: var(--color-bg);
}

.skills__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 769px) {
  .skills__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.skills__card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--duration-normal) var(--ease-out),
              opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}

.skills__card:hover {
  box-shadow: var(--shadow-md);
}

.skills__card-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.skills__card-icon {
  font-size: var(--text-2xl);
}

.skills__card-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-heading);
}

.skills__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.skills__item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.skills__item-name {
  font-size: var(--text-sm);
  color: var(--color-text);
  min-width: 140px;
  flex-shrink: 0;
}

.skills__bar-track {
  flex: 1;
  height: 6px;
  border-radius: var(--radius-full);
  background: var(--color-border-light);
  overflow: hidden;
}

.skills__bar-fill {
  height: 100%;
  border-radius: var(--radius-full);
  background: var(--color-accent);
  transition: width 600ms var(--ease-out);
}
</style>
