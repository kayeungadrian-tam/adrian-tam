<template>
  <div class="skillTitle">
    <TitleComponent :title="title" description="What I can do" />
  </div>
  <div class="icon">
    <el-space
      :wrap="true"
      :fill="true"
      :size="40"
      :fill-ratio="25"
      alignment="center"
    >
      <div v-for="skill in skills" :key="skill">
        <div>
          <img :src="skill.url" width="100" height="100" />
        </div>
        <div class="skill-name">
          {{ skill.name }}
        </div>
      </div>
    </el-space>
  </div>
</template>

<style scoped>
.skillTitle {
  color: #2c3e50;
}
.skill-name {
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  font-size: 1.5em;
  color: black;
}
.icon {
  margin: auto;
  width: 50%;
  width: 80vw;
  align-items: center;
  justify-content: center;
  padding: 2%;
}

@media (max-width: 992px) {
  .icon img {
    width: 80px;
  }
  .icon .skill-name {
    font-size: 1em;
  }
}
</style>

<script>
import TitleComponent from "@/components/Utils/Title.vue";

export default {
  name: "SkillComponent",
  props: [],
  data() {
    return {
      title: "My Skills",
      skills: [
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
          name: "Python",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
          name: "Html5",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
          name: "Vue.js",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
          name: "Docker",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
          name: "Linux",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original-wordmark.svg",
          name: "Tensorflow",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg",
          name: "Jupyter",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original-wordmark.svg",
          name: "PyTorch",
        },
        {
          url: "https://pbs.twimg.com/media/DfPTqkVWsAAxDcw.jpg",
          name: "ROS",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg",
          name: "CSS3",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg",
          name: "PostgreSQL",
        },
        {
          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
          name: "Flask",
        },
      ],
    };
  },
  components: {
    TitleComponent,
  },
  methods: {},
};
</script>
