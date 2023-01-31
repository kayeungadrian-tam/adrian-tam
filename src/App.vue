<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'

document.title = "Adrian Tam ";

</script>

<template>
  <NavBar />

  <body>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </body>
  <div class="area">
    <div class="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>

    </div>
  </div>
</template>

<style scoped>
@import "assets/css/bubbles_bg.css";


.fade-enter-active {
  transition: opacity 1.0s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
