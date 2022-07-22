<template>
  <div class="parallax">
    <div class="common-layouts" id="top">
      <el-container>
        <el-header>
          <div class="topboder">
            <el-row>
              <el-col :span="8">
                <div class="topbox">Project 1</div>
              </el-col>
              <el-col :span="4"></el-col>
              <el-col :span="12"
                ><div class="top-right">Image Processing GUI</div>
              </el-col>
            </el-row>
          </div>
        </el-header>
      </el-container>
      <!-- <div> -->
      <img src="../../assets/projects/thumbnails/image_processing_gui.png" />
      <!-- </div> -->
      <h4>Keywords: Image Processing, CV, Yolov3, PySimpleGUI</h4>

      <div class="main">
        <h1>Problem Statement</h1>
        <p>
          Image augmentation and processing were needed for an object detection
          task. The detection task was to detect a specific object among a set
          of similar images. Image processing was performed on a pixel level and
          it was repetitive and time-consuming.
        </p>
        <h1>Solution</h1>
        <p>
          A homemade-from-scratch image processing GUI was developed in python
          to ease the process. It was designed to augment the image and perform
          object detection on the modified image. It also provides a
          color-separation function to identify dominant colors in the image.
        </p>
        <h1>In the future...</h1>
        <p>
          This GUI serves as a platform for real time image processing tester
          for object detection tasks. Given enough object detection models, it
          will be possible to test the performance of the models on an augmented
          image.
        </p>
      </div>
      <div class="repo">
        <a
          href="https://github.com/YomamaBanana/Image_Processing"
          target="_blank"
        >
          Github repo
          <fa
            class="icon"
            :icon="{ prefix: 'fab', iconName: 'github-square' }"
          />
        </a>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<style scoped>
.parallax {
  background: url("@/assets/img/background2.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
  overflow: hidden;
  min-height: 200vh;
  /* min-width: 99vw; */
  /* padding: 10px; */
  background-size: cover;
  text-align: center;
  background-position-x: 50%;
  background-position-y: 0%;
  justify-content: center;
}

* {
  /* max-width: 1000px; */
}

h4 {
  font-style: italic;
}

.icon {
  font-size: 1.5rem;
}

a {
  color: #7c795d;
  text-decoration: none;
  -webkit-transition: all 0.2s ease-in-out;
}

a:hover {
  color: rgba(22, 19, 48, 0.652);
  text-shadow: 0 0 10px rgba(20, 20, 20, 0.652);
}

.repo {
  margin-top: 10px;
  color: #7c795d;
  vertical-align: middle;
  text-align: center;
}

@media (max-width: 992px) {
  img {
    width: 500px;
    height: auto;
    padding: 20px;
  }
}
@media (min-width: 992px) {
  img {
    width: 720px;
    height: auto;
    padding: 20px;
  }
}
p {
  font-size: 16px;
  line-height: 26px;
  text-indent: 20px;
  margin: 0;
  padding-bottom: 10px;
}

.main {
  padding: 20px;
  text-align: left;
}

h1 {
  align-self: left;
  color: #7c795d;
  font-family: "Trocchi", serif;
  font-size: 1.8rem;
  font-weight: weight;
  line-height: 48px;
  margin: 0;
  text-shadow: 1px 1px 0 #fff;
  text-decoration: underline 1px;
}
.common-layout {
  /* padding: 1% 20px 3% 20px; */
  /* margin: 0 20px 0 20px; */
  background-color: #d9d9d9;
  background-image: linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%);
  /* min-height: 100vh; */
  max-width: 1000px;

  left: 50;
  position: absolute;
  display: relative;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -50%);
  padding: 10px;
}

.top-right {
  right: 0;
  font-size: 1.5rem;
  line-height: 50px;
  text-align: right;
  padding-right: 20%;
}

.topboder {
  border-top: 2mm solid #eccc68d3;
  height: 10px;
  margin-top: -8px;
}

.topbox {
  background-color: #d3d3d3;
  background-image: linear-gradient(315deg, #d3d3d3 0%, #eccc68 74%);
  height: 50px;
  line-height: 50px;
  margin-top: -2px;
}
</style>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // document.getElementById("top").scrollIntoView({ behavior: "smooth" });
});
</script>

<script>
import FooterComponent from "@/components/Layout/Footer.vue";

export default {
  name: "ProjectOne",
  components: {
    FooterComponent,
  },
};
</script>
<style lang=""></style>
