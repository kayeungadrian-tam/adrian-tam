<template>
  <section id="projects" class="section" style="background: var(--color-bg)">
    <div class="section__container">
      <div class="section__header">
        <span class="section__label">PROJECTS</span>
        <h2 class="section__title">Things I've Built</h2>
      </div>

      <div class="section__content">
        <!-- Featured Project Card -->
        <div
          v-if="featuredProject"
          ref="elRef"
          class="featured-card animate-on-scroll"
          :class="{ 'is-visible': isVisible }"
        >
          <div class="featured-card__left">
            <span class="featured-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              Featured Project
            </span>
            <h3 class="featured-card__name">{{ featuredProject.name }}</h3>
            <p class="featured-card__description">{{ featuredProject.overview }}</p>

            <div class="featured-highlights">
              <div class="highlight-item">
                <span class="highlight-icon">&#x1F310;</span>
                <span>Mesh Topology</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">&#x1F9E9;</span>
                <span>Sidecar Pattern</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">&#x1F916;</span>
                <span>29+ Agent Skills</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">&#x1F9E0;</span>
                <span>Multi-LLM Support</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">&#x1F512;</span>
                <span>WebRTC Encrypted</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">&#x1F6E0;</span>
                <span>CLI Tools</span>
              </div>
            </div>

            <div class="featured-tags">
              <span
                v-for="tag in featuredProject.tags"
                :key="tag"
                class="tag-pill"
              >{{ tag }}</span>
            </div>

            <a
              :href="featuredProject.link"
              target="_blank"
              rel="noopener noreferrer"
              class="featured-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              View on GitHub
            </a>
          </div>

          <div class="featured-card__right">
            <div class="mesh-diagram">
              <div class="mesh-node mesh-node--agent1"><span>Agent 1</span></div>
              <div class="mesh-node mesh-node--agent2"><span>Agent 2</span></div>
              <div class="mesh-node mesh-node--registry"><span>Registry</span></div>
              <div class="mesh-node mesh-node--hub"><span>Hub</span></div>
              <div class="mesh-node mesh-node--sidecar"><span>Sidecar</span></div>
              <svg class="mesh-lines" viewBox="0 0 300 280" preserveAspectRatio="xMidYMid meet">
                <line x1="80" y1="40" x2="150" y2="140" />
                <line x1="220" y1="40" x2="150" y2="140" />
                <line x1="80" y1="40" x2="220" y2="40" />
                <line x1="150" y1="140" x2="50" y2="220" />
                <line x1="150" y1="140" x2="250" y2="220" />
                <line x1="50" y1="220" x2="250" y2="220" />
                <line x1="80" y1="40" x2="50" y2="220" />
                <line x1="220" y1="40" x2="250" y2="220" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Regular Projects Grid -->
        <div class="projects-grid">
          <div
            v-for="(project, index) in regularProjects"
            :key="project.name"
            class="project-card animate-on-scroll"
            :class="{ 'is-visible': isVisible }"
            :style="{ transitionDelay: `${index * 80}ms` }"
          >
            <div v-if="project.img" class="project-card__img">
              <img :src="project.img" :alt="project.name" />
            </div>
            <div v-else class="project-card__img project-card__img--placeholder">
              <span>{{ project.name.charAt(0) }}</span>
            </div>

            <div class="project-card__body">
              <h4 class="project-card__name">{{ project.name }}</h4>
              <p class="project-card__description">{{ project.description }}</p>

              <div class="project-card__tags">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="tag-pill tag-pill--sm"
                >{{ tag }}</span>
              </div>

              <a
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="project-card__link"
              >
                View on GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import projects, { type Project } from '../data/projects'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { elRef, isVisible } = useScrollAnimation(0.1)

const featuredProject = computed<Project | undefined>(() =>
  projects.find((p) => p.featured)
)

const regularProjects = computed<Project[]>(() =>
  projects.filter((p) => !p.featured)
)
</script>

<style scoped>
/* ===== Featured Card ===== */

.featured-card {
  display: grid;
  grid-template-columns: 55% 45%;
  gap: var(--space-8);
  background: linear-gradient(135deg, var(--color-accent-bg), rgba(139, 92, 246, 0.06));
  border: 1px solid var(--color-accent-border);
  border-radius: var(--radius-xl);
  padding: var(--space-10) var(--space-12);
  box-shadow: var(--shadow-lg);
  margin-bottom: var(--space-12);
}

.featured-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
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

.featured-card__name {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: var(--space-4);
}

.featured-card__description {
  font-size: var(--text-base);
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
}

/* Feature Highlights */

.featured-highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.highlight-icon {
  font-size: var(--text-base);
  flex-shrink: 0;
}

/* Tags */

.featured-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}

.tag-pill {
  display: inline-block;
  background: var(--color-accent-bg);
  color: var(--color-accent);
  border: 1px solid var(--color-accent-border);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
  padding: var(--space-1) var(--space-3);
}

.tag-pill--sm {
  font-size: 0.7rem;
  padding: 2px var(--space-2);
}

/* GitHub Button */

.featured-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--color-accent);
  color: #fff;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  padding: var(--space-3) var(--space-6);
  transition: background var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
  text-decoration: none;
}

.featured-btn:hover {
  background: var(--color-secondary);
  color: #fff;
  transform: translateY(-2px);
}

/* ===== Mesh Diagram ===== */

.featured-card__right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.mesh-diagram {
  position: relative;
  width: 300px;
  height: 280px;
}

.mesh-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.mesh-lines line {
  stroke: var(--color-accent-border);
  stroke-width: 1.5;
  stroke-dasharray: 6 4;
}

.mesh-node {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 2px solid var(--color-accent-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-heading);
  z-index: 1;
  text-align: center;
}

.mesh-node--agent1  { left: 40px;  top: 0; }
.mesh-node--agent2  { right: 40px; top: 0; }
.mesh-node--registry { left: 50%; top: 100px; transform: translateX(-50%); }
.mesh-node--hub     { left: 10px; bottom: 20px; }
.mesh-node--sidecar { right: 10px; bottom: 20px; }

/* ===== Projects Grid ===== */

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.project-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.project-card__img {
  height: 180px;
  overflow: hidden;
}

.project-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-card__img--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-accent-bg), rgba(139, 92, 246, 0.1));
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-accent);
}

.project-card__body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.project-card__name {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-heading);
}

.project-card__description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  color: var(--color-accent);
  font-weight: 500;
  margin-top: auto;
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.project-card__link:hover {
  color: var(--color-secondary);
}

/* ===== Responsive ===== */

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .featured-card {
    grid-template-columns: 1fr;
    padding: var(--space-6) var(--space-6);
  }

  .featured-card__right {
    display: none;
  }

  .featured-card__name {
    font-size: var(--text-2xl);
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
