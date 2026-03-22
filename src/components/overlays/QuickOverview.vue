<script setup lang="ts">
import projectsData from '../../data/projects'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'explore'): void
}>()

interface Skill {
  name: string
  level: number // 1-5
  years: number
}

interface Experience {
  title: string
  company: string
  period: string
  highlights: string[]
  tech: string[]
}

const skills: Skill[] = [
  { name: 'Python', level: 5, years: 6 },
  { name: 'Vue / TypeScript', level: 4, years: 4 },
  { name: 'AI/ML (TensorFlow, PyTorch)', level: 5, years: 5 },
  { name: 'FastAPI', level: 4, years: 3 },
  { name: 'Docker', level: 4, years: 4 },
  { name: 'Three.js', level: 3, years: 2 },
  { name: 'OpenCV', level: 4, years: 4 },
  { name: 'Cloud (IBM Cloud, AWS)', level: 4, years: 3 },
]

const experience: Experience[] = [
  {
    title: 'AI Engineer',
    company: 'IBM Japan',
    period: '2023 - Present',
    highlights: [
      'Causal discovery system development and advisory',
      'IBM Corporate Award recipient (2023)',
      'IBM Excellence Award recipient (2022)',
    ],
    tech: ['Python', 'AI/ML', 'IBM Cloud', 'watsonx'],
  },
  {
    title: 'AI Team Lead',
    company: 'AMBL Co.',
    period: '2021 - 2023',
    highlights: [
      'AI development for Learning Management System (LMS)',
      'Causal discovery system advisor',
      'Led AI team initiatives and project delivery',
    ],
    tech: ['Python', 'TensorFlow', 'FastAPI', 'Docker'],
  },
  {
    title: 'ML Engineer',
    company: 'iPX Co.',
    period: '2020 - 2021',
    highlights: [
      'Object detection system development and deployment',
      'Data analysis for automotives',
      'Implementation of machine learning papers (distillation learning)',
    ],
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Docker'],
  },
  {
    title: 'CIR (Coordinator for International Relations)',
    company: 'Kyotango City',
    period: '2018 - 2020',
    highlights: [
      'International correspondent for 2021 Tokyo Olympics (Spain, Belgium)',
      'Multi-cultural promotions',
      'Translation & interpreting (English / Japanese)',
    ],
    tech: ['Translation', 'Cross-cultural Communication'],
  },
]

const projects = projectsData.slice(0, 4).map((p) => ({
  name: p.description,
  description: p.overview,
  tech: p.tags,
  link: p.link,
}))
</script>

