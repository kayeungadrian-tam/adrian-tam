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
            <div class="info">Last updated: {{ date }}</div>
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
  height: 100vh;
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

.info {
  font-size: 0.7em;
  flex: 0 0 auto;
  display: flex-end;
  flex-direction: column;
  justify-content: center;
  vertical-align: bottom;
  font-style: italic;
  display: inline-block;
  align-self: flex-end;
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
  .wrapper-name {
    width: 250px;
  }
  h1 {
    font-size: 2.3rem;
    padding: 2px 10px;
    text-align: center;
    text-transform: uppercase;
    color: #eee;
  }
  p {
    font-size: 1.5rem;
    text-align: center;
    margin: 5px auto;
    color: #eee;
  }
  hr {
    border: 1px solid whitesmoke;
  }
}
@media (min-width: #{map-get($breakpoints, small)}) {
  .name {
    .wrapper-name {
      width: 55%;
    }
    h1 {
      font-size: 2.8rem;
      padding: 4% 8%;
    }
    p {
      font-size: 2rem;
    }
  }
}
@media (min-width: #{map-get($breakpoints, medium)}) {
  .name {
    .wrapper-name {
      width: 450px;
    }
    h1 {
      font-size: 4rem;
      padding: 4% 10%;
    }
    p {
      font-size: 2.5rem;
    }
  }
}
@media only screen and (max-device-width: 1024px) {
  .parallax {
    background-attachment: scroll;
  }
}
</style>
