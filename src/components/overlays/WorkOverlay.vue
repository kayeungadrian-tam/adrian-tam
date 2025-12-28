<template>
  <div class="overlay" @click="$emit('close')">
    <div class="overlay-card" @click.stop>
      <div class="glow-effect"></div>

      <div class="card-header">
        <span class="label">WORK_02</span>
        <h2 class="title">Recent Projects</h2>
        <div class="header-line"></div>
        <p class="subtitle">AI Engineering @ IBM</p>
      </div>

      <div class="card-body">
        <div class="projects-list">

          <div class="project-item">
            <div class="project-header">
              <div class="project-icon">🤖</div>
              <div class="project-title-group">
                <h3 class="project-title">watsonx Enterprise AI Platform</h3>
                <span class="project-date">2024 - Present</span>
              </div>
            </div>
            <p class="project-description">
              Leading development of next-gen AI solutions using IBM's watsonx platform.
              Building scalable ML pipelines and deploying enterprise-grade models for Fortune 500 clients.
            </p>
            <div class="tech-stack">
              <span class="tech-tag">Python</span>
              <span class="tech-tag">TensorFlow</span>
              <span class="tech-tag">Kubernetes</span>
              <span class="tech-tag">watsonx.ai</span>
            </div>
          </div>

          <div class="project-item">
            <div class="project-header">
              <div class="project-icon">☁️</div>
              <div class="project-title-group">
                <h3 class="project-title">Cloud Architecture Migration</h3>
                <span class="project-date">2023 - 2024</span>
              </div>
            </div>
            <p class="project-description">
              Architected and executed multi-cloud migration strategy for enterprise clients.
              Reduced infrastructure costs by 40% while improving system reliability and performance.
            </p>
            <div class="tech-stack">
              <span class="tech-tag">IBM Cloud</span>
              <span class="tech-tag">Docker</span>
              <span class="tech-tag">Terraform</span>
              <span class="tech-tag">PostgreSQL</span>
            </div>
          </div>

          <div class="project-item">
            <div class="project-header">
              <div class="project-icon">🔐</div>
              <div class="project-title-group">
                <h3 class="project-title">Zero-Trust Security Framework</h3>
                <span class="project-date">2023</span>
              </div>
            </div>
            <p class="project-description">
              Implemented comprehensive zero-trust security architecture for banking sector clients.
              Enhanced threat detection and reduced security incidents by 65%.
            </p>
            <div class="tech-stack">
              <span class="tech-tag">OAuth 2.0</span>
              <span class="tech-tag">JWT</span>
              <span class="tech-tag">Redis</span>
              <span class="tech-tag">Node.js</span>
            </div>
          </div>

          <div class="project-item">
            <div class="project-header">
              <div class="project-icon">📊</div>
              <div class="project-title-group">
                <h3 class="project-title">Real-Time Analytics Engine</h3>
                <span class="project-date">2022 - 2023</span>
              </div>
            </div>
            <p class="project-description">
              Built high-performance data processing system handling 10M+ events per second.
              Enabled real-time decision making for manufacturing and logistics operations.
            </p>
            <div class="tech-stack">
              <span class="tech-tag">Apache Kafka</span>
              <span class="tech-tag">Spark</span>
              <span class="tech-tag">MongoDB</span>
              <span class="tech-tag">Go</span>
            </div>
          </div>

        </div>
      </div>

      <div class="card-footer">
        <div class="stats-summary">
          <div class="summary-item">
            <span class="summary-value">15+</span>
            <span class="summary-label">Projects Delivered</span>
          </div>
          <div class="summary-item">
            <span class="summary-value">$2M+</span>
            <span class="summary-label">Cost Savings</span>
          </div>
          <div class="summary-item">
            <span class="summary-value">99.9%</span>
            <span class="summary-label">Uptime</span>
          </div>
        </div>
        <div class="close-hint">
          <span class="pulse-dot"></span>
          Press
          <kbd class="kbd">ESC</kbd>
          to close_
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../../assets/css/workOverlay.css" />