<template>
  <div>
    <div class="parallax">
      <div class="name">
        <div v-observe-visibility="visibilityChanged">
          <Transition name="slide-right">
            <h1 v-if="isV">
              KaYeungAdrian Tam
              <el-popover placement="bottom" trigger="hover">
                <template #reference>
                  <el-icon :size="15"><info-filled /></el-icon>
                </template>
                Portfolio description goes here!
              </el-popover>
            </h1>
          </Transition>
          <hr />
          <div>
            <h2>YomamaBanana</h2>
            <div class="date">Last updated: {{ date }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InfoFilled } from "@element-plus/icons-vue";
</script>

<script>
import { ref } from "vue";

export default {
  name: "TopPage",
  data() {
    return {
      dates: ref(new Date()),
      date: "2022-05-15",
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
.slide-right-enter-active {
  transition: all 0.5s ease-out;
}

.slide-right-leave-active {
  transition: all 0.5s ease-out;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(250px);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all 0.5s ease-out;
}

.slide-left-leave-active {
  transition: all 0.5s ease-out;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-250px);
  opacity: 0;
}

.parallax {
  background: url("@/assets/img/background2.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  height: 105vh;
  background-size: cover;
  text-align: center;
  background-position-x: 50%;
  background-position-y: 0%;
  justify-content: center;
}

@keyframes grow {
  0% {
    transform: scale(1) translateY(0px);
  }
  50% {
    transform: scale(1.2) translateY(-100px);
  }
}

@-webkit-keyframes zoomin {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.2) translateY(-60px);
    transform: scale(1.2) translateY(-60px);
  }
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.date {
  font-size: 0.7em;
  position: absolute;
  vertical-align: bottom;
  font-style: italic;
  display: flex;
  margin-top: 200px;
  left: 75%;
}

hr {
  margin: 20px;
}

.name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 400;
  color: #eee;
  margin: 0;
  font-family: "Josefin Sans", sans-serif;
}

@media (max-width: 992px) {
  .name {
    widows: 55%;
  }
  .name h1 {
    font-size: 1.5rem;
    padding: 2px 10px;
    text-align: center;
    /* text-transform: uppercase; */
    color: #eee;
  }
  .name h2 {
    font-size: 1rem;
    padding: 2px 10px;
    text-align: center;
    text-transform: uppercase;
    color: #eee;
  }
}
@media (min-width: 992px) {
  .name {
    widows: 100%;
  }
  .name h1 {
    font-size: 2.3rem;
    padding: 2px 10px;
    text-align: center;
    color: #eee;
  }
  .name h2 {
    font-size: 1.5rem;
    padding: 2px 10px;
    text-align: center;
    text-transform: uppercase;
    color: #eee;
  }
}
@media only screen and (max-device-width: 1024px) {
  .parallax {
    background-attachment: scroll;
  }
}
</style>
