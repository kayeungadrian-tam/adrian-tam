<template>
  <div class="overlay" @click="$emit('close')">
    <div class="overlay-card" @click.stop>
      <div class="glow-effect"></div>

      <div class="card-header">
        <span class="label">BIO_01</span>
        <h2 class="title">About Me</h2>
        <div class="header-line"></div>
      </div>

      <div class="card-body">
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

        <div class="passion-grid">
          <div class="passion-item">
            <div class="passion-icon">🎨</div>
            <h4 class="passion-title">Design Thinking</h4>
            <p class="passion-desc">Crafting intuitive experiences that balance aesthetics with functionality</p>
          </div>
          <div class="passion-item">
            <div class="passion-icon">🧠</div>
            <h4 class="passion-title">AI Innovation</h4>
            <p class="passion-desc">Pushing boundaries of what's possible with machine learning and neural networks</p>
          </div>
          <div class="passion-item">
            <div class="passion-icon">🌱</div>
            <h4 class="passion-title">Continuous Growth</h4>
            <p class="passion-desc">Always learning, always evolving, staying curious about emerging technologies</p>
          </div>
          <div class="passion-item">
            <div class="passion-icon">🤝</div>
            <h4 class="passion-title">Collaboration</h4>
            <p class="passion-desc">Building bridges between technical teams and business stakeholders</p>
          </div>
        </div>

        <div class="philosophy-section">
          <blockquote class="philosophy-quote">
            "The best code is the code that doesn't need to exist — but when it does,
            it should be elegant, maintainable, and purposeful."
          </blockquote>
          <span class="quote-author">— My Engineering Philosophy</span>
        </div>

      </div>

      <div class="card-footer">
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

<style scoped src="../../assets/css/aboutOverlay.css" />
