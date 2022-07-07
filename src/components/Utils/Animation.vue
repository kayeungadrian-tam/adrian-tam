<template lang="">
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      throttle: 50,
    }"
  >
    <Transition :name="a_class" :class="a_class" mode="in-out">
      <div v-if="isV">
        <slot></slot>
      </div>
      <div v-else>
        <div claas="placeholder"></div>
      </div>
    </Transition>
  </div>
</template>
<script>
export default {
  name: "AnimationComponent",
  props: ["a_class"],
  data() {
    return {
      isV: false,
    };
  },
  methods: {
    visibilityChanged(isVisible) {
      this.isV = isVisible;
    },
  },
};
</script>
<style scoped>
.placeholder {
  display: inherit;
  min-height: 500px;
  width: 100%;
  background-color: transparent;
  border: 0;
  font-size: 25px;
}
.aslide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.aslide-fade-leave-active {
  transition: all 0.5s ease-out;
}
.aslide-fade-enter-from,
.aslide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all 0.5s ease-out;
  transition-delay: 0.1s;
}

.slide-left-leave-active {
  transition: all 0.5s ease-out;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all 0.5s ease-out;
}

.slide-right-leave-active {
  transition: all 0.5s ease-out;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

.fade-in-left {
  -webkit-animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

.puff-in-center {
  -webkit-animation: puff-in-center 0.7s cubic-bezier(0.47, 0, 0.745, 0.715)
    both;
  animation: puff-in-center 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) both;
}

@-webkit-keyframes puff-in-center {
  0% {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    -webkit-filter: blur(4px);
    filter: blur(4px);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
@keyframes puff-in-center {
  0% {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    -webkit-filter: blur(4px);
    filter: blur(4px);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

.slide-in-blurred-top {
  -webkit-animation: slide-in-blurred-top 0.5s
    cubic-bezier(0.075, 0.82, 0.165, 1) both;
  animation: slide-in-blurred-top 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) both;
}

@-webkit-keyframes slide-in-blurred-top {
  0% {
    -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
    transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
@keyframes slide-in-blurred-top {
  0% {
    -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) scaleY(1) scaleX(1);
    transform: translateY(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
}
</style>
