<template lang="">
 <div 
       v-observe-visibility="{
        callback: visibilityChanged,
        throttle: 50,
      }"
    >
        <Transition :name="a_class" mode="in-out">
            <div v-if="isV">
                <slot></slot>
            </div>
            <div v-else>
                <div claas="placeholder">
                </div>
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
}
</script>
<style scoped>

.placeholder {
    min-height: 200px;
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


</style>