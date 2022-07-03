<template>
  <div class="body">
    <TitleComponent
      :title="title"
      description="My professional & education history"
    />
  </div>
  <el-row class="content">
    <el-col :span="12">
      <AnimationComponent a_class="slide-right">
        <TimeLine subtitle="Professional" :indata="Experience" />
      </AnimationComponent>
    </el-col>
    <el-col :span="12">
      <AnimationComponent a_class="slide-right">
        <TimeLine subtitle="Education" :indata="Education" />
      </AnimationComponent>
    </el-col>
  </el-row>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=M+PLUS+1p&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Sawarabi+Mincho&display=swap");

.body {
  width: 100%;
}

.content {
  /* max-width: 1000px; */
  padding: 0% 10% 10% 10%;
  text-align: left;
  overflow: auto;
  align-content: center;
  display: inline-block;
}

li {
  font-size: 1.1em;
  font-family: "Sawarabi Mincho", serif;
  color: whitesmoke;
}
</style>

<script>
import TitleComponent from "@/components/Utils/Title.vue";
import TimeLine from "@/components/Utils/Timeline.vue";
import AnimationComponent from "@/components/Utils/Animation.vue";

export default {
  name: "HistoryContent",
  components: {
    TitleComponent,
    TimeLine,
    AnimationComponent,
  },
  data() {
    return {
      title: "Experience",
      Experience: [
        {
          name: "AMBL株式会社",
          period: "2021/10 ~ Now",
          description: [
            "Project Management",
            "Software Engineer",
            "Learning Management System",
          ],
          color: "#0bbd87",
          size: "large",
        },
        {
          name: "株式会社iPX",
          period: "2020/09 ~ 2021/10",
          description: [
            "Machine Learning Engineer",
            "Computer Vision",
            "Keras, PyTorch, TensorFlow",
          ],
          color: "##D4D7DE",
        },
        {
          name: "京丹後市教育委員会",
          period: "2018/08 ~ 2020/08",
          description: ["日 ⇔ 英翻訳・通訳", "国際交流事業推進担当"],
          color: "##D4D7DE",
        },
      ],
      Education: [
        {
          name: "University of Auckland",
          period: "2013/03 ~ 2018/05",
          description: [
            "Mathematics (BSc), Applied Mathematics (BSc)",
            "Japanese (BA)",
          ],
          link: "https://www.auckland.ac.nz/en.html",
          color: "##D4D7DE",
        },
        {
          name: "Hiroshima University",
          period: "2015/09 ~ 2016/09",
          description: ["MEXT Schloarship recipient"],
          link: "https://www.hiroshima-u.ac.jp/",
          color: "##D4D7DE",
        },
      ],
    };
  },
};
</script>
