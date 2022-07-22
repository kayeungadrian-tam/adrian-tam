<template>
  <!-- <router-view /> -->
  <router-view v-slot="{ Component, route }">
    <transition name="zoom" mode="out-in">
      <!-- <transition name="slide-left" mode="out-in"> -->
      <!-- <transition name="fade-custom" mode="out-in"> -->
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>

<script>
// import AnimationComponent from "@/components/Utils/Animation.vue";

export default {
  name: "App",
  // components: { AnimationComponent },
  created() {
    document.title = "Adrian Tam";
  },
};
</script>

<style lang="scss">
.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    // transform: scale3d(0.3, 0.3, 0.3);
    transform: translateY(-200px);
  }

  100% {
    opacity: 1;
  }
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  animation-fill-mode: both;

  transition-duration: 1s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-custom-enter-active,
.fade-custom-leave-active {
  transition: opacity 0.5s ease;
}
.fade-custom-enter,
.fade-custom-from,
.fade-custom-leave-to {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,600,600i");
* {
  margin: 0;
  font-family: "Josefin Sans", sans-serif;
}

::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 0px;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #fdb813;
  background-image: linear-gradient(315deg, #fdb813 0%, #788cb6 74%);
}

.page2 {
  padding: 0% 10px 3% 10px;
  background-color: whitesmoke;
}

.footer {
  /* display: flex; */
  position: relative;
  background-color: #26272b;
  /* background-image: linear-gradient(315deg, #26272b 0%, #03002e 74%); */
  border-radius: 1px;
  /* padding: 1% 20px 3% 20px; */
  /* vertical-align: middle; */
}

.test-page {
  background: url(https://images.unsplash.com/photo-1544306094-e2dcf9479da3);
  background-attachment: fixed;
  background-size: cover;
  align-items: center;
  justify-content: center;
}

.page {
  padding: 0% 10px 3% 10px;
  min-height: 50vh;
  background-color: #2d3436;
  background-image: linear-gradient(315deg, #000000 15%, #2d3436 64%);
  color: white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
