<template>
  <BaseOverlay label="BIO_01" title="About Me" subtitle="">
    <div class="intro-section">
      <p class="intro-text">
        Hey there! I'm <span class="highlight">Adrian</span>, a Full-Stack Engineer based in the digital frontier,
        specializing in building scalable AI solutions and robust cloud architectures.
      </p>
    </div>

    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-icon">📍</div>
        <span class="stat-label">Location</span>
        <span class="stat-value">Remote / Global</span>
      </div>
      <div class="stat-item">
        <div class="stat-icon">⚡</div>
        <span class="stat-label">Core Focus</span>
        <span class="stat-value">AI · Cloud · Systems</span>
      </div>
      <div class="stat-item">
        <div class="stat-icon">🚀</div>
        <span class="stat-label">Experience</span>
        <span class="stat-value">5+ Years</span>
      </div>
    </div>

    <div class="passion-section">
      <h3 class="section-title">
        <span class="title-icon">💡</span>
        What Drives Me
      </h3>
      <p class="description">
        I'm fascinated by the intersection of design and data. There's something magical about
        transforming complex technical challenges into elegant solutions that people actually want to use.
        My passion lies in creating performant applications that solve real-world problems through
        clean code and IBM-standard reliability.
      </p>
      <p class="description">
        Beyond the code, I believe in building systems that empower people. Every line of code is an
        opportunity to make someone's day a little easier, a process more efficient, or an impossible
        task suddenly achievable.
      </p>
    </div>
    <div class="passion-grid"></div>


    <template #footer>
      <div class="social-section">
        <h3 class="section-title">
          <span class="title-icon">🔗</span>
          Connect
        </h3>
        <div class="social-grid">
          <a class="social-card" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <span class="social-icon">
              <fa class="social-fa" :icon="['fab', 'linkedin']" aria-hidden="true" />
            </span>
            <span class="social-label">LinkedIn</span>
            <span class="social-handle">linkedin.com/in/your-handle</span>
          </a>
          <a class="social-card" href="https://www.google.com/" target="_blank" rel="noreferrer">
            <span class="social-icon">
              <fa class="social-fa" :icon="['fab', 'google']" aria-hidden="true" />
            </span>
            <span class="social-label">Google</span>
            <span class="social-handle">google.com/your-handle</span>
          </a>
          <a class="social-card" href="https://github.com/" target="_blank" rel="noreferrer">
            <span class="social-icon">
              <fa class="social-fa" :icon="['fab', 'github']" aria-hidden="true" />
            </span>
            <span class="social-label">GitHub</span>
            <span class="social-handle">github.com/your-handle</span>
          </a>
        </div>
      </div>
    </template>
  </BaseOverlay>
</template>


<script setup>
import BaseOverlay from './BaseOverlay.vue';

const personal = [
  {
    icon: '🤖',
    title: 'watsonx Enterprise AI Platform',
    date: '2024 - Present',
    description: " Leading development of next-gen AI solutions...", tags: ['Python', 'TensorFlow', 'Kubernetes']
  },
]
</script>

<style scoped src="../../assets/css/aboutOverlay.css" />
