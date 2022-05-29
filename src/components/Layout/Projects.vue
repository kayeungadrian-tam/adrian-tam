<template>
  <div class="page" id="projectTop">
    <TitleComponent :title="title" :description="description" />
    <el-row class="row-bg" justify="space-evenly">
      <el-col :span="16">
        <el-carousel height="70vh" indicator-position="">
          <el-carousel-item v-for="(item, index) in projectList" :key="item">
            <div class="container">
              <el-skeleton :rows="5" />
              {{ index }}
              <div class="detail">
                <el-row :gutter="20">
                  <el-col :span="4"
                    ><div class="grid-content bg-purple" />
                  </el-col>
                  <el-col :span="16"
                    ><div class="grid-content bg-purple" />

                    <el-icon
                      @click="showPage(item.link)"
                      class="icon-down"
                      style="vertical-align: middle"
                      ><DArrowLeft class="down"
                    /></el-icon>
                  </el-col>
                  <el-col :span="4"
                    ><div class="grid-content bg-purple"
                  /></el-col>
                </el-row>
              </div>
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

<style scoped>
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
}

.page2 {
  padding: 0% 10px 3% 10px;
  background-color: whitesmoke;
  height: 200vh;
}

.row-bg {
  height: 70vh;
}

@media (max-width: 768px) {
  .detail {
    position: relative;
    margin-top: 40vh;
    padding: 0% 15% 0% 15%;
  }
  .icon-down {
    font-size: 18px;
  }
}

@media (min-width: 768px) {
  .detail {
    position: relative;
    margin-top: 40vh;
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
  height: 80vh;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.15);
  padding: 2% 10% 0% 10%;

  backdrop-filter: blur(1px);
}
</style>

<script setup>
import { DArrowLeft } from "@element-plus/icons-vue";
</script>

<script>
import TitleComponent from "@/components/Utils/Title.vue";
import router from "@/router";

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
          description: "This is project 1",
          link: "project-one",
        },
        {
          no: 2,
          name: "Project 2",
          description: "This is project 2",
          link: "home",
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
  },
};
</script>
