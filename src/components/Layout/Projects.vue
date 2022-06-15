<template>
  <div class="page" id="projectTop">
    <TitleComponent :title="title" :description="description" />
    <el-row class="row-bg" justify="space-evenly">
      <el-col :span="16">
        <el-carousel height="70vh" indicator-position="" :interval="6000">
          <el-carousel-item v-for="(item, index) in projectList" :key="item">
            <div class="container">
              <h3>
                {{ index + 1 }} -
                {{ item.description }}
              </h3>
              <el-image
                style="width: 400px; height: 280px"
                :src="item.img"
                fit="contain"
              />
              <div class="tag">
                <el-tag
                  v-for="tag in item.tags"
                  :class="tag"
                  :key="tag"
                  :type="tag"
                  effect="dark"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
            <div class="detail">
              <el-row :gutter="20">
                <el-col :span="4"><div class="" /> </el-col>
                <el-col :span="16">
                  <div id="container" style="padding-top: 20px">
                    <button class="learn-more" @click="showPage(item.link)">
                      <span class="circle" aria-hidden="true">
                        <span class="icon arrow" style="rotate: 90"></span>
                      </span>
                      <span class="button-text">Learn More</span>
                    </button>
                  </div>
                </el-col>

                <el-col :span="4"> </el-col>
              </el-row>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
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
  background-color: #2a2a72;
  background-image: linear-gradient(315deg, #2a2a72 0%, #009ffd 74%);
}

.OpenCV {
  background-color: #a4508b;
  background-image: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%);
}

.PysimpleGUI {
  background-color: #63d471;
  background-image: linear-gradient(315deg, #63d471 0%, #233329 74%);
}

.Yolov3 {
  background-color: #f9484a;
  background-image: linear-gradient(315deg, #f9484a 0%, #fbd72b 74%);
}

.tag {
  position: absolute;
  display: flex;
  justify-content: space-between;
  gap: 3px;
  align-items: center;
  bottom: 10px;
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
  height: 100vh;
}

.page2 {
  padding: 0% 10px 3% 10px;
  background-color: whitesmoke;
}

.row-bg {
  height: 70vh;
}

@media (max-width: 768px) {
  .detail {
    position: relative;
    padding: 0% 15% 0% 15%;
    background: red;
  }
  .icon-down {
    font-size: 18px;
  }
}

@media (min-width: 768px) {
  .detail {
    position: relative;
    padding: 0% 15% 0% 15%;
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

.container {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.15);
  padding: 2% 10% 0% 10%;
  display: flex;
  flex-direction: column;
  height: 84%;
  backdrop-filter: blur(1px);
  align-items: center;
}
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
          no: 1,
          name: "Project 1",
          description: "Image Processing GUI",
          link: "project-one",
          img: require("../../assets/projects/thumbnails/image_processing_gui.png"),
          tags: ["Python", "OpenCV", "PysimpleGUI", "Yolov3"],
        },
        {
          no: 2,
          name: "Project 2",
          description: "This is project 2",
          link: "home",
          img: require("../../assets/logo.png"),
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
