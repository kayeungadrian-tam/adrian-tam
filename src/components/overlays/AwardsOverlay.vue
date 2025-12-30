<template>
    <div class="overlay" @click="$emit('close')">
        <div class="overlay-card" @click.stop>
            <div class="glow-effect"></div>

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
