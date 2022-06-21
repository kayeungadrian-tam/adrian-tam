<template>
  <div class="page" id="projectTop">
    <TitleComponent :title="title" :description="description" />
    <br>
    <div>
    <el-row class="row-bg" justify="space-evenly">
      <el-col :span="16">
        <el-carousel height="80vh" indicator-position="" :interval="6000">
          <el-carousel-item v-for="(item, index) in projectList" :key="item">
            <div class="container">
              <h3>
                {{ index + 1 }} -
                {{ item.description }}
              </h3>
              <div class="thumbnail">
              <el-image
                style="width: 400px; height: 280px"
                :src="item.img"
                fit="contain"
              />
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
              <div class="overview">
                <p>{{ item.overview }}</p>


              </div>
              <div id="container" class="go-down" style="padding-top: 20px">
                <button class="learn-more mobile" @click="showPage(item.link)">
                  <span class="circle mobile" aria-hidden="true">
                    <span class="icon arrow" style="rotate: 90"></span>
                  </span>
                  <span class="button-text">Learn More</span>
                </button>
              </div>
            </div>
            <div class="detail">
              <el-row :gutter="20">
                <el-col :span="4"><div class="" /> </el-col>
                <el-col :span="16">
                </el-col>

                <el-col :span="4"> </el-col>
              </el-row>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    </div>
  </div>
  <div class="page2" id="projectContent">
    <el-affix :offset="0">
      <div @click="projectTop">
        <DArrowLeft class="up" />
      </div>
    </el-affix>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/scss/button.scss";
</style>

<style scoped>


.thumbnail{
  padding: 20px 0px 10px 0px;
}

@media (min-height: 700px) {
.row-bg{
  /* background-color: #f5f5f5; */
  height: 100%;
}
.container {
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

.go-down{
  /* padding: 10% 0 100 0; */
}
.overview{
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
  color: ;
}

.ml-2 {
  margin-left: 2px;
  color: #fff;
}

.el-tag {
  border: 0px solid #fff;
}

.Python {
  font-size: 0.8rem;
  background-color: #2a2a72;
  background-image: linear-gradient(315deg, #2a2a72 0%, #009ffd 74%);
  display: inline-block;
    border-radius: 3px;
    padding: .3em .5em .3em;
    border-radius: 2px;
    font-weight: 600;
    margin: .25em .1em
}

.OpenCV {
  font-size: 0.8rem;

  background-color: #a4508b;
  background-image: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%);
    display: inline-block;
    border-radius: 3px;
    padding: .3em .5em .3em;
    border-radius: 2px;
    font-weight: 600;
    margin: .25em .1em
}

.PysimpleGUI {
  font-size: 0.8rem;

background-color: #63d471;
  background-image: linear-gradient(315deg, #63d471 0%, #233329 74%);
    display: inline-block;
    border-radius: 3px;
    padding: .3em .5em .3em;
    border-radius: 2px;
    font-weight: 600;
    margin: .25em .1em
}

.Yolov3 {
  font-size: 0.8rem;

background-color: #f9484a;
  background-image: linear-gradient(315deg, #f9484a 0%, #fbd72b 74%);
    display: inline-block;
    border-radius: 3px;
    padding: .3em .5em .3em;
    border-radius: 2px;
    font-weight: 600;
    margin: .25em .1em
}

.Mediapipe {
  font-size: 0.8rem;

background-color: #0cbaba;
background-image: linear-gradient(315deg, #0cbaba 0%, #380036 74%);
  display: inline-block;
    border-radius: 3px;
    padding: .3em .5em .3em;
    border-radius: 2px;
    font-weight: 600;
    margin: .25em .1em

}

.OBS {
  font-size: 0.8rem;
  background-color: #edd812;
  background-image: linear-gradient(315deg, #edd812 0%, #766a65 74%);
  display: inline-block;
    border-radius: 3px;
    padding: .3em .5em .3em;
    border-radius: 2px;
    font-weight: 600;
    margin: .25em .1em
}

.Dash{
  background-color: #55efc4;
  background-image: linear-gradient(315deg, #55efc4 0%, #000000 74%);
    font-size: 0.8rem;
    display: inline-block;
    border-radius: 3px;
    padding: .3em .5em .3em;
    border-radius: 2px;
    font-weight: 600;
    margin: .25em .1em
}

.PID {
  background-color: #2234ae;
background-image: linear-gradient(315deg, #2234ae 0%, #191714 74%);
    font-size: 0.8rem;
    display: inline-block;
    border-radius: 3px;
    padding: .3em .5em .3em;
    border-radius: 2px;
    font-weight: 600;
    margin: .25em .1em
}

.Sim{
background-color: #ba9833;
background-image: linear-gradient(315deg, #ba9833 0%, #993333 74%);
    font-size: 0.8rem;
    display: inline-block;
    border-radius: 3px;
    padding: .3em .5em .3em;
    border-radius: 2px;
    font-weight: 600;
    margin: .25em .1em
}
.tag {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  /* bottom: 10px; */
  margin-left: 2px;
}

.down {
  transform: rotate(-90deg);
  font-size: 20px;
}

.down:hover {
  cursor: pointer;
}

.up {
  transform: rotate(90deg);
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
  /* height: 100vh; */
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
  .mobile{
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
  .mobile{
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
import { DArrowLeft } from "@element-plus/icons-vue";
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
          tags: ["Python", "Dash", "PID", "Sim"],
          overview:
            "A virtual webcam loop using OpenCV, Mediapipe and OBS. A simple program to record a video from a webcam and play it on repeat. It then sends the video to OBS for streaming.",
        },
      ],
    };
  },
  methods: {
    showPage(link) {
      document
        .getElementById("projectContent")
        .scrollIntoView({ behavior: "smooth" });
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
