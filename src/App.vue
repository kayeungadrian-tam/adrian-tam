<script setup lang="ts">
import NavHeader from './components/NavHeader.vue'
import HeroGlobe from './components/HeroGlobe.vue'
import SectionAbout from './components/SectionAbout.vue'
import SectionImpact from './components/SectionImpact.vue'
import SectionSkills from './components/SectionSkills.vue'
import SectionExperience from './components/SectionExperience.vue'
import SectionProjects from './components/SectionProjects.vue'
import SectionEducation from './components/SectionEducation.vue'
import SectionAwards from './components/SectionAwards.vue'
import SectionContact from './components/SectionContact.vue'
import CustomCursor from './components/CustomCursor.vue'
import WaveDivider from './components/WaveDivider.vue'
import { useDarkMode } from './composables/useDarkMode'

// Initialize dark mode (sets data-theme on <html>)
useDarkMode()
</script>

<template>
  <CustomCursor />
  <NavHeader />
  <main>
    <HeroGlobe />
    <WaveDivider color="var(--color-bg-alt)" variant="wave" />
    <SectionAbout />
    <WaveDivider color="var(--color-bg)" variant="curve" flip />
    <SectionImpact />
    <SectionSkills />
    <WaveDivider color="var(--color-bg-alt)" variant="peaks" />
    <SectionExperience />
    <WaveDivider color="var(--color-bg)" variant="wave" flip />
    <SectionProjects />
    <WaveDivider color="var(--color-bg-alt)" variant="curve" />
    <SectionEducation />
    <WaveDivider color="var(--color-bg)" variant="peaks" flip />
    <SectionAwards />
    <WaveDivider color="var(--color-bg-alt)" variant="wave" />
    <SectionContact />
  </main>
</template>
