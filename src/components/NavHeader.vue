<template>
  <header
    :class="['nav', { 'nav--scrolled': scrolled }]"
  >
    <div class="nav__container">
      <a href="#hero" class="nav__brand" @click.prevent="smoothScrollTo('hero')">
        {{ personal.name }}
      </a>

      <nav class="nav__links" :class="{ 'nav__links--open': menuOpen }">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav__link"
          @click.prevent="handleNavClick(link.id)"
        >
          {{ link.label }}
        </a>
      </nav>

      <button
        class="nav__hamburger"
        :class="{ 'nav__hamburger--open': menuOpen }"
        aria-label="Toggle navigation menu"
        @click="menuOpen = !menuOpen"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line class="nav__hamburger-line nav__hamburger-line--top" x1="3" y1="6" x2="21" y2="6" />
          <line class="nav__hamburger-line nav__hamburger-line--mid" x1="3" y1="12" x2="21" y2="12" />
          <line class="nav__hamburger-line nav__hamburger-line--bot" x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import personal from '../data/personal'
import { smoothScrollTo } from '../composables/useSmoothScroll'

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
]

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 50
}

function handleNavClick(id: string) {
  smoothScrollTo(id)
  menuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  background: transparent;
  transition: background var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.nav--scrolled {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--shadow-sm);
}

.nav__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.nav__brand {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-heading);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.nav__brand:hover {
  color: var(--color-accent);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.nav__link {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.nav__link:hover {
  color: var(--color-accent);
}

.nav__hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-heading);
  padding: var(--space-2);
}

.nav__hamburger-line {
  transition: transform var(--duration-normal) var(--ease-out),
              opacity var(--duration-fast) var(--ease-out);
  transform-origin: center;
}

.nav__hamburger--open .nav__hamburger-line--top {
  transform: translateY(6px) rotate(45deg);
}

.nav__hamburger--open .nav__hamburger-line--mid {
  opacity: 0;
}

.nav__hamburger--open .nav__hamburger-line--bot {
  transform: translateY(-6px) rotate(-45deg);
}

@media (max-width: 768px) {
  .nav__hamburger {
    display: block;
  }

  .nav__links {
    display: none;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: var(--space-4) var(--space-6);
    gap: 0;
    box-shadow: var(--shadow-md);
  }

  .nav__links--open {
    display: flex;
  }

  .nav__link {
    padding: var(--space-3) 0;
    width: 100%;
    font-size: var(--text-base);
  }
}
</style>
