<template>
  <div class="wave-divider" :class="{ 'wave-divider--flip': flip }">
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path :d="wavePath" :fill="color" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: string
    variant?: 'wave' | 'curve' | 'peaks'
    flip?: boolean
  }>(),
  {
    color: 'var(--color-bg)',
    variant: 'wave',
    flip: false,
  }
)

const wavePath = computed(() => {
  switch (props.variant) {
    case 'curve':
      return 'M0,64 C360,128 1080,0 1440,64 L1440,120 L0,120 Z'
    case 'peaks':
      return 'M0,80 L180,30 L360,70 L540,20 L720,60 L900,25 L1080,65 L1260,30 L1440,80 L1440,120 L0,120 Z'
    default:
      return 'M0,40 C240,100 480,0 720,60 C960,120 1200,20 1440,80 L1440,120 L0,120 Z'
  }
})
</script>

<style scoped>
.wave-divider {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  margin-top: -1px;
}

.wave-divider svg {
  display: block;
  width: 100%;
  height: 80px;
}

.wave-divider--flip {
  transform: scaleY(-1);
  margin-top: 0;
  margin-bottom: -1px;
}

@media (max-width: 768px) {
  .wave-divider svg {
    height: 50px;
  }
}
</style>
