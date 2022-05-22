<template>
  <div class="title_box">
    <div
      class="title"
      v-observe-visibility="{
        callback: visibilityChanged,
        throttle: 50,
      }"
    >
      <Transition name="aslide-fade" mode="in-out">
        <div class="suptitle" v-if="isV">{{ title }}</div>
      </Transition>

      <Transition name="slide-left" mode="in-out">
        <div v-if="isV" class="wrapper">
          <div class="text-wrapper">{{ description }}</div>
        </div>
      </Transition>
    </div>
    <hr />
  </div>
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

@media (max-width: 992px) {
  .suptitle {
    font-size: 2rem;
  }
  .text-wrapper {
    font-size: 0.8rem;
  }
  hr {
    width: 30%;
    margin: auto;
  }
  .title_box {
    height: 15vh;
    padding-top: 1.5%;
  }
}

@media (min-width: 992px) {
  .suptitle {
    font-size: 2.5rem;
  }
  .text-wrapper {
    font-size: 1.1rem;
  }
  hr {
    width: 20%;
    margin: auto;
  }
  .title_box {
    height: 18vh;
  }
}

.title {
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2% 0% 1% 0%;
}

h2 {
  font-size: 2.5rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.title .wrapper {
  margin-top: 1%;
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
</style>
