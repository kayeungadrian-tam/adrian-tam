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

      <p class="subtitle">Full-Stack · AI · Cloud · Mobile · Everything In Between</p>

      <!-- Tech stack pills -->
      <div class="tech-pills">
        <span v-for="tech in techStack" :key="tech" class="pill">
          {{ tech }}
        </span>
      </div>

      <!-- CTA -->
      <div class="cta-section">

        <div class="hint">
          <span>Press</span>
          <kbd class="kbd">Space</kbd>
          <span>to explore</span>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ isFadingOut: boolean }>()
const emit = defineEmits(['fade'])

const typedText = ref('')
const cursorVisible = ref(true)
const fullText = "ALL STACK ENGINEER"
const techStack = ['React', 'Python', 'AI/ML', 'Node.js', 'Cloud', 'DevOps']

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

const handleClick = () => {
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
  /* IBM Deep Blue to Black gradient */
  background: linear-gradient(135deg, #001d6c 0%, #00114173 50%, #000000 100%);
  backdrop-filter: blur(12px);
  text-align: center;
  opacity: 1;
  transition: opacity 0.7s ease;
  pointer-events: all;
  cursor: pointer;
  overflow: hidden;
}

.threejs-overlay--fade {
  opacity: 0;
  pointer-events: none;
}

/* Particles - made slightly more subtle and blue-tinted */
.particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: #d0e1ff;
  /* IBM Blue 20 */
  opacity: 0.15;
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
  color: #ffffff;
  letter-spacing: -0.01em;
  font-family: 'IBM Plex Sans', sans-serif;
  /* Recommended font if available */
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
  color: #78a9ff;
  /* IBM Blue 30 */
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.cursor {
  display: inline-block;
  width: 3px;
  height: 36px;
  background: #0f62fe;
  /* IBM Blue 60 */
  margin-left: 8px;
  transition: opacity 0.1s;
  opacity: 0;
}

.cursor--visible {
  opacity: 1;
}

.subtitle {
  margin: 0 0 48px;
  font-size: 16px;
  color: #c6c6c6;
  /* IBM Gray 30 */
  font-weight: 300;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Tech pills - IBM "Carbon" style */
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
  /* IBM style uses less rounded corners */
  background: rgba(15, 98, 254, 0.1);
  backdrop-filter: blur(10px);
  color: #d0e1ff;
  font-size: 13px;
  font-weight: 400;
  border: 1px solid rgba(15, 98, 254, 0.3);
  transition: all 0.2s ease;
}

.pill:hover {
  background: rgba(15, 98, 254, 0.25);
  border-color: #0f62fe;
  color: #ffffff;
}

/* CTA & Hint */
.cta-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.hint {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #d0e1ff;
  /* IBM Blue 20 */
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  /* Apply the animation here */
  animation: attention-pulse 2s ease-in-out infinite;
}

@keyframes attention-pulse {

  0%,
  100% {
    opacity: 1;
    text-shadow: 0 0 0px rgba(15, 98, 254, 0);
    transform: scale(1);
  }

  50% {
    opacity: 0.4;
    /* Dims significantly */
    text-shadow: 0 0 12px rgba(15, 98, 254, 0.8);
    /* Glows blue */
    transform: scale(1.02);
    /* Slight grow effect */
  }
}

.kbd {
  padding: 2px 8px;
  background: #393939;
  border: 1px solid #525252;
  color: #f4f4f4;
  border-radius: 2px;
  font-size: 11px;
  font-family: 'IBM Plex Mono', monospace;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }
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
}
</style>