<template>
  <BaseOverlay label="WORK_02" title="Career History" subtitle="Work & Education" :stats="projectStats"
    @close="$emit('close')">
    <div class="projects-list">
      <div v-for="(entry, index) in careerEntries" :key="index" class="project-item">
        <div class="project-header">
          <div class="project-icon">{{ entry.icon }}</div>
          <div class="project-title-group">
            <h3 class="project-title">{{ entry.title }}</h3>
            <span class="project-date">{{ entry.period }}</span>
          </div>
        </div>
        <p class="project-description">
          <a v-if="entry.website" :href="entry.website" target="_blank" rel="noreferrer" class="company-link">
            {{ entry.location }}
          </a>
          <span v-else>{{ entry.location }}</span>
        </p>
        <p class="project-description">{{ entry.description }}</p>
        <div v-if="entry.tags.length" class="tech-stack">
          <span v-for="(tag, tIndex) in entry.tags" :key="tIndex" class="tech-tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="stats-summary">
        <div v-for="(stat, index) in projectStats" :key="index" class="summary-item">
          <span class="summary-value">{{ stat.value }}</span>
          <span class="summary-label">{{ stat.label }}</span>
        </div>
      </div>
    </template>
  </BaseOverlay>
</template>

<script setup>
import BaseOverlay from './BaseOverlay.vue';
import timeline from '../../data/timeline';

const projectStats = [
  { value: '5+', label: 'Years Experience' },
  { value: '4', label: 'Companies' },
  { value: '2', label: 'IBM Awards' }
];

const careerEntries = timeline.map((entry) => ({
  icon: entry.icon === 'fa-solid fa-school' ? '🎓' : '💼',
  title: entry.title,
  location: entry.location,
  period: `${entry.start} - ${entry.end}`,
  website: entry.website,
  description: entry.description.replace(/<br>/g, '\n').replace(/^\s*-\s*/gm, '').replace(/\s+/g, ' ').trim(),
  tags: entry.icon === 'fa-solid fa-school'
    ? ['Education']
    : entry.title.includes('CIR')
      ? ['Translation', 'Cross-cultural']
      : ['Python', 'AI/ML'],
}));
</script>

<style scoped src="../../assets/css/workOverlay.css" />
