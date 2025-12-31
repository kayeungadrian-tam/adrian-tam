<template>
  <div class="overlay" @click="$emit('close')">
    <div class="overlay-card" @click.stop>
      <div class="glow-effect"></div>

      <div class="card-header">
        <span class="label">EDU_03</span>
        <h2 class="title">Education</h2>
        <div class="header-line"></div>
        <p class="subtitle">Academic Background & Qualifications</p>
      </div>

      <div class="card-body">

        <!-- University of Auckland -->
        <div class="education-item featured">
          <div class="edu-icon-wrapper">
            <div class="edu-icon">🎓</div>
          </div>
          <div class="edu-content">
            <div class="edu-header">
              <div class="edu-title-group">
                <h3 class="edu-title">University of Auckland</h3>
                <a href="https://www.auckland.ac.nz/en.html" target="_blank" class="edu-link">
                  Visit Website
                  <span class="external-icon">↗</span>
                </a>
              </div>
              <span class="edu-date">2013 - 2018</span>
            </div>

            <div class="degrees-section">
              <div class="degree-item">
                <div class="degree-header">
                  <span class="degree-icon">📐</span>
                  <h4 class="degree-title">Bachelor of Science</h4>
                </div>
                <p class="degree-major">Mathematics & Applied Mathematics</p>
                <p class="degree-description">
                  Specialized in mathematical modeling, statistical analysis, and computational mathematics.
                  Developed strong foundation in algorithms, data structures, and mathematical proofs that
                  became instrumental in my AI/ML career.
                </p>
              </div>

              <div class="degree-item">
                <div class="degree-header">
                  <span class="degree-icon">🇯🇵</span>
                  <h4 class="degree-title">Bachelor of Arts</h4>
                </div>
                <p class="degree-major">Japanese Language & Culture</p>
                <p class="degree-description">
                  Achieved professional-level fluency in Japanese language. This degree enabled seamless
                  integration into the Japanese tech industry and facilitated my work with international
                  teams across cultural boundaries.
                </p>
              </div>
            </div>

            <div class="achievements">
              <h4 class="achievements-title">Key Highlights</h4>
              <div class="achievement-tags">
                <span class="achievement-tag">Double Major</span>
                <span class="achievement-tag">5 Years</span>
                <span class="achievement-tag">STEM + Humanities</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Hiroshima University -->
        <div class="education-item">
          <div class="edu-icon-wrapper">
            <div class="edu-icon scholarship">🏆</div>
          </div>
          <div class="edu-content">
            <div class="edu-header">
              <div class="edu-title-group">
                <h3 class="edu-title">Hiroshima University</h3>
                <a href="https://www.hiroshima-u.ac.jp/en" target="_blank" class="edu-link">
                  Visit Website
                  <span class="external-icon">↗</span>
                </a>
              </div>
              <span class="edu-date">2015 - 2016</span>
            </div>

            <div class="program-section">
              <div class="program-badge">
                <span class="badge-icon">✨</span>
                MEXT Scholarship Recipient
              </div>
              <h4 class="program-title">Exchange Program</h4>
              <p class="program-description">
                Selected as a MEXT (Japanese Government) Scholarship recipient for a prestigious
                1-year exchange program. This immersive experience deepened my understanding of
                Japanese culture, enhanced language proficiency, and established valuable networks
                in the Japanese academic and professional communities.
              </p>
            </div>

            <div class="highlights-grid">
              <div class="highlight-item">
                <span class="highlight-icon">🌏</span>
                <span class="highlight-text">Cultural Immersion</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">💼</span>
                <span class="highlight-text">Professional Networks</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">🗣️</span>
                <span class="highlight-text">Advanced Japanese</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Developed Section -->
        <div class="skills-section">
          <h3 class="skills-title">
            <span class="title-icon">🎯</span>
            Skills Developed Through Education
          </h3>
          <div class="skills-grid">
            <div class="skill-category">
              <h4 class="category-title">Mathematical & Analytical</h4>
              <div class="skill-tags">
                <span class="skill-tag">Statistical Analysis</span>
                <span class="skill-tag">Mathematical Modeling</span>
                <span class="skill-tag">Algorithm Design</span>
                <span class="skill-tag">Data Structures</span>
              </div>
            </div>
            <div class="skill-category">
              <h4 class="category-title">Communication & Cultural</h4>
              <div class="skill-tags">
                <span class="skill-tag">Japanese (Native Level)</span>
                <span class="skill-tag">Cross-Cultural Communication</span>
                <span class="skill-tag">Technical Translation</span>
                <span class="skill-tag">International Collaboration</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="card-footer">
        <div class="education-summary">
          <div class="summary-stat">
            <span class="stat-number">2</span>
            <span class="stat-label">Degrees</span>
          </div>
          <div class="summary-stat">
            <span class="stat-number">2</span>
            <span class="stat-label">Countries</span>
          </div>
          <div class="summary-stat">
            <span class="stat-number">1</span>
            <span class="stat-label">Scholarship</span>
          </div>
        </div>
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

<style scoped src="../../assets/css/educationOverlay.css" />
