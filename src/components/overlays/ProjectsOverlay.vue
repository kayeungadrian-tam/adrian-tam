<script setup lang="ts">
import projectsData from '../../data/projects'

defineEmits<{
  (event: 'close'): void
}>()

const projects = projectsData.map((p) => ({
  name: p.description,
  overview: p.overview,
  tags: p.tags,
  link: p.link,
}))
</script>

<template>
  <div class="overlay" @click="$emit('close')">
    <div class="overlay-card" @click.stop>
      <div class="glow-effect"></div>

      <div class="card-header">
        <span class="label">PROJ_04</span>
        <h2 class="title">Personal Projects</h2>
        <div class="header-line"></div>
        <p class="subtitle">Side quests & experiments</p>
      </div>

      <div class="card-body">
        <div class="projects-list">
          <a
            v-for="(project, index) in projects"
            :key="index"
            :href="project.link"
            target="_blank"
            rel="noreferrer"
            class="project-item project-link"
          >
            <div class="project-header">
              <div class="project-icon">🔧</div>
              <div class="project-title-group">
                <h3 class="project-title">{{ project.name }}</h3>
              </div>
            </div>
            <p class="project-description">
              {{ project.overview }}
            </p>
            <div class="tech-stack">
              <span v-for="(tag, tIndex) in project.tags" :key="tIndex" class="tech-tag">{{ tag }}</span>
            </div>
            <span class="github-link">
              <fa :icon="['fab', 'github']" /> View on GitHub
            </span>
          </a>
        </div>
      </div>

      <div class="card-footer">
        <div class="close-hint">
          <span class="pulse-dot"></span>
          Press
          <kbd class="kbd">Q</kbd>
          to close_
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../../assets/css/workOverlay.css" />

<style scoped>
.project-link {
  text-decoration: none;
  color: inherit;
  display: block;
  cursor: pointer;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--overlay-accent);
  margin-top: 12px;
  font-weight: 500;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.project-link:hover .github-link {
  opacity: 1;
}
</style>