<template>
  <div class="quick-overview">
    <div class="quick-overview__container">
      <!-- Header -->
      <div class="quick-overview__header">
        <div class="quick-overview__title-section">
          <h1 class="quick-overview__name">Adrian Tam</h1>
          <p class="quick-overview__tagline">AI Engineer</p>
          <div class="quick-overview__location">
            <fa icon="location-dot" /> Tokyo
          </div>
        </div>
        <div class="quick-overview__actions">
          <button class="quick-overview__btn quick-overview__btn--secondary" @click="emit('explore')">
            <fa icon="cube" /> Explore in 3D
          </button>
        </div>
      </div>

      <!-- Summary -->
      <section class="quick-overview__section">
        <h2 class="quick-overview__section-title">
          <fa icon="user" /> About
        </h2>
        <p class="quick-overview__summary">
          AI Engineer based in Tokyo with experience spanning machine learning, computer vision, and full-stack development.
          Currently at IBM Japan, building causal discovery systems and enterprise AI solutions.
          Background in mathematics and Japanese, with a passion for bridging technology and cross-cultural communication.
        </p>
      </section>

      <!-- Skills -->
      <section class="quick-overview__section">
        <h2 class="quick-overview__section-title">
          <fa icon="code" /> Technical Skills
        </h2>
        <div class="quick-overview__skills">
          <div v-for="skill in skills" :key="skill.name" class="skill-card">
            <div class="skill-card__header">
              <span class="skill-card__name">{{ skill.name }}</span>
              <span class="skill-card__years">{{ skill.years }}y</span>
            </div>
            <div class="skill-card__bar">
              <div
                class="skill-card__fill"
                :style="{ width: `${(skill.level / 5) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience -->
      <section class="quick-overview__section">
        <h2 class="quick-overview__section-title">
          <fa icon="briefcase" /> Experience
        </h2>
        <div class="experience-timeline">
          <div v-for="(job, index) in experience" :key="index" class="experience-card">
            <div class="experience-card__header">
              <div>
                <h3 class="experience-card__title">{{ job.title }}</h3>
                <p class="experience-card__company">{{ job.company }}</p>
              </div>
              <span class="experience-card__period">{{ job.period }}</span>
            </div>
            <ul class="experience-card__highlights">
              <li v-for="(highlight, i) in job.highlights" :key="i">{{ highlight }}</li>
            </ul>
            <div class="experience-card__tech">
              <span v-for="tech in job.tech" :key="tech" class="tech-tag">{{ tech }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section class="quick-overview__section">
        <h2 class="quick-overview__section-title">
          <fa icon="rocket" /> Featured Projects
        </h2>
        <div class="projects-grid">
          <a
            v-for="project in projects"
            :key="project.name"
            :href="project.link"
            target="_blank"
            rel="noreferrer"
            class="project-card"
          >
            <h3 class="project-card__name">{{ project.name }}</h3>
            <p class="project-card__description">{{ project.description }}</p>
            <div class="project-card__tech">
              <span v-for="tech in project.tech" :key="tech" class="tech-tag tech-tag--small">
                {{ tech }}
              </span>
            </div>
          </a>
        </div>
      </section>

      <!-- Contact -->
      <section class="quick-overview__section quick-overview__section--contact">
        <h2 class="quick-overview__section-title">
          <fa icon="envelope" /> Let's Connect
        </h2>
        <div class="contact-links">
          <a href="mailto:tamkayeung.adrian@gmail.com" class="contact-link">
            <fa icon="envelope" /> Email
          </a>
          <a href="https://www.linkedin.com/in/kayeungadrian-tam/" target="_blank" class="contact-link">
            <fa :icon="['fab', 'linkedin']" /> LinkedIn
          </a>
          <a href="https://github.com/kayeungadrian-tam" target="_blank" class="contact-link">
            <fa :icon="['fab', 'github']" /> GitHub
          </a>
        </div>
      </section>

      <!-- Footer -->
      <div class="quick-overview__footer">
        <p>Want the full experience?</p>
        <button class="quick-overview__explore-btn" @click="emit('explore')">
          <fa icon="cube" /> Explore My Interactive Journey
        </button>
      </div>
    </div>

    <button class="quick-overview__close" @click="emit('close')" aria-label="Close overview">
      <fa icon="times" />
    </button>
  </div>
</template>

<style scoped>
.quick-overview {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: var(--stage-bg);
  overflow-y: auto;
  animation: fadeIn 0.3s ease;
}

.quick-overview__container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 60px 32px 120px;
}

.quick-overview__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 2px solid var(--theme-toggle-border);
}

.quick-overview__name {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.quick-overview__tagline {
  font-size: 20px;
  color: var(--stage-hint-text);
  margin: 0 0 12px 0;
  opacity: 0.9;
}

.quick-overview__location {
  font-size: 14px;
  color: var(--stage-hint-text);
  opacity: 0.7;
  display: flex;
  align-items: center;
  gap: 6px;
}

.quick-overview__actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.quick-overview__btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  white-space: nowrap;
}

.quick-overview__btn--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.quick-overview__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.quick-overview__btn--secondary {
  background: var(--theme-toggle-bg);
  color: var(--stage-hint-text);
  border: 2px solid var(--theme-toggle-border);
}

.quick-overview__btn--secondary:hover {
  background: var(--theme-toggle-hover-bg);
  transform: translateY(-2px);
}

