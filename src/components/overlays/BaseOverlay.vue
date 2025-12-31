<template>
    <div class="overlay" @click="$emit('close')">
        <div class="overlay-card" @click.stop>
            <div class="glow-effect"></div>

            <div class="card-header">
                <div class="header-top">
                    <span class="label">{{ label }}</span>
                    <h2 class="title">{{ title }}</h2>
                </div>
                <div class="header-line"></div>
                <p class="subtitle">{{ subtitle }}</p>
            </div>

            <div class="card-body">
                <slot></slot>
            </div>

            <div class="card-footer">
                <slot name="footer"></slot>


                <div class="close-hint">
                    <span class="pulse-dot"></span>
                    Press <kbd class="kbd">Spacebar</kbd> to close_
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    title: String,
    subtitle: String,
    stats: {
        type: Array,
        default: () => []
    }
});

defineEmits(['close']);
</script>



<style scoped src="../../assets/css/workOverlay.css" />