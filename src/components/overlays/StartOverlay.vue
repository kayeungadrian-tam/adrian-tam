<template>
  <div class="threejs-overlay" :class="{ 'threejs-overlay--fade': isFadingOut }" @click="handleClick">
    <!-- Animated background particles -->
    <div class="particles">
      <div v-for="i in 30" :key="i" class="particle" :style="getParticleStyle(i)" />
    </div>

    <!-- Main content -->
    <div class="threejs-overlay-content">
      <h1 class="name">Adrian Tam</h1>

      <div class="typing-container">
        <h2 class="typed-text">
          {{ typedText }}
          <span class="cursor" :class="{ 'cursor--visible': cursorVisible }" />
        </h2>
      </div>

      <p class="subtitle">AI Engineering · Machine Learning · Full-Stack Development</p>

      <!-- Tech stack pills -->
      <div class="tech-pills">
        <span v-for="tech in techStack" :key="tech" class="pill">
          {{ tech }}
        </span>
      </div>

      <!-- CTA Buttons -->
      <div class="cta-section">
        <div class="cta-buttons">
          <button class="cta-btn cta-btn--primary" @click.stop="handleQuickView">
            <fa icon="file-alt" class="cta-btn__icon" />
            <div class="cta-btn__content">
              <span class="cta-btn__title">Quick Overview</span>
              <span class="cta-btn__subtitle">1-minute professional summary</span>
            </div>
          </button>
          <button class="cta-btn cta-btn--secondary" @click.stop="handleExplore">
            <fa icon="cube" class="cta-btn__icon" />
            <div class="cta-btn__content">
              <span class="cta-btn__title">Explore in 3D</span>
              <span class="cta-btn__subtitle">Interactive career journey</span>
            </div>
          </button>
        </div>
        <div class="hint">
          <span>or press</span>
          <kbd class="kbd">Space</kbd>
          <span>to enter 3D experience</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ isFadingOut: boolean }>()
const emit = defineEmits(['fade', 'quickView'])

const typedText = ref('')
const cursorVisible = ref(true)
const fullText = "AI ENGINEER"
const techStack = ['Python', 'Vue', 'TypeScript', 'AI/ML', 'Three.js', 'FastAPI']

// Typing animation with loop
onMounted(() => {
  let index = 0
  let isDeleting = false
  const typingSpeed = 100
  const deletingSpeed = 50
  const pauseEnd = 2000
  const pauseStart = 1000

  const typeText = () => {
    if (!isDeleting && index < fullText.length) {
      // Typing forward
      typedText.value = fullText.slice(0, index + 1)
      index++
      setTimeout(typeText, typingSpeed)
    } else if (!isDeleting && index === fullText.length) {
      // Pause at end before deleting
      isDeleting = true
      setTimeout(typeText, pauseEnd)
    } else if (isDeleting && index > 0) {
      // Deleting backward
      typedText.value = fullText.slice(0, index - 1)
      index--
      setTimeout(typeText, deletingSpeed)
    } else if (isDeleting && index === 0) {
      // Pause at start before typing again
      isDeleting = false
      setTimeout(typeText, pauseStart)
    }
  }

  setTimeout(typeText, 500)

  // Cursor blink
  const cursorInterval = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 530)

  // Keyboard handler
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault()
      emit('fade')
    }
  }
  window.addEventListener('keydown', handleKeyPress)

  onUnmounted(() => {
    clearInterval(cursorInterval)
    window.removeEventListener('keydown', handleKeyPress)
  })
})

const handleClick = (event: MouseEvent) => {
  // Disabled general click to prevent accidental clicks
  // Users must click buttons or press space
}

const handleQuickView = () => {
  emit('quickView')
}

const handleExplore = () => {
  emit('fade')
}

const getParticleStyle = (i: number) => {
  const size = Math.random() * 4 + 2
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animation: `float ${Math.random() * 10 + 15}s linear infinite`,
    animationDelay: `${Math.random() * 5}s`,
  }
}
</script>

<style scoped>
.threejs-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 1;
  transition: opacity 0.7s ease;
  pointer-events: all;
  cursor: pointer;
  overflow: hidden;
}

/* Dark mode: Deep blue gradient with strong backdrop blur */
[data-theme="dark"] .threejs-overlay {
  background: linear-gradient(135deg, rgba(0, 29, 108, 0.82) 0%, rgba(0, 17, 65, 0.68) 55%, rgba(0, 0, 0, 0.9) 90%);
  backdrop-filter: blur(12px);
}

/* Light mode: Soft warm gradient with less opacity to show room */
[data-theme="light"] .threejs-overlay {
  background: linear-gradient(135deg, rgba(255, 248, 240, 0.75) 0%, rgba(245, 245, 250, 0.8) 50%, rgba(232, 240, 254, 0.85) 100%);
  backdrop-filter: blur(8px);
}

.threejs-overlay--fade {
  opacity: 0;
  pointer-events: none;
}

/* Particles */
.particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
}

/* Dark mode particles: Blue tinted */
[data-theme="dark"] .particle {
  background: #d0e1ff;
  opacity: 0.15;
}

