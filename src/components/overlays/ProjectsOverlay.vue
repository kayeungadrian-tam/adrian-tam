<script setup lang="ts">
defineEmits<{
  (event: 'close'): void
}>()
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
          <div class="project-item">
            <div class="project-header">
              <div class="project-icon">🛰️</div>
              <div class="project-title-group">
                <h3 class="project-title">Orbit</h3>
                <span class="project-date">2024</span>
              </div>
            </div>
            <p class="project-description">
              A tiny space telemetry dashboard with real-time streams, custom alerts, and a sci-fi UI layer.
            </p>
            <div class="tech-stack">
              <span class="tech-tag">TypeScript</span>
              <span class="tech-tag">WebSockets</span>
              <span class="tech-tag">Three.js</span>
            </div>
          </div>

          <div class="project-item">
            <div class="project-header">
              <div class="project-icon">📦</div>
              <div class="project-title-group">
                <h3 class="project-title">Packrat</h3>
                <span class="project-date">2023</span>
              </div>
            </div>
            <p class="project-description">
              A local-first asset organizer with fast tagging, fuzzy search, and offline sync.
            </p>
            <div class="tech-stack">
              <span class="tech-tag">Vue</span>
              <span class="tech-tag">SQLite</span>
              <span class="tech-tag">Vite</span>
            </div>
          </div>

          <div class="project-item">
            <div class="project-header">
              <div class="project-icon">🧭</div>
              <div class="project-title-group">
                <h3 class="project-title">Trailhead</h3>
                <span class="project-date">2022</span>
              </div>
            </div>
            <p class="project-description">
              A minimalist habit tracker with adaptive nudges and a journaling mode.
            </p>
            <div class="tech-stack">
              <span class="tech-tag">React</span>
              <span class="tech-tag">Supabase</span>
              <span class="tech-tag">Tailwind</span>
            </div>
          </div>
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
