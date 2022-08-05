<template>
  <!-- <div class="page" id="projectTop"> -->
  <TitleComponent :title="title" :description="description" />
  <br />

  <el-row class="row-bg" justify="space-evenly">
    <el-col :span="16">
      <div class="container">
        <div class="card" v-for="(item, index) in projectList" :key="item">
          <figure class="card__thumb">
            <img
              :src="item.img"
              alt="Picture by Kyle Cottrell"
              class="card__image"
            />
            <div class="card__caption">
              <h2 class="card__title">Projects {{ index + 1 }}</h2>
              <div class="card__snippets">
                <h1>{{ item.description }}</h1>
                <p>
                  {{ item.overview }}
                </p>
              </div>
              <div class="tag">
                <div
                  v-for="tag in item.tags"
                  :class="tag"
                  :key="tag"
                  :type="tag"
                  effect="dark"
                >
                  {{ tag }}
                </div>
              </div>
              <!-- <a href="" class="card__button">Read more</a> -->
              <!-- <div id="containers" class="go-down" style="padding-top: 20px;"> -->
              <button class="card__button" @click="showPage(item.link)">
                <!-- <span class="circle mobile" aria-hidden="true"> -->
                <!-- <span class="icon arrow" style="rotate: 90;"></span> -->
                <!-- </span> -->
                <span class="button-text">Learn More</span>
              </button>
              <!-- </div> -->
            </div>
          </figure>
        </div>
      </div>
    </el-col>
  </el-row>
  <!-- </div> -->
</template>

<style lang="scss" scoped>
@import "../../assets/styles/scss/button.scss";
@import "../../assets/styles/scss/cards.scss";
@import "../../assets/styles/css/tags.css";
</style>

<style scoped>
h1 {
  font-size: 2.2rem;
  line-height: 40px;
  padding: 1.8rem;
}

.tag {
  position: relative;
  padding-top: 25px;
  /* display: -webkit-inline-flex; */
  /* justify-content: space-evenly; */
  gap: 5px;
  align-items: center;
  align-content: center;
  /* bottom: 10px; */
  margin-left: 2px;
}

.af {
  position: relative;
  top: -20px;
  padding-left: 220px;
}
.thumbnail {
  padding: 20px 0px 10px 0px;
}

.project-detail {
  max-width: 1000px;
  align-content: center;
  display: inline-block;
  /* min-height: 100vh; */
  margin-bottom: 40px;
}

@media (min-height: 700px) {
  .row-bg {
    /* background-color: #f5f5f5; */
    height: 100%;
  }
  .containers {
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.15);
    padding: 2% 10% 0% 10%;
    display: flex;
    flex-direction: column;
    height: 95%;
    backdrop-filter: blur(1px);
    align-items: center;
  }
}
.go-up {
  /* padding: 10% 0 100 0; */
  display: relative;
  margin: -85px 0 0 65%;
}
.go-down {
  /* padding: 10% 0 100 0; */
}
.overview {
  margin-top: 20px;
  line-height: 1.5;
  text-align: justify;
}
.github {
  font-size: 3rem;
  color: #fff;
}

.github:hover {
  font-size: 3rem;
  /* color: ; */
}

.ml-2 {
  margin-left: 2px;
  color: #fff;
}

.el-tag {
  border: 0px solid #fff;
}

.down {
  transform: rotate(-90deg);
  font-size: 20px;
}

.down:hover {
  cursor: pointer;
}

.up {
  transform: rotate(180deg);
  width: 35px;
}

.up:hover {
  cursor: pointer;
}

