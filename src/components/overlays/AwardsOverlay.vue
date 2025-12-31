<template>
    <BaseOverlay label="AWARDS_01" title="Awards & Recognitions" subtitle="Honors Received Over the Years"
        @close="$emit('close')">
        <div class="awards-list">
            <div class="award-item">
                <div class="award-header">
                    <div class="award-icon">🏆</div>
                    <div class="award-title-group">
                        <h3 class="award-title">IBM Corporate Award</h3>
                        <span class="award-date">2023</span>
                    </div>
                </div>
                <p class="award-description">
                    The IBM Corporate Award recognizes outstanding contributions to the company's success.
                </p>
            </div>
            <div class="award-item">
                <div class="award-header">
                    <div class="award-icon">🎖️</div>
                    <div class="award-title-group">
                        <h3 class="award-title">IBM Excellence Award</h3>
                        <span class="award-date">2022</span>
                    </div>
                </div>
                <p class="award-description">
                    The IBM Excellence Award honors exceptional performance and dedication to excellence.
                </p>
            </div>
        </div>
    </BaseOverlay>
</template>


<script setup>
import BaseOverlay from './BaseOverlay.vue';

</script>

<style scoped src="../../assets/css/awardsOverlay.css" />