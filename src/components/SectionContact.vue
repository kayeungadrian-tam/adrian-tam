<template>
  <section
    id="contact"
    class="section"
    :style="{ background: 'linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%)' }"
  >
    <div
      ref="elRef"
      class="section__container animate-on-scroll"
      :class="{ 'is-visible': isVisible }"
    >
      <div class="section__header">
        <span class="section__label">CONTACT</span>
        <h2 class="section__title">Let's Connect</h2>
        <p class="section__subtitle">
          Bring me the difficult AI deployment problem: the workflow that needs
          careful integration, operator trust, human control, and an outcome the
          business can measure.
        </p>
      </div>

      <div class="section__content">
        <div class="contact-grid">
          <div class="contact-info">
            <a :href="`mailto:${personal.info.email}`" class="contact-card">
              <span class="contact-card__icon">&#9993;</span>
              <span class="contact-card__text">{{ personal.info.email }}</span>
            </a>

            <div class="contact-card">
              <span class="contact-card__icon">&#128205;</span>
              <span class="contact-card__text">{{ personal.location }}</span>
            </div>
          </div>

          <div class="contact-socials">
            <a
              :href="personal.links.githubLink"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-card contact-card--link"
            >
              <span class="contact-card__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </span>
              <span class="contact-card__text">kayeungadrian-tam</span>
            </a>

            <a
              :href="personal.links.linkedinLink"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-card contact-card--link"
            >
              <span class="contact-card__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </span>
              <span class="contact-card__text">kayeungadrian-tam</span>
            </a>

            <a
              :href="personal.links.qiitaLink"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-card contact-card--link"
            >
              <span class="contact-card__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <text x="4" y="18" font-size="18" font-weight="700" font-family="sans-serif">Q</text>
                </svg>
              </span>
              <span class="contact-card__text">adrian-tam</span>
            </a>

            <a
              :href="personal.links.zennLink"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-card contact-card--link"
            >
              <span class="contact-card__icon" aria-hidden="true">Z</span>
              <span class="contact-card__text">Zenn · adrian_tam</span>
            </a>

            <a
              :href="personal.links.resumeLink"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-card contact-card--link"
            >
              <span class="contact-card__icon" aria-hidden="true">↗</span>
              <span class="contact-card__text">View résumé</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="footer__container">
        <button class="footer__back-to-top" @click="scrollToTop" aria-label="Back to top">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
        <div class="footer__bar">
          <span class="footer__copyright">&copy; 2026 {{ personal.name }}</span>
          <span class="footer__built-with">Built with Vue 3 + TypeScript</span>
        </div>
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '../composables/useScrollAnimation'
import personal from '../data/personal'

const { elRef, isVisible } = useScrollAnimation()

function scrollToTop() {
  document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.contact-info,
.contact-socials {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.contact-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  text-decoration: none;
  color: var(--color-text);
  transition: border-color var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.contact-card--link:hover {
  border-color: var(--color-accent-border);
  box-shadow: var(--shadow-md);
}

.contact-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  font-size: var(--text-xl);
  color: var(--color-accent);
}

.contact-card__text {
  font-size: var(--text-base);
  line-height: 1.4;
}

/* Footer */
.footer {
  margin-top: var(--space-16);
  border-top: 1px solid var(--color-border);
  padding: var(--space-6);
}

.footer__container {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.footer__back-to-top {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-accent-border);
  background: var(--color-surface);
  color: var(--color-accent);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.footer__back-to-top:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-sm);
}

.footer__bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__copyright,
.footer__built-with {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}

/* Responsive */
@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .footer__bar {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }
}
</style>
