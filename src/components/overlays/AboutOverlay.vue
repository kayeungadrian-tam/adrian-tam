<template>
  <BaseOverlay label="BIO_01" title="About Me" subtitle="">
    <div class="intro-section">
      <p class="intro-text">
        Hey there! I'm <span class="highlight">Adrian</span>, an AI Engineer based in Tokyo,
        specializing in machine learning, computer vision, and building intelligent systems
        that solve real-world problems.
      </p>
    </div>

    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-icon">📍</div>
        <span class="stat-label">Location</span>
        <span class="stat-value">Tokyo</span>
      </div>
      <div class="stat-item">
        <div class="stat-icon">⚡</div>
        <span class="stat-label">Core Focus</span>
        <span class="stat-value">AI / ML · Computer Vision</span>
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
        I'm fascinated by the intersection of AI and practical engineering. From causal discovery
        systems at IBM to object detection pipelines and reinforcement learning, I love turning
        research into production-ready solutions. My background in mathematics gives me a solid
        foundation for tackling complex ML challenges.
      </p>
      <p class="description">
        Beyond engineering, my experience as a Coordinator for International Relations in Japan
        taught me the value of bridging cultures and communicating across boundaries. I bring
        that same mindset to my technical work -- connecting ideas, teams, and technologies
        to build something greater than the sum of its parts.
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
          <a class="social-card" href="https://www.linkedin.com/in/kayeungadrian-tam/" target="_blank" rel="noreferrer">
            <span class="social-icon">
              <fa class="social-fa" :icon="['fab', 'linkedin']" aria-hidden="true" />
            </span>
            <span class="social-label">LinkedIn</span>
            <span class="social-handle">linkedin.com/in/kayeungadrian-tam</span>
          </a>
          <a class="social-card" href="https://qiita.com/adrian-tam" target="_blank" rel="noreferrer">
            <span class="social-icon">
              <fa class="social-fa" icon="pen-to-square" aria-hidden="true" />
            </span>
            <span class="social-label">Qiita</span>
            <span class="social-handle">qiita.com/adrian-tam</span>
          </a>
          <a class="social-card" href="https://github.com/kayeungadrian-tam" target="_blank" rel="noreferrer">
            <span class="social-icon">
              <fa class="social-fa" :icon="['fab', 'github']" aria-hidden="true" />
            </span>
            <span class="social-label">GitHub</span>
            <span class="social-handle">github.com/kayeungadrian-tam</span>
          </a>
        </div>
      </div>
    </template>
  </BaseOverlay>
</template>


<script setup>
import BaseOverlay from './BaseOverlay.vue';
</script>

<style scoped src="../../assets/css/aboutOverlay.css" />