.quick-overview__section {
  margin-bottom: 48px;
}

.quick-overview__section-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: var(--stage-hint-text);
  display: flex;
  align-items: center;
  gap: 12px;
}

.quick-overview__summary {
  font-size: 16px;
  line-height: 1.7;
  color: var(--stage-hint-text);
  opacity: 0.85;
}

/* Skills */
.quick-overview__skills {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.skill-card {
  padding: 16px;
  background: var(--theme-toggle-bg);
  border: 1px solid var(--theme-toggle-border);
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.skill-card:hover {
  transform: translateY(-2px);
}

.skill-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.skill-card__name {
  font-weight: 600;
  font-size: 15px;
  color: var(--stage-hint-text);
}

.skill-card__years {
  font-size: 13px;
  opacity: 0.6;
  color: var(--stage-hint-text);
}

.skill-card__bar {
  height: 6px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.skill-card__fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
  transition: width 0.6s ease;
}

/* Experience */
.experience-timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.experience-card {
  padding: 24px;
  background: var(--theme-toggle-bg);
  border: 1px solid var(--theme-toggle-border);
  border-radius: 16px;
  border-left: 4px solid #667eea;
}

.experience-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
}

.experience-card__title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 6px 0;
  color: var(--stage-hint-text);
}

.experience-card__company {
  font-size: 16px;
  margin: 0;
  color: var(--stage-hint-text);
  opacity: 0.7;
}

.experience-card__period {
  font-size: 14px;
  color: var(--stage-hint-text);
  opacity: 0.6;
  white-space: nowrap;
}

.experience-card__highlights {
  margin: 0 0 16px 0;
  padding-left: 20px;
  color: var(--stage-hint-text);
  opacity: 0.85;
}

.experience-card__highlights li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.experience-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* Projects */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.project-card {
  padding: 24px;
  background: var(--theme-toggle-bg);
  border: 1px solid var(--theme-toggle-border);
  border-radius: 16px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: block;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.2);
  border-color: #667eea;
}

.project-card__name {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: var(--stage-hint-text);
}

.project-card__description {
  font-size: 14px;
  color: var(--stage-hint-text);
  opacity: 0.75;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* Tech tags */
.tech-tag {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.tech-tag--small {
  padding: 4px 10px;
  font-size: 11px;
}

/* Contact */
.quick-overview__section--contact {
  text-align: center;
  padding: 32px;
  background: var(--theme-toggle-bg);
  border: 1px solid var(--theme-toggle-border);
  border-radius: 16px;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: transform 0.2s ease;
}

.contact-link:hover {
  transform: translateY(-2px);
}

/* Footer */
.quick-overview__footer {
  text-align: center;
  padding: 48px 0 0;
  margin-top: 48px;
  border-top: 2px solid var(--theme-toggle-border);
}

.quick-overview__footer p {
  font-size: 18px;
  color: var(--stage-hint-text);
  margin: 0 0 20px 0;
  opacity: 0.8;
}

.quick-overview__explore-btn {
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.quick-overview__explore-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(102, 126, 234, 0.4);
}

/* Close button */
.quick-overview__close {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--theme-toggle-bg);
  border: 1px solid var(--theme-toggle-border);
  color: var(--stage-hint-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.2s ease;
  z-index: 101;
}

.quick-overview__close:hover {
  background: var(--theme-toggle-hover-bg);
  transform: rotate(90deg);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .quick-overview__container {
    padding: 40px 20px 100px;
  }

  .quick-overview__header {
    flex-direction: column;
  }

  .quick-overview__name {
    font-size: 36px;
  }

  .quick-overview__actions {
    width: 100%;
    flex-direction: column;
  }

  .quick-overview__btn {
    width: 100%;
    justify-content: center;
  }

  .quick-overview__skills {
    grid-template-columns: 1fr;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .contact-links {
    flex-direction: column;
    gap: 12px;
  }

  .contact-link {
    justify-content: center;
  }
}
</style>
