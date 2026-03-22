<script setup lang="ts">
import NavHeader from './components/NavHeader.vue'
import HeroGlobe from './components/HeroGlobe.vue'
import SectionAbout from './components/SectionAbout.vue'
import SectionSkills from './components/SectionSkills.vue'
import SectionExperience from './components/SectionExperience.vue'
import SectionProjects from './components/SectionProjects.vue'
import SectionEducation from './components/SectionEducation.vue'
import SectionAwards from './components/SectionAwards.vue'
import SectionContact from './components/SectionContact.vue'
</script>

<template>
  <NavHeader />
  <main>
    <HeroGlobe />
    <SectionAbout />
    <SectionSkills />
    <SectionExperience />
    <SectionProjects />
    <SectionEducation />
    <SectionAwards />
    <SectionContact />
  </main>
</template>
