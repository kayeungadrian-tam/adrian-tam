<template>
  <BaseOverlay label="WORK_02" title="Recent Projects" subtitle="AI Engineering @ IBM" :stats="projectStats"
    @close="$emit('close')">
    <div class="projects-list">
      <div v-for="(project, index) in projects" :key="index" class="project-item">
        <div class="project-header">
          <div class="project-icon">{{ project.icon }}</div>
          <div class="project-title-group">
            <h3 class="project-title">{{ project.title }}</h3>
            <span class="project-date">{{ project.date }}</span>
          </div>
        </div>
        <p class="project-description">
          {{ project.description }}
        </p>
        <div class="tech-stack">
          <span v-for="(tag, tIndex) in project.tags" :key="tIndex" class="tech-tag">{{ tag }}</span>
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

const projectStats = [
  { value: '15+', label: 'Projects Delivered' },
  { value: '$2M+', label: 'Cost Savings' },
  { value: '99.9%', label: 'Uptime' }
];

const projects = [
  {
    icon: '🤖',
    title: 'watsonx Enterprise AI Platform',
    date: '2024 - Present',
    description: "Leading development of next-gen AI solutions...",
    tags: ['Python', 'TensorFlow', 'Kubernetes']
  },
  // ... rest of your project data
];
</script>

<style scoped src="../../assets/css/workOverlay.css" />