/* Light mode particles: Warm golden tinted */
[data-theme="light"] .particle {
  background: #ffa366;
  opacity: 0.12;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) translateX(0);
  }

  25% {
    transform: translateY(-20px) translateX(10px);
  }

  50% {
    transform: translateY(-40px) translateX(-10px);
  }

  75% {
    transform: translateY(-20px) translateX(10px);
  }
}

/* Content */
.threejs-overlay-content {
  position: relative;
  z-index: 10;
  padding: 0 24px;
  max-width: 56rem;
}

.name {
  margin: 0 0 8px;
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -0.01em;
  font-family: 'IBM Plex Sans', sans-serif;
}

/* Dark mode name */
[data-theme="dark"] .name {
  color: #ffffff;
}

/* Light mode name */
[data-theme="light"] .name {
  color: #1a1a1a;
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.8);
}

.typing-container {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
}

.typed-text {
  margin: 0;
  font-size: 36px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Dark mode typed text */
[data-theme="dark"] .typed-text {
  color: #78a9ff;
}

/* Light mode typed text */
[data-theme="light"] .typed-text {
  color: #0f62fe;
  text-shadow: 0 1px 4px rgba(255, 255, 255, 0.6);
}

.cursor {
  display: inline-block;
  width: 3px;
  height: 36px;
  margin-left: 8px;
  transition: opacity 0.1s;
  opacity: 0;
}

/* Dark mode cursor */
[data-theme="dark"] .cursor {
  background: #0f62fe;
}

/* Light mode cursor */
[data-theme="light"] .cursor {
  background: #0043ce;
}

.cursor--visible {
  opacity: 1;
}

.subtitle {
  margin: 0 0 48px;
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Dark mode subtitle */
[data-theme="dark"] .subtitle {
  color: #c6c6c6;
}

/* Light mode subtitle */
[data-theme="light"] .subtitle {
  color: #525252;
}

/* Tech pills */
.tech-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 48px;
}

.pill {
  padding: 6px 14px;
  border-radius: 4px;
  backdrop-filter: blur(10px);
  font-size: 13px;
  font-weight: 400;
  border: 1px solid;
  transition: all 0.2s ease;
}

/* Dark mode pills */
[data-theme="dark"] .pill {
  background: rgba(15, 98, 254, 0.1);
  color: #d0e1ff;
  border-color: rgba(15, 98, 254, 0.3);
}

[data-theme="dark"] .pill:hover {
  background: rgba(15, 98, 254, 0.25);
  border-color: #0f62fe;
  color: #ffffff;
}

/* Light mode pills */
[data-theme="light"] .pill {
  background: rgba(255, 255, 255, 0.7);
  color: #0043ce;
  border-color: rgba(15, 98, 254, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

[data-theme="light"] .pill:hover {
  background: rgba(15, 98, 254, 0.15);
  border-color: #0f62fe;
  color: #001d6c;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* CTA & Hint */
.cta-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.cta-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 28px;
  border-radius: 16px;
  border: 2px solid;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 260px;
  text-align: left;
}

.cta-btn__icon {
  font-size: 28px;
  flex-shrink: 0;
}

.cta-btn__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cta-btn__title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.cta-btn__subtitle {
  font-size: 12px;
  opacity: 0.8;
  font-weight: 400;
}

.cta-btn--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.cta-btn--primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.5);
}

[data-theme="dark"] .cta-btn--secondary {
  border-color: #0f62fe;
  color: #d0e1ff;
  background: rgba(15, 98, 254, 0.1);
  backdrop-filter: blur(10px);
}

[data-theme="dark"] .cta-btn--secondary:hover {
  background: rgba(15, 98, 254, 0.25);
  border-color: #78a9ff;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(15, 98, 254, 0.3);
}

[data-theme="light"] .cta-btn--secondary {
  border-color: #0f62fe;
  color: #0043ce;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

[data-theme="light"] .cta-btn--secondary:hover {
  background: rgba(15, 98, 254, 0.15);
  border-color: #0043ce;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 67, 206, 0.2);
}

.hint {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: attention-pulse 2s ease-in-out infinite;
}

/* Dark mode hint */
[data-theme="dark"] .hint {
  color: #d0e1ff;
}

/* Light mode hint */
[data-theme="light"] .hint {
  color: #0043ce;
}

@keyframes attention-pulse {

  0%,
  100% {
    opacity: 1;
    text-shadow: 0 0 0px rgba(15, 98, 254, 0);
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    text-shadow: 0 0 12px rgba(15, 98, 254, 0.6);
    transform: scale(1.02);
  }
}

.kbd {
  padding: 2px 8px;
  border: 1px solid;
  border-radius: 2px;
  font-size: 11px;
  font-family: 'IBM Plex Mono', monospace;
}

/* Dark mode kbd */
[data-theme="dark"] .kbd {
  background: #393939;
  border-color: #525252;
  color: #f4f4f4;
}

/* Light mode kbd */
[data-theme="light"] .kbd {
  background: #ffffff;
  border-color: #8d8d8d;
  color: #161616;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .name {
    font-size: 40px;
  }

  .typed-text {
    font-size: 24px;
  }

  .cursor {
    height: 24px;
  }

  .typing-container {
    height: 60px;
  }

  .cta-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 320px;
  }

  .cta-btn {
    min-width: auto;
    width: 100%;
  }
}
</style>