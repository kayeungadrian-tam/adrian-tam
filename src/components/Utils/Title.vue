<template>
  <div
    class="title"
    v-observe-visibility="{
      callback: visibilityChanged,
      throttle: 50,
    }"
  >
    <Transition name="aslide-fade" mode="in-out">
      <h2 v-if="isV">{{ title }}</h2>
    </Transition>

    <Transition name="slide-left" mode="in-out">
      <div v-if="isV" class="wrapper">
        <div class="text-wrapper">{{ description }}</div>
      </div>
    </Transition>
  </div>
  <hr width="200" />
</template>

<script>
export default {
  name: "TitleComponent",
  props: ["title", "description"],
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
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,600,600i");
.title {
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 80px;
  padding: 2% 0% 1% 0%;
}
hr {
  width: 10%;
  margin: auto;
}

h2 {
  font-size: 2.5rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.text-wrapper {
  text-transform: uppercase;
  &:after {
    content: "";
    width: 150px;
    display: flex;
  }
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
  transform: translateY(-50px);
  opacity: 0;
}
</style>