.page {
  padding: 0% 10px 3% 10px;
  background-color: #2d3436;
  background-image: linear-gradient(315deg, #000000 15%, #2d3436 64%);
  color: white;
  min-height: 100vh;
}

.page2 {
  padding: 0% 10px 3% 10px;
  background-color: whitesmoke;
}

@media (max-width: 768px) {
  .detail {
    position: relative;
    padding: 0% 15% 0% 15%;
    /* background: green; */
  }
  .mobile {
    font-size: 0.8rem;
    /* background: red;; */
  }
  .icon-down {
    font-size: 18px;
  }
}

@media (min-width: 768px) {
  .detail {
    position: relative;
    padding: 0% 15% 0% 15%;
    /* background: green; */
  }
  .mobile {
    font-size: 1rem;
    /* background: red;; */
  }
  .icon-down {
    font-size: 30px;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #000000;
  background-image: linear-gradient(315deg, #000000 0%, #5e5368d2 74%);
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
}

/* .container {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.15);
  padding: 2% 10% 0% 10%;
  display: flex;
  flex-direction: column;
  height: 84%;
  backdrop-filter: blur(1px);
  align-items: center;
} */
</style>

<script setup>
// import { Bottom } from "@element-plus/icons-vue";
</script>

<script>
import TitleComponent from "@/components/Utils/Title.vue";
import router from "@/router";
import { saveAs } from "file-saver";
import axios from "axios";

function download(fileUrl, fileName) {
  var a = document.createElement("a");
  a.setAttribute("target", "_blank");
  a.setAttribute("download", fileName);
  a.href = fileUrl;
  a.click();
}

export default {
  name: "ProjectConponent",
  components: {
    TitleComponent,
  },
  data() {
    return {
      title: "Projects",
      description: "My story",
      projectList: [
        {
          name: "Project 1",
          description: "Image Processing GUI",
          link: "project-one",
          img: require("../../assets/projects/thumbnails/image_processing_gui.png"),
          tags: ["Python", "OpenCV", "PysimpleGUI", "Yolov3"],
          overview:
            "A GUI for image processing using OpenCV, PySimpleGUI and Yolov3. It aims to provide a way to test the object detection model on preprocessed image in real time.  ",
        },
        {
          name: "Project 2",
          description: "Infinite Virtual Webcam Loop",
          link: "project-two",
          img: require("../../assets/projects/thumbnails/infinite_virtual_web_loop.png"),
          tags: ["Python", "OpenCV", "Mediapipe", "OBS"],
          overview:
            "A virtual webcam loop using OpenCV, Mediapipe and OBS. A simple program to record a video from a webcam and play it on repeat. It then sends the video to OBS for streaming.",
        },
        {
          name: "Project 3",
          description: "Dynamics Bicycle Model Simulation",
          link: "project-three",
          img: require("../../assets/projects/thumbnails/dbm_simulation.png"),
          tags: ["Python", "Dash", "PID", "Sim", "ZMQ"],
          overview:
            "A 3D simulation of dynamic bicycle model with PID control, where all the data generated by the model are viewable on a web server in real-time.",
        },
        {
          name: "Project 4",
          description: "Reinforcement Learning PoC",
          link: "project-four",
          img: require("../../assets/projects/thumbnails/reinforcemenet_learning.png"),
          tags: ["Tensorflow", "PyGame", "OpenAI", "RL"],
          overview:
            "A PoC project to apply reinforcement learning algorithm to autonomous driving which include obstacles avoidance and object pursuit.",
        },
        {
          name: "Project 5",
          description: "Mobile Application",
          link: "about",
          img: require("../../assets/projects/thumbnails/coming_soon.png"),
          tags: ["Vue3", "Js", "FastAPI", "Docker"],
          overview: "",
        },
      ],
    };
  },
  methods: {
    showPage(link) {
      this.clicked = true;
      // document
      // .getElementById("projectContent")
      // .scrollIntoView({ behavior: "smooth" });
      router.push({
        name: link,
      });
    },
    projectTop() {
      document
        .getElementById("projectTop")
        .scrollIntoView({ behavior: "smooth" });
    },
    downloadClick() {
      download("./src/assets/logo.png", "Codesource_Logo.txt");
    },
    downloadItem(url) {
      axios.get(url, { responseType: "blob" }).then((response) => {
        saveAs(response.data, "downloaded-file.docx");
      });
    },
  },
};
</script>
