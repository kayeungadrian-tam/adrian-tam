<template>
  <TitleComponent :title="title" :description="description" />
  <el-row class="row-bg" justify="space-evenly">
    <el-col :span="16">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="container">
            <el-skeleton :rows="5" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 500px;
  margin: 0;
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
  height: 20rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.15);
  padding: 2% 10% 0% 10%;

  backdrop-filter: blur(1px);
}
</style>

<script>
import TitleComponent from "@/components/Utils/Title.vue";

export default {
  name: "ProjectConponent",
  components: {
    TitleComponent,
  },
  data() {
    return {
      title: "Projects",
      description: "My story",
    };
  },
};
</script>
